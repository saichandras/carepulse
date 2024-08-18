import { AppointmentInternalFieldsSchema, getAppointmentSchema } from '@/lib/validation';
import { GetAppointmentResponse, PostAppointmentResponse } from '@/types/models';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const prisma = new PrismaClient();

// POST handler to create an appointment
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const appointmentType = data.type;

    if (!appointmentType) {
      return NextResponse.json(
        { status: 'error', error: 'Invalid appointment type.' },
        { status: 400 },
      );
    }

    let userId = data.userId;
    if (!userId) {
      return NextResponse.json({ status: 'error', error: 'User ID is required' }, { status: 400 });
    }
    userId = Number(userId);

    let patientId = data.patientId;
    if (!patientId) {
      return NextResponse.json(
        { status: 'error', error: 'Patient ID is required' },
        { status: 400 },
      );
    }
    patientId = Number(patientId);

    const AppointmentFormValidation = getAppointmentSchema(appointmentType);
    const parsedData = AppointmentFormValidation.parse(data);

    // Extract validated data
    const { primaryPhysician, schedule, reason, notes, cancellationReason, status } = parsedData;

    // Create the appointment
    const appointment = await prisma.appointment.create({
      data: {
        userId,
        patientId,
        primaryPhysician,
        schedule: new Date(schedule),
        reason,
        notes,
        cancellationReason,
        status,
      },
    });

    const response: PostAppointmentResponse = {
      status: 'success',
      data: {
        appointment,
      },
      message: 'Appointment scheduled successfully',
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          status: 'error',
          error: 'Validation failed, please check your input.',
          meta: { errors: error.errors },
        },
        { status: 400 },
      );
    } else {
      console.error('Error creating appointment:', error);
      return NextResponse.json(
        {
          status: 'error',
          error: 'Something went wrong with scheduling your appointment, please try again!',
        },
        { status: 500 },
      );
    }
  }
}

// GET handler to retrieve an appointment by appointmentId, userId, or all appointments
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const appointmentId = searchParams.get('appointmentId');
    const userId = searchParams.get('userId');

    // Handle the case when neither appointmentId nor userId is provided
    if (!appointmentId && !userId) {
      // Fetch all appointments ordered by createdAt in descending order and include patient and user details
      const appointments = await prisma.appointment.findMany({
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          patient: {
            include: {
              user: true, // Include user details in the patient object
            },
          },
        },
      });

      // Calculate counts for different appointment statuses
      const totalCount = appointments.length;
      const scheduledCount = appointments.filter((app) => app.status === 'scheduled').length;
      const pendingCount = appointments.filter((app) => app.status === 'pending').length;
      const cancelledCount = appointments.filter((app) => app.status === 'cancelled').length;

      // Construct the response
      const response: GetAppointmentResponse = {
        status: 'success',
        data: {
          totalCount,
          scheduledCount,
          pendingCount,
          cancelledCount,
          appointments,
        },
        message: 'Fetched all appointments successfully',
      };

      return NextResponse.json(response, { status: 200 });
    }

    // Handle fetching by appointmentId
    if (appointmentId) {
      if (isNaN(Number(appointmentId))) {
        return NextResponse.json(
          {
            status: 'error',
            error: 'Invalid appointment ID.',
          },
          { status: 400 },
        );
      }

      // Convert appointmentId to a number
      const id = Number(appointmentId);

      // Fetch the appointment from the database, including patient and user details
      const appointment = await prisma.appointment.findUnique({
        where: {
          id: id,
        },
        include: {
          patient: {
            include: {
              user: true, // Include user details in the patient object
            },
          },
        },
      });

      if (!appointment) {
        return NextResponse.json(
          {
            status: 'error',
            error: 'Appointment not found.',
          },
          { status: 404 },
        );
      }

      // Construct the response for a single appointment
      const response: GetAppointmentResponse = {
        status: 'success',
        data: {
          totalCount: 1,
          scheduledCount: appointment.status === 'scheduled' ? 1 : 0,
          pendingCount: appointment.status === 'pending' ? 1 : 0,
          cancelledCount: appointment.status === 'cancelled' ? 1 : 0,
          appointments: [appointment],
        },
        message: 'Fetched appointment successfully',
      };

      return NextResponse.json(response, { status: 200 });
    }

    // Handle fetching by userId
    if (userId) {
      // Fetch appointments by userId, including patient and user details
      const appointments = await prisma.appointment.findMany({
        where: {
          patient: {
            userId: Number(userId),
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          patient: {
            include: {
              user: true, // Include user details in the patient object
            },
          },
        },
      });

      // Calculate counts for different appointment statuses
      const totalCount = appointments.length;
      const scheduledCount = appointments.filter((app) => app.status === 'scheduled').length;
      const pendingCount = appointments.filter((app) => app.status === 'pending').length;
      const cancelledCount = appointments.filter((app) => app.status === 'cancelled').length;

      // Construct the response
      const response: GetAppointmentResponse = {
        status: 'success',
        data: {
          totalCount,
          scheduledCount,
          pendingCount,
          cancelledCount,
          appointments,
        },
        message: `Fetched appointments for userId ${userId} successfully`,
      };

      return NextResponse.json(response, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return NextResponse.json(
      {
        status: 'error',
        error: 'Something went wrong while fetching the appointment(s), please try again!',
      },
      { status: 500 },
    );
  }
}

// PUT handler to update an appointment
export async function PUT(req: NextRequest) {
  try {
    const data = await req.json();

    // Validate internal fields
    const internaAppointmentlData = AppointmentInternalFieldsSchema.parse(data);

    const { appointmentId, userId, type, patientId } = internaAppointmentlData;

    // Validate user input fields
    const AppointmentFormValidation = getAppointmentSchema(type);
    const userInputData = AppointmentFormValidation.parse(data);

    const { primaryPhysician, schedule, reason, notes, cancellationReason, status } = userInputData;

    // Update the appointment in the database
    const updatedAppointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: {
        userId,
        patientId,
        primaryPhysician,
        schedule,
        reason,
        notes,
        cancellationReason,
        status,
      },
      include: {
        patient: {
          include: {
            user: true,
          },
        },
      },
    });

    const response: PostAppointmentResponse = {
      status: 'success',
      data: {
        appointment: updatedAppointment,
      },
      message: 'Appointment updated successfully',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ message: 'Invalid input', errors: error.errors }, { status: 400 });
    }
    console.error('Error updating appointment:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}
