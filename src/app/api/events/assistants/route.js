import { NextResponse } from 'next/server';
import Assistant from '@/models/Assistant';
import connectDB from '@/lib/connect';

export async function GET() {
    try {
        await connectDB(); // Add missing import statement for connectDB function
        const assistants = await Assistant.find({});
        return NextResponse.json(assistants);
    } catch (error) {
        return NextResponse.status(500).json({ error: error.message });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        let data = '';
        for await (const chunk of request.body) {
            data += chunk;
        }
        try {
            data = JSON.parse(data);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            return NextResponse.json({ error: 'Invalid JSON in request body' }, { status: 400 });
        }
        console.log(data); // Log the parsed data
        const newAssistant = new Assistant(data);
        await newAssistant.save();
        return NextResponse.json(newAssistant, { status: 200 });
    } catch (error) {
        console.error(error); // Log the error for debugging
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}