# WorkForceAI - Workforce Management Platform

A modern, scalable workforce management platform built with React, TypeScript, and Tailwind CSS. Manage employees, payroll, attendance, leaves, projects, and more from one powerful dashboard.

## 🚀 Features

- **Employee Management** - Centralized employee database with role-based access control
- **Attendance Tracking** - Real-time attendance and time tracking with automated reports
- **Smart Payroll** - Automated payroll processing with deductions and compliance
- **Leave Management** - Streamlined leave application and approval workflows
- **Project Management** - Track projects and team assignments
- **Time Tracking** - Monitor employee work hours and productivity
- **AI Insights** - Data-driven insights to optimize workforce management
- **Multi-tenant Support** - Support for multiple companies and organizations
- **Role-Based Access** - Different dashboards for employees, HR, managers, and platform owners

## 🛠️ Tech Stack

- **Frontend**: React 18+ with TypeScript
- **Styling**: Tailwind CSS with custom components
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Testing**: Vitest
- **UI Components**: Shadcn/ui
- **State Management**: React Context + React Query
- **Routing**: React Router v6

## 📋 Prerequisites

- Node.js 16+ or Bun 1.0+
- npm, yarn, or bun package manager

## 🔧 Installation

1. Clone the repository:
```bash
git clone https://github.com/chamonsheikh121/WorkForceAI-client.git
cd WorkForceAI-client
```

2. Install dependencies:
```bash
bun install
# or
npm install
```

3. Create a `.env` file with required environment variables:
```env
VITE_API_URL=http://localhost:3000
```

## 🚀 Getting Started

### Development Server

Start the development server:
```bash
bun dev
# or
npm run dev
```

The application will be available at `http://localhost:5173`

### Build for Production

```bash
bun run build
# or
npm run build
```

### Run Tests

```bash
bun run test
# or
npm run test
```

## 🎨 Features Breakdown

### User Roles

1. **Platform Owner** - Full system access, manages companies and billing
2. **Company** - Company-level admin with access to company management
3. **HR** - HR staff with access to employee and leave management
4. **Employee** - Basic access to personal dashboard and leave requests

### Key Pages

- **Landing** - Public landing page
- **Dashboard** - Role-based main dashboard
- **Employees** - Employee directory and management
- **Attendance** - Attendance tracking and reports
- **Payroll** - Payroll management and processing
- **Leave** - Leave request and approval management
- **Projects** - Project tracking and management
- **AI Insights** - Analytics and insights
- **Settings** - User and company settings

## 🔐 Authentication

The platform uses role-based authentication with protected routes. Users must login to access most features except:
- Landing page
- Pricing page
- FAQ
- About/Credits page

## 🌓 Theme Support

The application includes both light and dark mode support with persistent theme preference in localStorage.

## 📱 Responsive Design

Built with mobile-first approach using Tailwind CSS. Fully responsive across all device sizes.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Chamon Ali** - [GitHub Profile](https://github.com/chamonsheikh121)

## 📞 Support

For support, please open an issue in the GitHub repository.

---

Made by Chamon Ali
