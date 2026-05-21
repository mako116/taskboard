import { TaskStatus } from "@/store/slices/taskSlice";

export interface ApiTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface ApiUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  company: { name: string; catchPhrase: string; bs: string };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}


export interface ColumnConfig {
  id: TaskStatus;
  label: string;
  accent: string;
}