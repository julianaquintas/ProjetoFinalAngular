export interface Task {
  id: number;
  description: string;
  subject: TaskSubject;
  dueDate: Date;
  priority: TaskPriority;
  done: boolean;
}

export enum TaskPriority {
    LOW = "Low",
    MEDIUM = "Medium",
    HIGH = "High"
}

export interface TaskSubject {
    name:string;
    credits:number;
}