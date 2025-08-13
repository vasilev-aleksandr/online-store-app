import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [];
  private idCounter = 1;

  create(createProductDto: Partial<Product>): Product {
    const product = {
      id: this.idCounter++,
      ...createProductDto,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Product;

    this.products.push(product);
    return product;
  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  update(id: number, updateData: Partial<Product>): Product {
    const product = this.findOne(id);
    Object.assign(product, updateData, { updatedAt: new Date() });
    return product;
  }

  remove(id: number): void {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    this.products.splice(index, 1);
  }
}
