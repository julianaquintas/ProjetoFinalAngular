import { Component, Input, OnInit } from '@angular/core';
import { Task, TaskSubject } from '../../models/task';
import { DataServices } from '../../services/data-services';
import { Header } from '../header/header';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tasklist',
  imports: [Header, RouterLink, DatePipe],
  templateUrl: './tasklist.html',
  styleUrl: './tasklist.css',
})

export class Tasklist implements OnInit {
  
  selectedSubject: string = "All";
  constructor(private dataService: DataServices) {
    
  }
  subjects!:TaskSubject[];

  ngOnInit(): void {
    this.subjects = this.dataService.getSubjects();
  }

  loadTasks() : Task[]
  {
    this.subjects = this.dataService.getSubjects();
    let _tasks = this.dataService.getTasks()
    if(this.selectedSubject === "All")
     _tasks = _tasks.filter(t => t.done === false)
    else if (this.selectedSubject === "Archived")
      _tasks = _tasks.filter(t => t.done);
    else
      _tasks = _tasks.filter(t => t.subject.name === this.selectedSubject && t.done === false);

    return _tasks;
  }

  onSubjectChange(subjectName: string): void {
    this.selectedSubject = subjectName;
    this.loadTasks();
  }
  
}
