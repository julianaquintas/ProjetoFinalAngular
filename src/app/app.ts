import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { Tasklist } from './components/tasklist/tasklist';
import { Options } from './components/options/options';
import { Dashboard } from './components/dashboard/dashboard';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Tasklist, Options, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Study Manager');
  
  fazerLogout()
  {
    alert("O utilizador fez logout!");
  }

  receber(nome:string) {
    alert("Utilizador selecionado: " + nome);
  }
}
