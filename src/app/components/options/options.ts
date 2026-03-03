import { Component } from '@angular/core';
import { getDefaultSubjects, TaskSubject } from '../../models/task';

@Component({
  selector: 'app-options',
  imports: [],
  templateUrl: './options.html',
  styleUrl: './options.css',
})
export class Options {
  subjects:TaskSubject[] = getDefaultSubjects();
}
