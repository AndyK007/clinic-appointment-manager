import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { supabase } from '../lib/supabaseClient';
import type { Appointment } from '../types';

export default function AppointmentList() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    loadAppointments();
  }, []);

  async function loadAppointments() {
    const { data, error } = await supabase
      .from('appointments')
      .select('*')
      .order('appointmentDate', { ascending: true });
    
    if (error) {
      console.error('Error loading appointments:', error);
      return;
    }

    setAppointments(data || []);
  }

  async function updateStatus(id: string, status: 'scheduled' | 'completed' | 'cancelled') {
    const { error } = await supabase
      .from('appointments')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating status:', error);
      return;
    }

    loadAppointments();
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Appointments</h1>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {appointment.patientName}
                </h3>
                <p className="text-gray-600">
                  {format(new Date(appointment.appointmentDate), 'MMM dd, yyyy')} at {appointment.appointmentTime}
                </p>
                {appointment.reason && (
                  <p className="text-gray-500 mt-1">{appointment.reason}</p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <span className={`px-3 py-1 rounded-full text-sm ${
                  appointment.status === 'scheduled' ? 'bg-green-500 text-white' :
                  appointment.status === 'completed' ? 'bg-blue-500 text-white' :
                  'bg-red-500 text-white'
                }`}>
                  {appointment.status}
                </span>
                <select
                  value={appointment.status}
                  onChange={(e) => updateStatus(appointment.id, e.target.value as any)}
                  className="text-sm border rounded p-1"
                >
                  <option value="scheduled">Scheduled</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}