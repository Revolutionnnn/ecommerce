import {
  IsNotEmpty,
  IsNumber,
  IsArray,
  IsString,
  Length,
  Matches,
} from 'class-validator';

class CustomerInfoDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  email: string;
}

class CartItemDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;
}

export class PaymentRequestDto {
  @IsNotEmpty()
  @Matches(/^[0-9]+$/, {
    message: 'El número de tarjeta debe contener solo números',
  })
  @Length(16, 16, {
    message: 'El número de tarjeta debe tener 16 dígitos',
  })
  number: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2, {
    message: 'El mes de expiración debe tener 2 caracteres',
  })
  expMonth: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2, {
    message: 'El año de expiración debe tener 2 caracteres',
  })
  expYear: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 4, {
    message: 'El CVC debe tener entre 3 y 4 caracteres',
  })
  cvc: string;

  @IsNotEmpty()
  installments: number;

  @IsNotEmpty()
  customerInfo: CustomerInfoDto;

  @IsArray()
  cartItems: CartItemDto[];

  @IsNumber()
  total: number;
}
