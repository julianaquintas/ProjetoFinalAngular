import { Injectable } from '@angular/core';
import { Task, TaskSubject } from "../models/task";

@Injectable({
  providedIn: 'root',
})
export class DataServices {
  addTask(newTask:Task)
  {
    console.log("Save task called!")
     let tasks:Task[] = this.getTasks();
     tasks.unshift(newTask) //TODO:  nao sei se deixo unshift ou faço push
     this.saveTasks(tasks);
  }

   public getTasks():Task[]
  {
    const savedData = localStorage.getItem('tasks'); //TODO: trocar 'tasks' por uma constante

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

  public removeTask(id:Number)
  {
    const tasks = this.getTasks();         
    const updatedTasks = tasks.filter(t => t.id !== id);
    this.saveTasks(updatedTasks);
  }

  public changeTaskStatus(id:number, done:boolean)
  {
      // Se quiseres guardar no localStorage:
  let tasks:Task[] = this.getTasks();
  let taskToEdit = tasks.find(t => t.id === id);
  if(taskToEdit) 
    {
      taskToEdit.done = done;
      this.saveTasks(tasks);
    }
  
  }

  private saveTasks(tasks:Task[])
  {
    let jsonData:string = JSON.stringify(tasks);
     window.localStorage.setItem('tasks', jsonData);   
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

