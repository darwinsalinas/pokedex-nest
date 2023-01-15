import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { ValidateMongoIdPipe } from '../common/pipes/validate-mongo-id.pipe';
import { FilterPokemosDto } from './dto/filter-pokemons.dto';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) { }

  @Post()
  create(@Body() createPokemonDto: CreatePokemonDto) {
    return this.pokemonService.create(createPokemonDto);
  }

  @Get()
  findAll(@Query() filters: FilterPokemosDto) {
    return this.pokemonService.findAll(filters);
  }

  @Get(':term')
  findOne(@Param('term') term: string) {
    return this.pokemonService.findOne(term);
  }

  @Patch(':term')
  update(@Param('term') term: string, @Body() updatePokemonDto: UpdatePokemonDto) {
    return this.pokemonService.update(term, updatePokemonDto);
  }

  @Delete(':term')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('term') term: string) {
    return this.pokemonService.remove(term);
  }

  @Delete('delete/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  destroy(@Param('id', ValidateMongoIdPipe) id: string) {
    return this.pokemonService.removeById(id);
  }
}
