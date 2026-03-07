import { Injectable } from '@angular/core';
import { Task, TaskSubject } from "../models/task";
@Injectable({
  providedIn: 'root',
})
export class DataServices {
  addTask(newTask:Task)
  {
     let tasks:Task[] = this.getTasks();
     tasks.unshift(newTask);
     this.saveTasks(tasks);
  }

  addSubject(newSubject:TaskSubject)
  {
    console.log("add Subject called")
     let subjects:TaskSubject[] = this.getSubjects();
     subjects.unshift(newSubject);
     this.saveSubjects(subjects);
  }

  public getTasks():Task[]
  {
    let savedData:string|null = null;
    if(typeof globalThis.localStorage !== "undefined")
      savedData = globalThis.localStorage.getItem('tasks'); 

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
        console.log("Could not load tasks");
        return [];
      }
    }
  }

  public getSubjects():TaskSubject[]
  {
    let savedData:string | null = null;
    if(typeof globalThis.localStorage !== "undefined")
     savedData = globalThis.localStorage.getItem('subjects'); 

    if(savedData === null)
        return [];
    else
    {
      try
      {
        let tasks:TaskSubject[] = JSON.parse(savedData);
        return tasks;
      }
      catch 
      {
        console.log("Could not load subjects!"); 
        return [];
      }
    }
  }

  public removeTask(id:number)
  {
    const tasks = this.getTasks();         
    const updatedTasks = tasks.filter(t => t.id !== id);
    this.saveTasks(updatedTasks);
  }

  public changeTaskStatus(id:number, done:boolean)
  {
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
    if(typeof globalThis.localStorage === "undefined")
    {
      alert("Error: could not save the task");
      return;
    }
    if(typeof globalThis.localStorage !== 'undefined')
      globalThis.localStorage.setItem('tasks', jsonData);   
  }

  private saveSubjects(subjects:TaskSubject[])
  {
    let jsonData:string = JSON.stringify(subjects);
    if(typeof localStorage === 'undefined')
    {
      alert("Error: could not save the task");
      return;
    }
    else   
      globalThis.localStorage.setItem('subjects', jsonData);   
  }
}

