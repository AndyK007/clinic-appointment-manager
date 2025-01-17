export interface Appointment {
  id: string;
  patientName: string;
  dob: string;
  age: number;
  mobileNumber: string;
  reason: string | null;
  appointmentDate: string;
  appointmentTime: string;
  referredBy: string | null;
  status: 'scheduled' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Database {
  public: {
    Tables: {
      appointments: {
        Row: Appointment;
        Insert: Omit<Appointment, 'id' | 'created_at'>;
        Update: Partial<Omit<Appointment, 'id' | 'created_at'>>;
      };
    };
  };
}