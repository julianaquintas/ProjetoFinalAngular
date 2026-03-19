import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Tasklist } from './components/tasklist/tasklist';
import { Options } from './components/options/options';
import { Dashboard } from './components/dashboard/dashboard';
//import { environment } from '../environments/environment.development';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Tasklist, Options, Dashboard],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Study Manager');
  
  let _error = 3;
  fazerLogout()
  {
    alert("O utilizador fez logout!");
  }

  receber(nome:string) {
    alert("Utilizador selecionado: " + nome);
  }

}
// async function loadUsers () {
//   const response = await fetch (environment.apiUrl + '/users');
//   const users = await response.json();

//   console.log(users)

// }

//loadUsers()