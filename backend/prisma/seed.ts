import { PrismaClient } from '@prisma/client';
import * as dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  await prisma.producto.createMany({
    data: [
      {
        titulo: 'Curso de Python',
        descripcion:
          'Aprende Python desde cero y desarrolla proyectos avanzados.',
        basePrice: 49999,
        cantidadStock: 100,
        imagenUrl: 'https://i.imgur.com/oOfJXgV.jpeg',
      },
      {
        titulo: 'Curso de NestJS',
        descripcion: 'Desarrollo backend moderno con NestJS y TypeScript.',
        basePrice: 59999,
        cantidadStock: 80,
        imagenUrl: 'https://i.imgur.com/4ORN2ti.png',
      },
      {
        titulo: 'Curso de Django',
        descripcion: 'Construye aplicaciones web escalables con Django.',
        basePrice: 45999,
        cantidadStock: 60,
        imagenUrl: 'https://i.imgur.com/owXXlUa.png',
      },
      {
        titulo: 'Curso de JavaScript Avanzado',
        descripcion: 'Domina JavaScript y crea proyectos complejos.',
        basePrice: 39099,
        cantidadStock: 120,
        imagenUrl: 'https://i.imgur.com/tkPZsek.png',
      },
      {
        titulo: 'Curso de React',
        descripcion:
          'Aprende React y desarrolla aplicaciones frontend dinámicas.',
        basePrice: 49999,
        cantidadStock: 100,
        imagenUrl: 'https://i.imgur.com/8bCHS9n.png',
      },
    ],
  });

  console.log('Datos iniciales insertados en la tabla Producto.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
