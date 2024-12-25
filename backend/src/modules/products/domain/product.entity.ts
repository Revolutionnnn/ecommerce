export class Product {
  constructor(
    public readonly id: number,
    public readonly titulo: string,
    public readonly descripcion: string,
    public readonly basePrice: number,
    public readonly imagenUrl: string,
    public readonly cantidadStock: number,
  ) {}
}
