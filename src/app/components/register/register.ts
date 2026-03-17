/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, inject, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Router } from '@angular/router';
import { UserModel } from '../../models/UserModel';
import { RouterLink } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Header } from '../header/header';
import { SupabaseClient } from '@supabase/supabase-js';
import { SupabaseService } from '../../services/supabase-services';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, Header],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit{
 private router =  inject(Router);
 private supabaseService = inject(SupabaseService)
 form!: FormGroup;
 message = "";

 ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(1)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(8)])
    });
  }


async onSubmit() {
  this.message = "";
  if (this.form.valid)
  {
    const _name:string = this.form.get('name')?.value;
    const _email:string = this.form.get('email')?.value;
    const _password:string = this.form.get('password')?.value;
    try {
      const result = await this.supabaseService.signUp(_name, _email, _password);
      this.message = 'Registo feito com sucesso! Verifica o email para confirmar.';
       setTimeout(() => {
          this.router.navigate(['/dashboard']);
          }, 50);
      console.log(result);j
    } catch (error) {
      this.message = 'Erro no resgisto';
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

}
}