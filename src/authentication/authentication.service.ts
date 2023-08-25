import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (!user || !user.password)
      throw new NotFoundException('User does not exist.');

    if (!(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const { password: _, ...result } = user;

    return await this.generateAuthenticatedPayload(result);
  }

  async generateAuthenticatedPayload(userData: Record<string, any>) {
    return {
      accessToken: await this.jwtService.signAsync(userData, {
        secret: process.env.JWT_SECRET,
      }),
      ...userData,
    };
  }
}
