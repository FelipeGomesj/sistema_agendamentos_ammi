import { Appointment } from "./appointment.model";

export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: string;
    appointment_date: Date;
    appointments: Appointment[];
}