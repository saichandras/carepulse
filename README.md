# CarePulse - Healthcare Management System

CarePulse is a comprehensive healthcare management system designed to streamline the process of managing patient appointments, doctor schedules, and patient records. This system includes features for both patients and admins, providing a seamless experience for booking, confirming, and canceling appointments.

![CarePulse Dashboard](public/assets/icons/logo-full.svg)

## 📋 Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup](#setup)
- [Environment Variables](#environment-variables)
- [Running the Project](#running-the-project)

## 🤖 Introduction

CarePulse is built using the latest technologies such as Next.js, TypeScript, TailwindCSS, and PostgreSQL. The system is designed to provide an intuitive interface for patients to manage their appointments and for admins to handle the appointment scheduling efficiently.

## 🔋 Features

- **Patient Registration**: Patients can sign up, create a profile, and manage their information.
- **Appointment Booking**: Patients can book appointments with their preferred doctors.
- **Admin Dashboard**: Admins can view and manage all appointments, confirm or cancel them.
- **JWT Authentication**: Secure authentication mechanism using JSON Web Tokens.
- **Responsive Design**: Fully responsive UI, optimized for all device sizes.

## ⚙️ Tech Stack

- **Frontend**: Next.js, React, TypeScript
- **Styling**: TailwindCSS, ShadCN
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Deployment**: Docker, Docker Compose

## 🤸 Setup

### Prerequisites

- Node.js (v16+)
- Docker & Docker Compose

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/carepulse.git
   cd carepulse
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**

   Create a `.env.local` file in the root directory and add the following:

   ```env
   DATABASE_URL="postgresql://admin:admin@localhost:5432/carepulse?schema=public"
   NEXT_PUBLIC_BASE_URL="http://localhost:3000"
   JWT_SECRET="your_jwt_secret_key"
   NEXT_PUBLIC_ADMIN_PASSKEY="123456"
   ```

4. **Run the Project**

   ```bash
   docker-compose up
   ```

   This command will start the PostgreSQL database, run the migrations, and start the Next.js development server.

5. **Access the Application**

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).

## 🚀 Future Enhancements

- **Twilio Integration**: SMS notifications for appointment confirmations.
- **Multi-Language Support**: Adding support for multiple languages to improve accessibility.

## 🛠️ Contribution Guidelines

Feel free to fork this repository and contribute by submitting a pull request. For major changes, please open an issue first to discuss what you would like to change.

---

Made with ❤️ by [Sai Chandra Sriram](https://github.com/saichandras)
