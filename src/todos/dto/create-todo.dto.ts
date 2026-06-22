import { IsString, IsNotEmpty, IsOptional, IsBoolean, IsNumber } from 'class-validator';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsNumber()
  userId: number;
}