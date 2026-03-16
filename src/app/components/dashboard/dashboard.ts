import { Component, inject } from '@angular/core';
import {Task, TaskPriority } from '../../models/task';
import { Header } from '../header/header';
import { RouterLink, RouterOutlet, RouterModule  } from '@angular/router';
import { DataServices } from '../../services/data-services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [Header, RouterOutlet, RouterLink, DatePipe, RouterModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {
  private dataService = inject(DataServices)

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
