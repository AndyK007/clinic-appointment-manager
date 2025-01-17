export interface Appointment {
  id: string;
  patientName: string;
  date: Date;
  time: string;
  reason: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  email: string;
}