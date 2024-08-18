import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { PatientFormValidation } from '@/lib/validation';
import { GetPatientResponse, PostPatientResponse, RegisterPatientParams } from '@/types/models';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const parsedData = PatientFormValidation.parse(data);

    let userId = data.userId;
    if (!userId) {
      return NextResponse.json({ message: 'User ID is required' }, { status: 400 });
    }
    userId = Number(userId);

    // Convert File[] or Uint8Array to Buffer if it exists
    let identificationDocumentBuffer: Buffer | undefined = undefined;
    if (parsedData.identificationDocument) {
      const byteArray = Object.values(parsedData.identificationDocument);
      identificationDocumentBuffer = Buffer.from(byteArray);
    }

    const patientData: Omit<RegisterPatientParams, 'userId'> = {
      birthDate: new Date(parsedData.birthDate),
      gender: parsedData.gender,
      address: parsedData.address,
      occupation: parsedData.occupation,
      emergencyContactName: parsedData.emergencyContactName,
      emergencyContactNumber: parsedData.emergencyContactNumber,
      primaryPhysician: parsedData.primaryPhysician,
      insuranceProvider: parsedData.insuranceProvider,
      insurancePolicyNumber: parsedData.insurancePolicyNumber,
      allergies: parsedData.allergies,
      currentMedication: parsedData.currentMedication,
      familyMedicalHistory: parsedData.familyMedicalHistory,
      pastMedicalHistory: parsedData.pastMedicalHistory,
      identificationType: parsedData.identificationType,
      identificationNumber: parsedData.identificationNumber,
      identificationDocument: identificationDocumentBuffer,
      treatmentConsent: parsedData.treatmentConsent,
      disclosureConsent: parsedData.disclosureConsent,
      privacyConsent: parsedData.privacyConsent,
    };

    // Find existing patient by userId
    const existingPatient = await prisma.patient.findFirst({
      where: { userId },
    });

    let patient;
    if (existingPatient) {
      // Update existing patient
      patient = await prisma.patient.update({
        where: { id: existingPatient.id },
        data: patientData,
      });
    } else {
      // Create new patient
      patient = await prisma.patient.create({
        data: {
          ...patientData,
          user: {
            connect: {
              id: userId,
            },
          },
        },
      });
    }

    const response: PostPatientResponse = {
      status: 'success',
      data: { patient },
      message: 'Patient created successfully',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { status: 'error', message: 'Validation failed, please check your input.' },
        { status: 400 },
      );
    } else {
      return NextResponse.json(
        {
          status: 'error',
          message: 'Something went wrong registering your information, please try again!',
        },
        { status: 500 },
      );
    }
  }
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json(
        { status: 'error', message: 'User ID is required' },
        { status: 400 },
      );
    }

    const patient = await prisma.patient.findFirst({
      where: { userId: Number(userId) },
    });

    const response: GetPatientResponse = {
      status: 'success',
      data: {
        patient: patient || null,
      },
      message: patient ? 'Patient retrieved successfully' : 'Patient not found',
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const response: GetPatientResponse = {
      status: 'error',
      data: { patient: null },
      message: 'Something went wrong retrieving patient information, please try again!',
    };
    return NextResponse.json(response, { status: 500 });
  }
}
