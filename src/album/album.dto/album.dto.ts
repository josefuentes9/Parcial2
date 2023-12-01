import {IsNotEmpty, IsString, IsDate} from 'class-validator';

export class AlbumDto {

    @IsDate()
    @IsNotEmpty()
    readonly fechainicio: Date;
 
    @IsDate()
    @IsNotEmpty()
    readonly fechafin: Date;

    @IsString()
    @IsNotEmpty()
    readonly titulo: string;

}
