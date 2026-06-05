import { IsNotEmpty, IsString, Length, Matches } from "class-validator"

const NO_HTML_PATTERN = /^[^<>]*$/
const NO_HTML_MESSAGE = "No se permiten etiquetas HTML"

export class CreateCommentDto {
    @IsString({ message: "El contenido debe ser un texto" })
    @IsNotEmpty({ message: "El contenido no puede estar vacío" })
    @Length(2, 400, {
        message: "El contenido debe tener entre 2 y 400 caracteres",
    })
    @Matches(NO_HTML_PATTERN, { message: NO_HTML_MESSAGE })
    content!: string
}
