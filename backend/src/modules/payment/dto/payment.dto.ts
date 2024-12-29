import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsString,
  Length,
  Matches,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

class CustomerInfoDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'Nombre del cliente',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: '123 Main St',
    description: 'Dirección del cliente',
  })
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty({
    example: '1234567890',
    description: 'Teléfono del cliente',
  })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Correo electrónico del cliente',
  })
  @IsNotEmpty()
  @IsString()
  email: string;
}

class CartItemDto {
  @ApiProperty({
    example: 1,
    description: 'ID del producto en el carrito',
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 2,
    description: 'Cantidad del producto en el carrito',
  })
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class PaymentRequestDto {
  @ApiProperty({
    example: '4111111111111111',
    description: 'Número de tarjeta de crédito',
  })
  @IsNotEmpty()
  @Matches(/^[0-9]+$/, {
    message: 'El número de tarjeta debe contener solo números',
  })
  @Length(16, 16, {
    message: 'El número de tarjeta debe tener 16 dígitos',
  })
  number: string;

  @ApiProperty({
    example: '12',
    description: 'Mes de expiración de la tarjeta (MM)',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 2, {
    message: 'El mes de expiración debe tener 2 caracteres',
  })
  expMonth: string;

  @ApiProperty({
    example: '23',
    description: 'Año de expiración de la tarjeta (YY)',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 2, {
    message: 'El año de expiración debe tener 2 caracteres',
  })
  expYear: string;

  @ApiProperty({
    example: '123',
    description: 'Código de seguridad de la tarjeta (CVC)',
  })
  @IsNotEmpty()
  @IsString()
  @Length(3, 4, {
    message: 'El CVC debe tener entre 3 y 4 caracteres',
  })
  cvc: string;

  @ApiProperty({
    example: 3,
    description: 'Número de cuotas del pago',
    required: false,
  })
  @IsOptional()
  @IsNumber({}, { message: 'El número de cuotas debe ser un número' })
  installments?: number;

  @ApiProperty({
    description: 'Información del cliente',
    type: CustomerInfoDto,
  })
  @IsNotEmpty()
  customerInfo: CustomerInfoDto;

  @ApiProperty({
    description: 'Lista de productos en el carrito',
    type: [CartItemDto],
  })
  @IsArray()
  cartItems: CartItemDto[];

  @ApiProperty({
    example: 150.0,
    description: 'Total a pagar',
  })
  @IsNotEmpty()
  @IsNumber()
  total: number;
}
