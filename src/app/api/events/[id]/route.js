import Event from '@/models/Event'; // Assuming Event model is in the models directory
import connectDB from '@/lib/connect'; // Assuming connectDB is in the utils directory
import { NextResponse } from 'next/server'; // Import NextResponse from next/server

export async function GET()
{
    const { id } = this.params; // Get the id from the params
    await connectDB(); // Connect to the database
    const event = await Event.findById(id); // Find the event by id
    if (!event) return NextResponse.redirect('/404'); // If the event does not exist, redirect to 404
    return NextResponse.next(); // If the event exists, continue
}