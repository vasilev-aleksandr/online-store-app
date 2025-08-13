import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        stock: 10,
      };

      const product = service.create(productData);

      expect(product).toEqual({
        id: expect.any(Number),
        ...productData,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('findAll', () => {
    it('should return an array of products', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        stock: 10,
      };

      service.create(productData);
      const products = service.findAll();

      expect(products).toHaveLength(1);
      expect(products[0]).toEqual({
        id: expect.any(Number),
        ...productData,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      });
    });
  });

  describe('findOne', () => {
    it('should return a product if it exists', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        stock: 10,
      };

      const created = service.create(productData);
      const found = service.findOne(created.id);

      expect(found).toEqual(created);
    });

    it('should throw NotFoundException if product does not exist', () => {
      expect(() => service.findOne(999)).toThrow(NotFoundException);
    });
  });

  describe('update', () => {
    it('should update a product', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        stock: 10,
      };

      const created = service.create(productData);
      const updated = service.update(created.id, { price: 200 });

      expect(updated.price).toBe(200);
      expect(updated.updatedAt).toBeInstanceOf(Date);
    });

    it('should throw NotFoundException if product does not exist', () => {
      expect(() => service.update(999, { price: 200 })).toThrow(
        NotFoundException,
      );
    });
  });

  describe('remove', () => {
    it('should remove a product', () => {
      const productData = {
        name: 'Test Product',
        description: 'Test Description',
        price: 100,
        stock: 10,
      };

      const created = service.create(productData);
      service.remove(created.id);

      expect(() => service.findOne(created.id)).toThrow(NotFoundException);
    });

    it('should throw NotFoundException if product does not exist', () => {
      expect(() => service.remove(999)).toThrow(NotFoundException);
    });
  });
});
