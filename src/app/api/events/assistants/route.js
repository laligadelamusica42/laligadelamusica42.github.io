import { NextResponse } from 'next/server';
import Assistant from '@/models/Assistant';
import connectDB from '@/lib/connect';

export async function GET() {
    try {
        connectDB();
        const assistants = await Assistant.find({});
        return NextResponse.json(assistants);
    } catch (error) {
        return NextResponse.status(500).json({ error: error.message });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const data = request.body; // Access the parsed body directly
        const newAssistant = new Assistant(data);
        await newAssistant.save();
        return NextResponse.json(newAssistant, { status: 200 });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}