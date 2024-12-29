import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../../app.module';
import { GetProductUseCase } from '../application/get-product.use-case';

describe('ProductController (e2e)', () => {
  let app: INestApplication;
  let getProductUseCaseMock: Partial<GetProductUseCase>;

  beforeAll(async () => {
    // Mock del caso de uso
    getProductUseCaseMock = {
      getAllProducts: jest.fn().mockResolvedValue([{}, {}]), // Simula una lista de productos (no importa el contenido)
      getProductById: jest.fn((id: number) => {
        if (id === 1) {
          return Promise.resolve({}); // Simula un producto existente
        }
        return Promise.resolve(null); // Simula producto no encontrado
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
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/products (GET)', () => {
    it('should return status 200 and a list of products', async () => {
      const response = await request(app.getHttpServer())
        .get('/products') // Llama al endpoint
        .expect(200); // Verifica que devuelve estado 200

      expect(Array.isArray(response.body)).toBe(true); // Verifica que el cuerpo es una lista
      expect(response.body.length).toBeGreaterThan(0); // Verifica que no está vacío
    });
  });

  describe('/products/:id (GET)', () => {
    it('should return status 200 and a product if it exists', async () => {
      const response = await request(app.getHttpServer())
        .get('/products/1') // Llama al endpoint con ID 1
        .expect(200); // Verifica que devuelve estado 200

      expect(response.body).toBeDefined(); // Verifica que hay una respuesta
    });

    it('should return status 404 if product does not exist', async () => {
      await request(app.getHttpServer())
        .get('/products/9999') // Llama al endpoint con un ID inexistente
        .expect(404); // Verifica que devuelve estado 404
    });
  });
});
