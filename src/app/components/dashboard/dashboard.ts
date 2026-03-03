import { Component } from '@angular/core';
import {Task, TaskPriority, getDefaultTasks } from '../../models/task';

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})

export class Dashboard {
  priorityTasks:Task[] = getDefaultTasks().filter(task => task.priority == TaskPriority.HIGH);
  dueTasks: Task[] = getDefaultTasks().filter(task => task.dueDate < new Date() && !task.done);
}
