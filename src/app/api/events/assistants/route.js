import { NextResponse } from 'next/server';
import Assistant from '@/models/Assistant';
import connectDB from '@/lib/connect';

export async function GET() {
    try {
        await connectDB();
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
        const { id, fullname, email, intraname, skills, eventId } = JSON.parse(data);
        // Validate if the JSON data is valid
        if (!id || !fullname || !email || !intraname || !skills || !eventId) {
            return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
        }
        // Validate if the assistant already exists
        const assistantExists = await Assistant.findOne({ id });
        if (assistantExists) {
            return NextResponse.json({ error: 'Assistant already exists' }, { status: 400 });
        }
        // Create the assistant
        console.log(id, fullname, email, intraname, skills, eventId);
        // Create the assistant
        const assistant = new Assistant({
            "id": id,
            "fullname": fullname,
            "email": email,
            "intraname": intraname,
            "skills": skills,
            "eventId": eventId
        });
        await assistant.save();
        return NextResponse.json(assistant);
    } catch (error) {
        console.error('Error:', error); // Log the error for debugging
        console.error('Stack Trace:', error.stack); // Log the error stack trace
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}