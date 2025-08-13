import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './entities/product.entity';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('products')
@UseGuards(JwtAuthGuard)
export class ProductsController {
  constructor(private readonly _productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: Partial<Product>): Product {
    return this._productsService.create(createProductDto);
  }

  @Get()
  findAll(): Product[] {
    return this._productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Product {
    return this._productsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: Partial<Product>,
  ): Product {
    return this._productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    this._productsService.remove(id);
  }
}