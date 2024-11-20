import { IsNotEmpty, IsEmail, IsOptional, IsString, IsInt, IsDate } from 'class-validator';
import { Type } from 'class-transformer'; 

export class CreatePersonDto {
  @IsNotEmpty()
  @IsString()
  identification_document: string;

  @IsInt()
  identification_type_id: number;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsString()
  second_name?: string;

  @IsNotEmpty()
  @IsString()
  first_surname: string;

  @IsOptional()
  @IsString()
  second_surname?: string;

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  birth_date: Date;

  @IsNotEmpty()
  @IsString()
  birth_city: string;

  @IsNotEmpty()
  @IsString()
  birth_department: string;

  @IsNotEmpty()
  @IsString()
  birth_country: string;

  @IsNotEmpty()
  @IsString()
  residence_city: string;

  @IsNotEmpty()
  @IsString()
  residence_address: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsInt()
  blood_type_id: number;
}
