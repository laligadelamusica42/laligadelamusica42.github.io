import { NextResponse } from 'next/server';
import connectDB from '@/lib/connect';
import Event from '@/models/Event'; // Remove the redundant import

export async function GET() {
  await connectDB();
  const events = await Event.find({});
  return NextResponse.json(events);
}

export async function POST(req) {
  const { eventName, eventDescription, eventDate, eventLocation, eventTime, eventOrganizer } = req.body;
  await connectDB();
  const event = new Event({
    eventName,
    eventDescription,
    eventDate,
    eventLocation,
    eventTime,
    eventOrganizer
  });
  await event.save(); // Save the event to the database
  return NextResponse.redirect('/api/events');
}