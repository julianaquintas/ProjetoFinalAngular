import { Injectable } from '@angular/core';
import { createClient, Session, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { Task } from '../models/task';
import { UserModel } from '../models/UserModel';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
providedIn: 'root'
})

export class SupabaseService {
  private supabase: SupabaseClient;
  private _session = new BehaviorSubject<Session | null>(null);
  session$ = this._session.asObservable();

  constructor() {
    this.supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseKey
  );

    this.supabase.auth.getSession().then(({ data }) => {
      this._session.next(data.session);
    });

    this.supabase.auth.onAuthStateChange((event, session) => {
      console.log('Auth mudou:', event);
      this._session.next(session); 
    });
}

 async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({ email, password });
    return { data, error };
  }

async signOut() {
    console.log("signOut called");
    const { error } = await this.supabase.auth.signOut();
    
    return { error };
  }

   async signUp(name: string, email: string, password: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name }
      }
    });

    if (error) {
      throw error;
    }

    return data;
  }


  get client(): SupabaseClient {
    return this.supabase;
  }

   async getUsers(): Promise<UserModel[]> {
    const { data, error } = await this.supabase
      .from('users')
      .select('*')
      //.order('created_at', { ascending: false });
    if (error) {
      console.error('Erro ao listar os utilizadores:', error.message);
      return [];
    }
    return data as UserModel[];
  }

   async addUser(name:string, email:string, pass:string): Promise<UserModel | null> {
    const { data, error } = await this.supabase
      .from('users')
      .insert([{ name, email, pass }])
      .select()
      .single();
    if (error) {
      console.error('Erro ao adicionar utilizador:', error.message);
      return null;
    }
    return data as UserModel;
  }

  async updateUser(user: UserModel): Promise<UserModel | null> {
    const { data, error } = await this.supabase
      .from('users')
      .update({
      name: user.name,
      email: user.email,
      password: user.password
      })
      .eq('id', user.id)
      .select()
      .single();
   if (error) {
    console.error('Erro ao actualizar utilizador:', error.message);
    return null;
  }
    return data as UserModel;
  }

  async deleteUser(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Erro ao apagar utilizador:', error.message);
      return false;
    }

    return true;
  }
  
  async getTasks(): Promise<Task[]> {
    const { data, error } = await this.supabase
      .from('tasks')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.error('Erro ao listar tarefas:', error.message);
      return [];
    }
    return data as Task[];
  }

  async addTask(title: string): Promise<Task | null> {
    const { data, error } = await this.supabase
      .from('tasks')
      .insert([{ title, completed: false }])
      .select()
      .single();
    if (error) {
      console.error('Erro ao adicionar tarefa:', error.message);
      return null;
    }
    return data as Task;
  }

  async updateTask(task: Task): Promise<Task | null> {
  const { data, error } = await this.supabase
    .from('tasks')
    .update({
    title: task.description,
    completed: task.done
    })
    .eq('id', task.id)
    .select()
    .single();
  if (error) {
    console.error('Erro ao atualizar tarefa:', error.message);
    return null;
  }
  return data as Task;
  }

  async deleteTask(id: string): Promise<boolean> {
    const { error } = await this.supabase
      .from('tasks')
      .delete()
      .eq('id', id);
    if (error) {
      console.error('Erro ao apagar tarefa:', error.message);
      return false;
    }

    return true;
  }

}
