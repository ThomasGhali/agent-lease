import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import * as jwt from 'jsonwebtoken';

interface SupabaseJwtPayload {
  sub: string; // user ID
  aud: string;
  exp: number;
  iat: number;
  email?: string;
  role?: string;
}

interface AuthenticatedRequest extends Request {
  user?: { id: string };
}

@Injectable()
export class SupabaseAuthGuard implements CanActivate {
  private readonly jwtSecret = process.env.SUPABASE_JWT_SECRET!;

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or malformed authorization header',
      );
    }

    const token = authHeader.slice(7);

    try {
      const payload = jwt.verify(token, this.jwtSecret) as SupabaseJwtPayload;
      request.user = { id: payload.sub };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
