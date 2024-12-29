import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { GetProductUseCase } from '../application/get-product.use-case';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let getProductUseCaseMock: Partial<GetProductUseCase>;

  beforeAll(async () => {
    getProductUseCaseMock = {
      getAllProducts: jest.fn().mockResolvedValue([{}, {}]),
      getProductById: jest.fn((id: number) => {
        if (id === 1) {
          return Promise.resolve({});
        }
        return Promise.resolve(null);
      }),
    };

    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [
        {
          provide: GetProductUseCase,
          useValue: getProductUseCaseMock,
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  }, 20000);

  afterAll(async () => {
    await app.close();
  });

  describe('/products (GET)', () => {
    it('should return status 200 and a list of products', async () => {
      const response = await request(app.getHttpServer())
        .get('/products')
        .expect(200);

      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBeGreaterThan(0);
    }, 10000);
  });

  describe('/products/:id (GET)', () => {
    it('should return status 200 and a product if it exists', async () => {
      const response = await request(app.getHttpServer())
        .get('/products/1')
        .expect(200);

      expect(response.body).toBeDefined();
    }, 10000);

    it('should return status 404 if product does not exist', async () => {
      await request(app.getHttpServer()).get('/products/9999').expect(404);
    }, 10000);
  });
});
