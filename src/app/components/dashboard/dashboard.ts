import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {Task, TaskPriority } from '../../models/task';
import { Header } from '../header/header';
import { RouterLink, RouterOutlet, RouterModule, Router  } from '@angular/router';
import { DataServices } from '../../services/data-services';
import { DatePipe } from '@angular/common';
import { SupabaseService } from '../../services/supabase-services';

@Component({
  selector: 'app-dashboard',
  imports: [Header, RouterOutlet, RouterLink, DatePipe, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard implements OnInit{
  private router = inject(Router)
  private dataService = inject(DataServices)
  private supabaseService = inject(SupabaseService)

  session = toSignal(this.supabaseService.session$, { initialValue: null });
  dueTasks: Task[] = [];

    ngOnInit(): void {
    this.loadDueTasks();
    
  }
  
  loggedIn() {
    return !!this.session()?.user;
  }
  logout()
  {
    this.supabaseService.signOut();
    setTimeout(() => {
        this.router.navigate(['/login']);
        }, 50);
  }
  //  async checkLogin() {
  //   const user = this.supabaseService.client.auth.getUser(); // método Supabase
  //   this.loggedIn = !!user; // true se houver user, false caso contrário
  // }

  // async loadDueTasks() {
  //   this.dueTasks = await this.supabaseService.getTasks();
  //   this.dueTasks = this.dueTasks.filter(t => this.isToday(t.due_date) && t.done === false);
  // }

  loadPriorityTasks() : Task[]
  {
    return this.dataService.getTasks().filter(t => t.priority === TaskPriority.HIGH && t.done === false);
  }

  thereAreSubjects(): boolean {
    return this.dataService.getSubjects().length > 0;
  }

  loadDueTasks(): Task[]
  {
    const tasks = this.dataService.getTasks().filter(t => this.isToday(t.due_date) && t.done === false);
    return tasks;
  }

  isToday(date: Date): boolean {
    const today =  new Date().toDateString();
     return today === new Date(date).toDateString();
  }

  getCompletionPercentage() : string {
    const allTasks = this.dataService.getTasks();
    if(allTasks.length === 0)
      return "N/A";

    const doneTasksQt:number = allTasks.filter(t => t.done).length;
 return ((doneTasksQt / allTasks.length) * 100).toFixed(2) + "%"
  }

  getDoneTasksTotal(): string {
    return `${this.dataService.getTasks().filter(t => t.done).length}`
  }

   getDoneIncompleteTotal(): string {
    return `${this.dataService.getTasks().filter(t => !t.done).length}`
  }
}
