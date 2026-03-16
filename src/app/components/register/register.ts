/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from 'express';
import { UserModel } from '../../models/UserModel';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Header } from '../header/header';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, Header],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit{
 private router =  inject(Router);
 form!: FormGroup;

 ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(8)])
    });
  }


onSubmit() {
  if (this.form.valid)
  {
    console.log("Great!")
  }
  else {
      alert("Please, fill the form correctly.");
    }
  }
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
 