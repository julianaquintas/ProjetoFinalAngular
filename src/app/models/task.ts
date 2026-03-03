export interface Task {
  id: number;
  description: string;
  subject: TaskSubject;
  dueDate: Date;
  priority: TaskPriority;
  done: boolean;
}

export enum TaskPriority {
    LOW,
    MEDIUM,
    HIGH
}

export interface TaskSubject {
    name:string;
    credits:number;
}

export function getDefaultSubjects():TaskSubject[]
{
    let defaultSubjects:TaskSubject[] = [
         {name:"Constitutional Law", credits:15},
         {name:"History of Law", credits:13},
         {name:"Political Philosophy", credits:5}
    ];

    return defaultSubjects;
}

export function getDefaultTasks():Task[]
{
    let defaultTasks:Task[] = [
        {
            id: 0,
            description: "Review class notes",
            subject: {name:"Constitutional Law", credits:15},
            dueDate: new Date(2026, 3, 10, 2, 30),
            priority: TaskPriority.LOW,
            done: false
        },
         {
            id: 1,
            description: "Read article",
            subject: {name:"Constitutional Law", credits:13},
            dueDate: new Date(2026, 3, 10, 2, 30),
            priority: TaskPriority.HIGH,
            done: false
        },
        {
            id: 2,
            description: "Study Plato",
            subject: {name:"History of Law", credits:10},
            dueDate: new Date(2026, 4, 10, 2, 30),
            priority: TaskPriority.MEDIUM,
            done: false
        },
        {
            id: 1,
            description: "Review Kant excerpt",
            subject: {name:"Political Philosophy", credits:5},
            dueDate: new Date(2025, 3, 11, 2, 30),
            priority: TaskPriority.LOW,
            done: true
        }
    ];

    return defaultTasks;
}