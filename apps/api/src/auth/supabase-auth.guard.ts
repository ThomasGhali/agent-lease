import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { createRemoteJWKSet, jwtVerify } from 'jose';

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
  private readonly jwks = createRemoteJWKSet(
    new URL(process.env.SUPABASE_JWKS_URL!),
  );

  private readonly issuer = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/v1`;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authHeader = request.headers['authorization'];

    if (!authHeader?.startsWith('Bearer ')) {
      throw new UnauthorizedException(
        'Missing or malformed authorization header',
      );
    }

    const token = authHeader.slice(7);

    try {
      const { payload } = await jwtVerify<SupabaseJwtPayload>(
        token,
        this.jwks,
        {
          issuer: this.issuer,
        },
      );

      if (!payload.sub) {
        throw new UnauthorizedException('Token missing subject claim');
      }

      request.user = { id: payload.sub };
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
