import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Expose } from 'class-transformer';

@Expose()
export class Product {
  @Expose()
    id: number;

  @IsNotEmpty()
  @IsString()
  @Expose()
    name: string;

  @IsNotEmpty()
  @IsString()
  @Expose()
    description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Expose()
    price: number;

  @IsNumber()
  @Min(0)
  @Expose()
    stock: number;

  @Expose()
    createdAt: Date;

  @Expose()
    updatedAt: Date;

  constructor(partial: Partial<Product>) {
    Object.assign(this, partial);
  }
}