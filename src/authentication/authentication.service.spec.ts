import { Test, TestingModule } from '@nestjs/testing';
import { AuthenticationService } from './authentication.service';
import { UserService } from '../user/user.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let jwtService: JwtService;
  let userService: Partial<UserService>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        JwtModule,
        ConfigModule.forRoot({
          envFilePath: '.env.test',
        }),
      ],
      providers: [
        AuthenticationService,
        {
          provide: UserService,
          useValue: {
            findByUsername: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthenticationService>(AuthenticationService);
    jwtService = module.get<JwtService>(JwtService);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateAuthenticatedPayload', () => {
    it('should return correctly', async () => {
      const userData = { username: 'john doe' };
      const accessToken = await jwtService.signAsync(userData, {
        secret: process.env.JWT_SECRET,
      });
      const authenticatedPayload = { ...userData, accessToken };

      const result = await service.generateAuthenticatedPayload(userData);

      expect(result).toStrictEqual(authenticatedPayload);
    });
  });

  describe('signIn', () => {
    it('should throw an UnauthorizedException for wrong password', async () => {
      const mockUserReturnedData = {
        username: 'john doe',
        password: 'hashed_password',
      };
      const wrongPassword = 'wrong_password';

      jest
        .spyOn(userService, 'findByUsername')
        .mockResolvedValue(mockUserReturnedData);

      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(false);

      await expect(
        service.signIn(mockUserReturnedData.username, wrongPassword),
      ).rejects.toThrow(UnauthorizedException);
    });

    it('should throw a NotFound for not found user', async () => {
      const username = 'john doe';
      const password = 'password';

      jest.spyOn(userService, 'findByUsername').mockResolvedValue(undefined);

      await expect(service.signIn(username, password)).rejects.toThrow(
        NotFoundException,
      );
    });

    it('should return accessToken for successful login', async () => {
      const username = 'john_doe';
      const password = 'password';

      jest.spyOn(userService, 'findByUsername').mockResolvedValue({
        username: 'john_doe',
        password: 'hashedPassword',
      });
      jest.spyOn(bcrypt, 'compare').mockResolvedValueOnce(true);

      const authenticatedPayload = await service.generateAuthenticatedPayload({
        username,
      });

      const signInResult = await service.signIn(username, password);

      expect(signInResult).toStrictEqual(authenticatedPayload);
    });
  });
});
