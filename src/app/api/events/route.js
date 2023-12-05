import { NextResponse } from 'next/server';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import connectDB from '@/lib/connect';
import Event from '@/models/Event'; // Remove the redundant import

export async function GET() {
  await connectDB();
  const events = await Event.find({});
  return NextResponse.json(events);
}

export async function POST(req) {
  const { eventName, eventDescription, eventDate, eventLocation, eventTime, eventOrganizer } = req.body;
  
}