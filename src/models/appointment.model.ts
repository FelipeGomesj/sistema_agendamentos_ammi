import { Service } from "./service.model";
import { User } from "./user.model";

export interface Appointment {
  id: string;
  userId: string;
  serviceId:string
  user: User;
  service:Service
  createdAt: Date;
}