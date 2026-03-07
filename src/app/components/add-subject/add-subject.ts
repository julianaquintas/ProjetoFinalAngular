import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Header } from '../header/header';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { DataServices } from '../../services/data-services';
import { TaskSubject } from '../../models/task';

@Component({
  selector: 'app-add-subject',
  imports: [ReactiveFormsModule, Header, RouterModule, RouterLink],
  templateUrl: './add-subject.html',
  styleUrl: './add-subject.css',
})
export class AddSubject {
  constructor(private dataService: DataServices, private router: Router) {}
  form = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    credits: new FormControl(0, Validators.required)
  });

  nameIsTaken():boolean {
    const _subjectName = this.form.get('name')?.value;
    return this.dataService.getSubjects().some(s => s.name === _subjectName);
         
  }
  onSubmit()
  {
    if(this.form.valid)
    {
      const _credits = this.form.get('credits')?.value;
      const _subjectName = this.form.get('name')?.value ?? '';
      if(this.nameIsTaken())
      {          
        alert("That subject name is already taken! Please choose another");
        return;
      }

      if(_subjectName && _credits)
      {
        const newSubject:TaskSubject = {
          name: _subjectName,
          credits: _credits
        }  
        this.dataService.addSubject(newSubject);
        this.router.navigate(['/options']);
      }
    }
    else 
    {
      alert("Please, fill the form correctly.");
    }
  }
}
