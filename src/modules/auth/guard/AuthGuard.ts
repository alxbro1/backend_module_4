import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  private readonly JWT_SECRET = process.env.JWT_SECRET;
  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>{
    try {
      const request = context.switchToHttp().getRequest();
      const headers = context.switchToHttp().getRequest().headers;
      const auth: string = headers['authorization'];
      const token = auth.split(' ')[1];

      if (!token) throw new UnauthorizedException();

      const payload = await this.jwtService.verifyAsync(token, {
        secret: this.JWT_SECRET
      });
      if(!payload) throw new UnauthorizedException();
      
      request.user = payload
      return true
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
