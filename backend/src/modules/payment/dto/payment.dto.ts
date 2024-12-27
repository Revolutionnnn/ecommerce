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
  @IsString()
  @Length(16, 16)
  @Matches(/^[0-9]+$/, {
    message: 'El número de tarjeta debe contener solo números',
  })
  number: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  expMonth: string;

  @IsNotEmpty()
  @IsString()
  @Length(2, 2)
  expYear: string;

  @IsNotEmpty()
  @IsString()
  @Length(3, 4)
  cvc: string;

  @IsNotEmpty()
  customerInfo: CustomerInfoDto;

  @IsArray()
  cartItems: CartItemDto[];

  @IsNumber()
  total: number;
}
