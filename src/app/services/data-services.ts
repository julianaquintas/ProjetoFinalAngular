import { Injectable } from '@angular/core';
import { Task, TaskSubject } from "../models/task";

@Injectable({
  providedIn: 'root',
})
export class DataServices {

  private getStorage(): Storage | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return window.localStorage;
    }
    return null;
  }

  addTask(newTask: Task) {
    const tasks = this.getTasks();
    tasks.unshift(newTask);
    this.saveTasks(tasks);
  }

  public getTasks(): Task[] {
    const storage = this.getStorage();
    if (!storage) return [];
    const savedData = storage.getItem('tasks');
    if (!savedData) return [];
    try {
      return JSON.parse(savedData) as Task[];
    } catch {
      console.log("Could not load tasks");
      return [];
    }
  }

  public removeTask(id: number) {
    const tasks = this.getTasks();
    const updatedTasks = tasks.filter(t => t.id !== id);
    this.saveTasks(updatedTasks);
  }

  public changeTaskStatus(id: number, done: boolean) {
    const tasks = this.getTasks();
    const taskToEdit = tasks.find(t => t.id === id);
    if (taskToEdit) {
      taskToEdit.done = done;
      this.saveTasks(tasks);
    }
  }

  private saveTasks(tasks: Task[]) {
    const storage = this.getStorage();
    if (!storage) return;
    storage.setItem('tasks', JSON.stringify(tasks));
  }

  addSubject(newSubject: TaskSubject) {
    const subjects = this.getSubjects();
    subjects.unshift(newSubject);
    this.saveSubjects(subjects);
  }

  public getSubjects(): TaskSubject[] {
    const storage = this.getStorage();
    if (!storage) return [];
    const savedData = storage.getItem('subjects');
    if (!savedData) return [];
    try {
      return JSON.parse(savedData) as TaskSubject[];
    } catch {
      console.log("Could not load subjects!");
      return [];
    }
  }

  private saveSubjects(subjects: TaskSubject[]) {
    const storage = this.getStorage();
    if (!storage) return;
    storage.setItem('subjects', JSON.stringify(subjects));
  }

  public subjectHasTasks(subjectName:string): boolean
  {
    return this.getTasks().some(t => t.subject_name === subjectName);
  }
  public deleteSubject(subjectName:string)
  {
    const subjects = this.getSubjects();
    const updatedSubjects = subjects.filter(t => t.name !== subjectName);
    this.saveSubjects(updatedSubjects);
  }
}