import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

export default function AddAppointment() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: '',
    dob: '',
    mobileNumber: '',
    reason: '',
    appointmentDate: '',
    appointmentTime: '',
    referredBy: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function calculateAge(dob: string): number {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();
    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  }

  function validateForm() {
    const newErrors: Record<string, string> = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = 'Patient name is required';
    }
    if (!formData.dob) {
      newErrors.dob = 'Date of birth is required';
    }
    if (!formData.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10,15}$/.test(formData.mobileNumber.trim())) {
      newErrors.mobileNumber = 'Please enter a valid mobile number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const age = calculateAge(formData.dob);
    
    const { error } = await supabase
      .from('appointments')
      .insert([{
        patientName: formData.patientName,
        dob: formData.dob,
        age,
        mobileNumber: formData.mobileNumber,
        reason: formData.reason,
        appointmentDate: formData.appointmentDate,
        appointmentTime: formData.appointmentTime,
        referredBy: formData.referredBy,
        status: 'scheduled'
      }]);

    if (error) {
      console.error('Error saving appointment:', error);
      return;
    }

    navigate('/');
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">New Appointment</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 space-y-4">
        <p className="text-sm text-red-500">* Required fields</p>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Patient Name *
          </label>
          <input
            type="text"
            value={formData.patientName}
            onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
          />
          {errors.patientName && (
            <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Date of Birth *
          </label>
          <input
            type="date"
            value={formData.dob}
            onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
          />
          {errors.dob && (
            <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Age
          </label>
          <input
            type="text"
            value={formData.dob ? calculateAge(formData.dob) : ''}
            readOnly
            className="w-full p-2 bg-gray-100 border rounded"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Mobile Number *
          </label>
          <input
            type="tel"
            value={formData.mobileNumber}
            onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
          />
          {errors.mobileNumber && (
            <p className="text-red-500 text-sm mt-1">{errors.mobileNumber}</p>
          )}
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Reason for Visit
          </label>
          <textarea
            value={formData.reason}
            onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
            rows={3}
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Appointment Date
          </label>
          <input
            type="date"
            value={formData.appointmentDate}
            onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
            min={new Date().toISOString().split('T')[0]}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Appointment Time
          </label>
          <input
            type="time"
            value={formData.appointmentTime}
            onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">
            Referred By
          </label>
          <input
            type="text"
            value={formData.referredBy}
            onChange={(e) => setFormData({ ...formData, referredBy: e.target.value })}
            className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 font-semibold"
        >
          Schedule Appointment
        </button>
      </form>
    </div>
  );
}