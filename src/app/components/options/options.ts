import { Component, inject, OnInit } from '@angular/core';
import { TaskSubject } from '../../models/task';
import { Header } from '../header/header';
import { DataServices } from '../../services/data-services';
import { RouterLink, RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-options',
  imports: [Header, RouterModule, RouterLink],
  templateUrl: './options.html',
  styleUrl: './options.css',
})
export class Options implements OnInit {

  private dataService = inject(DataServices);
  private router =  inject(Router);
  constructor() {
    this.dataService = inject(DataServices);
    this.router = inject(Router);
  }
  subjects!:TaskSubject[];

  ngOnInit() {
    const subjects = this.dataService.getSubjects();
    this.subjects = subjects;
  }

  deleteSubject(subjectName:string)
  {
    if(this.dataService.subjectHasTasks(subjectName))
    {
      alert("Can't delete a subject that has tasks assigned!")
    }
    else
    {
        this.dataService.deleteSubject(subjectName);
        //this.router.navigate(['/options']);
        this.ngOnInit();
    }
    
  }
}
