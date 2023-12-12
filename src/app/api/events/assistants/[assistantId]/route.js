import { NextResponse } from 'next/server';
import Assistant from '@/models/Assistant';
import connectDB from '@/lib/connect';

export async function GET(req) {
    const id = req.url.split('/api/events/assistants/')[1];
    try {
        await connectDB();
        const assistant = await Assistant.findOne({ id: id });
        return NextResponse.json(assistant, { status: 200 });
    } catch (error) {
        return NextResponse.error(error, { status: 500 });
    }
}