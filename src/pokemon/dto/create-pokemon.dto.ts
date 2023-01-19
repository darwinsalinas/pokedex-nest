import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsString, Min, MinLength } from "class-validator";

export class CreatePokemonDto {

    @IsString()
    @MinLength(1)
    @ApiProperty()
    name: string;

    @IsInt()
    @Min(1)
    @ApiProperty()
    pokemon_number: number;
}
