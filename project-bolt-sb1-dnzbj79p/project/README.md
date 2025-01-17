# Clinic Appointment Manager

A modern web application for managing patient appointments in small clinics.

## Features

- 📅 Appointment scheduling and management
- 👥 Patient information tracking
- 📱 Responsive design for all devices
- 🔄 Real-time status updates
- 📊 Simple and intuitive interface

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Supabase (Database)
- Vite (Build tool)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/clinic-appointment-manager.git
   cd clinic-appointment-manager
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the Supabase credentials in `.env`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Database Setup

The application uses Supabase as its database. The schema includes:

- Appointments table with fields for patient information
- Automatic age calculation
- Status tracking (scheduled/completed/cancelled)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.