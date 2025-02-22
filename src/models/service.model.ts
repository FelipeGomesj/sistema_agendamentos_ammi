import { Appointment } from "./appointment.model";

export interface Service {
    id: string;
    name: string;
    price: number;
    duration: number;
    appointments:Appointment[];
}