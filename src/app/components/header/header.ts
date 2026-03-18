import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { SupabaseService } from '../../services/supabase-services';
import { toSignal } from '@angular/core/rxjs-interop';
import { computed } from '@angular/core'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header{

  private supabaseService = inject(SupabaseService);
  session = toSignal(this.supabaseService.session$, { initialValue: null });
  loggedIn = computed(() => !!this.session()?.user);

  @Input() titulo!: string; // o ponto de exclamação indica que a variável vai ser inicializada depois
  @Output() logout = new EventEmitter<void>();
  @Output() utilizadorSelecionado = new EventEmitter<string>();

  onLogout()
  {
    this.logout.emit();
  }

}
