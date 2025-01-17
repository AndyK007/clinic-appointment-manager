import { Observable, ObservableArray } from '@nativescript/core';
import { Appointment } from '../models/appointment';

export class AppointmentsViewModel extends Observable {
  private _appointments: ObservableArray<Appointment>;

  constructor() {
    super();
    this._appointments = new ObservableArray<Appointment>([
      {
        id: '1',
        patientName: 'John Doe',
        date: new Date(),
        time: '09:00 AM',
        reason: 'Regular Checkup',
        status: 'scheduled'
      },
      {
        id: '2',
        patientName: 'Jane Smith',
        date: new Date(),
        time: '10:30 AM',
        reason: 'Follow-up',
        status: 'scheduled'
      }
    ]);
  }

  get appointments(): ObservableArray<Appointment> {
    return this._appointments;
  }

  addAppointment(appointment: Appointment) {
    this._appointments.push(appointment);
  }

  deleteAppointment(id: string) {
    const index = this._appointments.findIndex(apt => apt.id === id);
    if (index !== -1) {
      this._appointments.splice(index, 1);
    }
  }

  updateAppointmentStatus(id: string, status: 'scheduled' | 'completed' | 'cancelled') {
    const appointment = this._appointments.find(apt => apt.id === id);
    if (appointment) {
      appointment.status = status;
      this.notifyPropertyChange('appointments', this._appointments);
    }
  }
}