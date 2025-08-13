import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

@Expose()
export class User {
  @Expose()
    id: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
    username: string;

  @IsNotEmpty()
  @IsEmail()
  @Expose()
    email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Exclude()
    password: string;

  @Exclude()
    createdAt: Date;

  @Exclude()
    updatedAt: Date;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}