import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import { Task, TaskPriority, TaskSubject } from '../../models/task';
import { Header } from '../header/header';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { DataServices } from '../../services/data-services';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-taskform',
  providers: [provideNativeDateAdapter()],
  imports: [ReactiveFormsModule, Header, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatIconModule, RouterModule, RouterLink],
  templateUrl: './taskform.html',
  styleUrl: './taskform.css',
})

export class Taskform implements OnInit {

  private dataService = inject(DataServices);
  private router = inject(Router)
 
  readonly startDate = new Date();
  priorities = Object.values(TaskPriority);
  subjects: TaskSubject[] = [];
  form!: FormGroup;

  ngOnInit() {
    this.subjects = this.dataService.getSubjects();

    this.form = new FormGroup({
      description: new FormControl('', [Validators.required, Validators.minLength(3)]),
      subject: new FormControl(this.subjects[0]?.name || '', Validators.required),
      dueDate: new FormControl(null, Validators.required),
      priority: new FormControl(this.priorities[0], Validators.required)
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const _description = this.form.get('description')?.value;
      const _subjectName = this.form.get('subject')?.value;
      const _dueDate = this.form.get('dueDate')?.value;
      const _priority = this.form.get('priority')?.value;

      //const _subject = this.subjects.find(x => x.name === _subjectName);

      if (_description && _subjectName && _dueDate && _priority) {
        const newTask: Task = {
          id: Date.now(),
          description: _description,
          subject_name: _subjectName,
          due_date: new Date(_dueDate),
          created_at: new Date(Date.now()),
          priority: _priority as TaskPriority,
          done: false
        };

        this.dataService.addTask(newTask);
        this.router.navigate(['/tasklist']);
      }
    } else {
      alert("Please, fill the form correctly.");
    }
  }
}