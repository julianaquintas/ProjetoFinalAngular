import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SupabaseService } from './services/supabase-services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private supabase = inject(SupabaseService);
   private router = inject(Router)

  async canActivate(): Promise<boolean> {
    const session = await this.supabase.getSession();
    if (!session) {
      // redireciona para login se não houver sessão
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}