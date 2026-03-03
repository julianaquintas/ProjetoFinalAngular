import { Component, Input } from '@angular/core';
import { Task, TaskSubject, getDefaultSubjects, getDefaultTasks } from '../../models/task';

@Component({
  selector: 'app-tasklist',
  imports: [],
  templateUrl: './tasklist.html',
  styleUrl: './tasklist.css',
})
export class Tasklist {
  tasks:Task[] = getDefaultTasks();
  subjects:TaskSubject[] = getDefaultSubjects();
}
