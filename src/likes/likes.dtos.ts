import { IsIn, IsInt, IsOptional, IsString, Min } from "class-validator"

export class AddLikeDto {
    @IsOptional()
    @IsString({ message: "El tipo de reacción debe ser un texto" })
    @IsIn(["like", "fire", "clap"], {
        message: "Tipo de reacción no válida (like, fire, clap)",
    })
    reactionType?: string

    @IsOptional()
    @IsInt({ message: "El peso debe ser un número entero" })
    @Min(1, { message: "El peso debe ser al menos 1" })
    weight?: number
}
