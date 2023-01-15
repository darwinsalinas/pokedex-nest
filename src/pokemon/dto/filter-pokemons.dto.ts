import { IsInt, IsOptional, Min } from "class-validator";

export class FilterPokemosDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    limit?: number;

    @IsOptional()
    @IsInt()
    @Min(1)
    offset?: number;
}