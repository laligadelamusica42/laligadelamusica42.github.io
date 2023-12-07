import Event from '@/models/Event'; // Assuming Event model is in the models directory
import connectDB from '@/lib/connect'; // Assuming connectDB is in the utils directory
import { NextResponse } from 'next/server'; // Import NextResponse from next/server

export async function GET({ params }) {
  await connectDB();
  const event = await Event.findById(params?.id);
  return new NextResponse(200, event);
}