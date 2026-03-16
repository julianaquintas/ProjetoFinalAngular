import { Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from 'express';
import { UserModel } from '../../models/UserModel';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
 private router =  inject(Router);
}

async function createUser(user:UserModel)
{

  const response = await fetch(environment.apiUrl +'/users',{
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  });

  const data = await response.json();
  console.log(data);
}