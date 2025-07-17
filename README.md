# CarePulse - Healthcare Management System

A full-stack healthcare management platform that demonstrates end-to-end development skills through comprehensive patient appointment management and administrative workflows. Built with modern web technologies and production-ready architecture.

## 🎯 Project Overview

Engineered a comprehensive healthcare patient management application that streamlines the entire appointment lifecycle from patient registration to administrative oversight. The system demonstrates full-stack development capabilities with secure authentication, real-time data management, and intuitive user interfaces for both patients and administrators.

**Key Accomplishments:**
- Built complete patient registration and appointment booking system with form validation
- Developed robust administrative dashboard with appointment analytics (94 scheduled, 32 pending, 56 cancelled)
- Implemented secure role-based access control with passcode protection for admin functions
- Created responsive UI with modal-based interactions and real-time appointment management
- Integrated comprehensive appointment lifecycle management (schedule, confirm, cancel, reschedule)
- Designed user-friendly patient portal with profile management and appointment history

## 📹 Application Demo Videos

### **User Sign Up & Authentication Workflow**
| **Complete Authentication Process** |
|-------------------------------------|
| <video src="https://github.com/user-attachments/assets/d398d331-7fe8-4868-874e-c37332795f09" width="800" controls></video> |
| Complete sign-in and signup workflow with real-time validation, user feedback, and secure authentication |

### **Patient Registration Process**
| **Comprehensive Patient Registration** |
|----------------------------------------|
| <video src="https://github.com/user-attachments/assets/57aeb3c3-4f3a-4b18-bc11-204a1d922ae3" width="800" controls></video> |
| Detailed patient registration with medical history collection, form validation, and secure data handling |

### **New Appointment Booking**
| **Real-time Appointment Scheduling** |
|--------------------------------------|
| <video src="https://github.com/user-attachments/assets/3017c090-d1e0-4ecf-8c31-0bdfff6f06b1" width="800" controls></video> |
| Complete appointment booking system with doctor selection, date/time scheduling, and confirmation process |

### **User Dashboard Experience**
| **Patient Dashboard & Profile Management** |
|--------------------------------------------|
| <video src="https://github.com/user-attachments/assets/3fcd9d89-6aa0-4d04-9887-225e582e4860" width="800" controls></video> |
| Comprehensive user dashboard with appointment management, profile updates, and appointment history |

### **Admin Panel Management**
| **Administrative Dashboard & Controls** |
|-----------------------------------------|
| <video src="https://github.com/user-attachments/assets/5cf18556-8be0-4b52-9be6-9acc5b26195d" width="800" controls></video> |
| Full admin panel with real-time analytics, appointment management, patient oversight, and administrative controls |

## 🔋 Features

**Patient Portal**
- Secure user registration and authentication
- Appointment booking with real-time availability
- Profile management and appointment history

**Admin Dashboard**
- Comprehensive appointment management (confirm, cancel, reschedule)
- Patient record management
- Real-time dashboard analytics
- Secure admin access with passkey authentication

**System Features**
- JWT-based authentication
- Responsive design for all devices
- Form validation and error handling
- Docker containerization for easy deployment

## ⚙️ Tech Stack

**Frontend & Backend**
- Next.js 14 with App Router (Full-stack framework)
- TypeScript for type safety
- Next.js API Routes for backend functionality

**UI/UX & Styling**
- TailwindCSS with custom design system
- Radix UI components for accessibility
- Plus Jakarta Sans font (Google Fonts)
- Dark theme with custom theme provider
- React Toastify for notifications

**Forms & Validation**
- React Hook Form for form management
- Zod for schema validation
- React FilePond for file uploads
- React DatePicker and phone number input

**Database & Authentication**
- PostgreSQL with Prisma ORM
- JWT authentication with Jose library
- Argon2 for secure password hashing
- Next-client-cookies for session management

**Data Management**
- Tanstack Table for complex data display
- Real-time appointment status updates
- File upload with validation and preview

**Development & DevOps**
- TypeScript for type safety
- ESLint for code quality
- Docker & Docker Compose for containerization
- Environment-based configuration

## 🤸 Quick Start

### Prerequisites
- Node.js (v18+)
- Docker & Docker Compose

### Installation
```bash
# Clone repository
git clone https://github.com/your-username/carepulse.git
cd carepulse

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your configuration

# Start with Docker
docker-compose up -d

# Access application
# http://localhost:3000
```

### Environment Variables
```env
DATABASE_URL="postgresql://admin:admin@localhost:5432/carepulse?schema=public"
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
JWT_SECRET="your_jwt_secret_key"
NEXT_PUBLIC_ADMIN_PASSKEY="123456"
```

## 🚀 Development

```bash
npm run dev          # Start development server
npm run build        # Create production build
npm run db:migrate   # Run database migrations
npm run lint         # Code linting
```

## 🔮 Future Enhancements

- SMS notifications with Twilio integration
- Real-time updates with WebSocket
- Advanced analytics dashboard
- Multi-language support
- Mobile app companion

---

**Built by [Sai Chandra Sriram](https://github.com/saichandras)** - Demonstrating full-stack development with modern web technologies
