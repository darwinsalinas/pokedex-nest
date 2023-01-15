import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PokeapiResponse } from './interfaces/pokeapi-response.interface';
import { Pokemon } from '../pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { HttpAdapter } from 'src/common/adapters/http.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name) private pokemonModel: Model<Pokemon>,
    private http: HttpAdapter
  ) { }

  async executeSeed() {
    const data = await this.http.get<PokeapiResponse>('https://pokeapi.co/api/v2/pokemon?limit=2')

    const pokemons = [];
    data.results.forEach(async ({ name, url }) => {
      const urlSegments = url.split('/');
      const id = urlSegments[urlSegments.length - 2];
      pokemons.push({ name, pokemon_number: id });
    });

    await this.pokemonModel.insertMany(pokemons);

    return data;
  }
}
