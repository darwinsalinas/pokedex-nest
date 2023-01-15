import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>
  ) { }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();
    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);

      return pokemon;
    } catch (error) {
      this.handleError(error)
    }
  }

  findAll() {
    return this.pokemonModel.find();
  }

  async findOne(term: string) {
    let pokemon: Pokemon;
    if (!isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ pokemon_number: Number(term) });
    }

    if (!pokemon && isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findOne({ id: term });
    }

    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({ name: term.toLowerCase() });
    }

    if (!pokemon) {
      throw new NotFoundException(`Pokemon ${term} not found`);
    }

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    let pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });

      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.handleError(error)
    }

  }

  async remove(term: string) {
    const pokemon = await this.findOne(term);

    await pokemon.delete();

    return;
  }

  async removeById(id: string) {
    const { deletedCount, acknowledged } = await this.pokemonModel.deleteOne({ _id: id });

    if (!acknowledged || !deletedCount) {
      throw new NotFoundException(`Pokemon ${id} not found`);
    }

    return;
  }

  protected handleError(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(`Pokemon ${JSON.stringify(error.keyValue)} already exists`);
    }

    throw new InternalServerErrorException(`Error creating pokemon`);
  }
}