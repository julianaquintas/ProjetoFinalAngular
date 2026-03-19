import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Header } from '../header/header';
import { Router, RouterLink, RouterModule } from '@angular/router';
//import { UserModel } from '../../models/UserModel';
import { SupabaseService } from '../../services/supabase-services';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, Header, RouterModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private router = inject(Router);
  private supabaseService = inject(SupabaseService)
 
  form!: FormGroup;
  errorMessage = ""

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      const _email = this.form.get('email')?.value;
      const _password = this.form.get('password')?.value;

      if (_email && _password) {
        const { data, error } = await this.supabaseService.signIn(_email, _password);

        if (error) {
          this.errorMessage = error.message;
          return;
        }

         console.log('User logged in:', data.user);
         setTimeout(() => {
          this.router.navigate(['/dashboard']);
          }, 50);
      }
    }
  }
}
