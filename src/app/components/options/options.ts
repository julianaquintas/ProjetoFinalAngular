import { Component, OnInit } from '@angular/core';
import { TaskSubject } from '../../models/task';
import { Header } from '../header/header';
import { DataServices } from '../../services/data-services';
import { RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-options',
  imports: [Header, RouterModule, RouterLink],
  templateUrl: './options.html',
  styleUrl: './options.css',
})
export class Options implements OnInit {
  constructor(private dataService: DataServices) {}
  subjects!:TaskSubject[];

   ngOnInit() {
     console.log("Options init");
    const subjects = this.dataService.getSubjects();
    console.log(subjects);
    this.subjects = subjects;
  }
}
