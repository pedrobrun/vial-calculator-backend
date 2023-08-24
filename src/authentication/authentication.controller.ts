import { Controller, Post, Body } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticateDto } from './dto/create-authentication.dto';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Post()
  async authenticate(
    @Body() authDto: AuthenticateDto,
  ): Promise<{ accessToken: string }> {
    return await this.authenticationService.signIn(
      authDto.username,
      authDto.password,
    );
  }
}
