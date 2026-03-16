export interface Task {
  id: number;
  description: string;
  subject_name: string;
  created_at: Date
  due_date: Date;
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