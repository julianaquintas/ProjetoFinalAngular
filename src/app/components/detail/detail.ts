import { Component, inject, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Task } from '../../models/task';
import { DataServices } from '../../services/data-services';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-detail',
  imports: [Header, RouterLink, DatePipe],
  templateUrl: './detail.html',
  styleUrl: './detail.css',
})
export class Detail implements OnInit {
  taskId!: number;
  private route = inject(ActivatedRoute);
  private dataService = inject(DataServices);
  private router= inject(Router);
 constructor() {
  this.route = inject(ActivatedRoute);
  this.dataService = inject(DataServices);
  this.router = inject(Router);
 }

  task!:Task;

  ngOnInit() {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));

    const _task = this.dataService.getTasks().find(x=> x.id === this.taskId)
    if(_task)
        this.task = _task;
  }

  deleteTask()
  {
    this.dataService.removeTask(this.taskId);
    this.router.navigate(['/tasklist']);
  }

  onTaskDoneChange(event: Event) {
      console.log("onTaskDoneChanged called!");
      const checked = (event.target as HTMLInputElement).checked;
      this.dataService.changeTaskStatus(this.taskId, checked);
    }
}

