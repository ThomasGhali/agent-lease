import { Injectable, UnauthorizedException } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private readonly supabaseUrl: string;
  private readonly anonKey: string;
  private readonly serviceRoleKey: string;

  constructor() {
    this.supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
    this.anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
    this.serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  }

  /**
   * 🔴 ADMIN CLIENT (Bypasses RLS)
   * Use this for internal server operations, webhooks, or cron jobs.
   */
  getAdminClient() {
    return createClient(this.supabaseUrl, this.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  /**
   * 🟢 USER-SCOPED CLIENT (Respects RLS)
   * Use this when acting on behalf of a user request.
   */
  getClient(authHeader: string) {
    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization header');
    }

    const token = authHeader.split(' ')[1]; // Extracts the JWT from "Bearer <token>"

    return createClient(this.supabaseUrl, this.anonKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${token}`, // Injects the user's token
        },
      },
    });
  }
}
