import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Header } from '../header/header';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { UserModel } from '../../models/UserModel';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Header, RouterModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private router = inject(Router);
 
  form!: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const _email = this.form.get('email')?.value;
      const _password = this.form.get('password')?.value;

      if (_email && _password) {
        const foundUser = 
      }
    }
  }
  }