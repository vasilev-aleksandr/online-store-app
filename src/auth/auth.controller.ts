import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
    username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
    password: string;
}

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
    username: string;

  @IsNotEmpty()
  @IsEmail()
    email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
    password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this._authService.validateUser(
      loginDto.username,
      loginDto.password,
    );
    return this._authService.login(user);
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this._authService.register(
      registerDto.username,
      registerDto.email,
      registerDto.password,
    );
  }
}