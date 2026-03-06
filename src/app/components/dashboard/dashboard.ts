import { Component } from '@angular/core';
import {Task, TaskPriority, getDefaultTasks } from '../../models/task';
import { Header } from '../header/header';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DataServices } from '../../services/data-services';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [Header, RouterOutlet, RouterLink, DatePipe],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {
    constructor(private dataService: DataServices) {
   
  }
  
  loadPriorityTasks() : Task[]
  {
    return this.dataService.getTasks().filter(t => t.priority === TaskPriority.HIGH && t.done === false);
  }

  loadDueTasks(): Task[]
  {

    let tasks = this.dataService.getTasks().filter(t => this.isToday(t.dueDate) && t.done === false);
    console.log("number of tasks: " + tasks.length);

    return tasks;
  }

  isToday(date: Date): boolean {
    const today =  new Date().toDateString();
     return today === new Date(date).toDateString();
  }

  getCompletionPercentage() : string {
    const allTasks = this.dataService.getTasks();
    const doneTasksQt:number = allTasks.filter(t => t.done).length;

    return ((doneTasksQt / allTasks.length) * 100).toFixed(2) + "%"
  }

  // getSubjectWithMostTasks():
  //   {
  //     this.dataService.getTasks().filter()
  //   }
  

  // total de tarefas, nr tarefas completas
  //nr of late tasks, Subject with most tasks
}
