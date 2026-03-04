import { Component, Input } from '@angular/core';
import { Task, TaskSubject, getDefaultSubjects, getDefaultTasks } from '../../models/task';
import { DataServices } from '../../services/data-services';
import { Header } from '../header/header';

@Component({
  selector: 'app-tasklist',
  imports: [Header],
  templateUrl: './tasklist.html',
  styleUrl: './tasklist.css',
})
export class Tasklist {
  constructor(private dataService: DataServices) {}

  loadTasks()
  {
    return this.dataService.getTasks()
  }
  subjects:TaskSubject[] = getDefaultSubjects();


}
