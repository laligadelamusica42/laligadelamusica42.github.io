import Event from '@/models/Event'; // Assuming Event model is in the models directory
import connectDB from '@/lib/connect'; // Assuming connectDB is in the utils directory
import { NextResponse } from 'next/server'; // Import NextResponse from next/server

export async function GET(req) {
  const id = req.url.split('/api/events/find/')[1];

  try {
    await connectDB();
    const event = await Event.findOne({ id: id });
    return NextResponse.json(event, { status: 200 });
  } catch (error) {
    return NextResponse.error(error, { status: 500 });
  }
}
