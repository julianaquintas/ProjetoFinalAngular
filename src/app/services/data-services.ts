import { Injectable } from '@angular/core';
import { Task, TaskSubject } from "../models/task";

@Injectable({
  providedIn: 'root',
})
export class DataServices {
  saveTasks (newTask:Task)
  {
     let tasks:Task[] = this.getTasks();
     tasks.unshift(newTask) //TODO:  nao sei se deixo unshift ou faço push
     
     let jsonData:string = JSON.stringify(tasks);
     window.localStorage.setItem('tasks', jsonData);    
  }

   public getTasks():Task[]
  {
    const savedData = window.localStorage.getItem('tasks'); //TODO: trocar 'tasks' por uma constante

    if(savedData === null)
        return [];
    else
    {
      try
      {
        let tasks:Task[] = JSON.parse(savedData);
        return tasks;
      }
      catch 
      {
        console.log("Could not load tasks"); // TODO: tratar o erro como deve ser
        return [];
      }
    }
  }
/*
export function loadSubjects() {
    return [];
} */

//createSubject()

//saveSubject()

//editSubject()

//deleteSubject()
}

