import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Task, getDefaultSubjects, TaskPriority, TaskSubject } from '../../models/task';
import { Header } from '../header/header';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { DataServices } from '../../services/data-services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-taskform',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, Header, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule],
  templateUrl: './taskform.html',
  styleUrl: './taskform.css',
})

export class Taskform {
  constructor(private dataService: DataServices, private router: Router) {}
  readonly startDate = new Date();
  subjects:TaskSubject[] = getDefaultSubjects();
  priorities = Object.values(TaskPriority);
  form = new FormGroup({
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
    subject: new FormControl(this.subjects[0].name, Validators.required), 
    dueDate:new FormControl(null, Validators.required),
    priority: new FormControl(this.priorities[0], Validators.required)
  });

  onSubmit()
  {
    if(this.form.valid)
    {
      const _description = this.form.get('description')?.value;
      const _subjectName= this.form.get('subject')?.value;
  
      const _dueDate = this.form.get('dueDate')?.value;
      const _priority = this.form.get('priority')?.value
      const _subject: TaskSubject | undefined = this.subjects.find(x => x.name === _subjectName);

      if(_description && _subject && _dueDate && _priority)
      {
        const newTask:Task = {
          id: Date.now(),
          description: _description,
          subject: _subject, 
          dueDate: new Date(_dueDate), 
          priority: _priority as TaskPriority,
          done: false
        }  
        this.dataService.addTask(newTask);
        this.router.navigate(['/tasklist']);
      }
    }
    else 
    {
      alert("Please, fill the form correctly.");
    }
  }
}