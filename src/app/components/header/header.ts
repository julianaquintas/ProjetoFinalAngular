import { Component, Input, Output, EventEmitter } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header{
  @Input() titulo!: string; // o ponto de exclamação indica que a variável vai ser inicializada depois
  @Output() logout = new EventEmitter<void>();
  @Output() utilizadorSelecionado = new EventEmitter<string>();

  onLogout()
  {
    this.logout.emit();
  }

  selecionar()
  {
    this.utilizadorSelecionado.emit("Ana");
  }
}
