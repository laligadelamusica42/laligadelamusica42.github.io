import { EmaiTemplateV1 } from '@/templates/email/EmailTemplateV1'
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
    console.log(request?.body);
    const reqData = await request?.json(); // Use .json() to extract the data
    try {
        const data = await resend.emails.send({
            from: 'La Liga de la Musica <no-reply@laligadelamusica42.tech>',
            to: reqData?.to, // Removed the array
            subject: 'Bienvenido al evento - La Liga de la Musica',
            text: reqData?.text
        })

        return Response.json(data);
    } catch (error) {
        return Response.json(error);
    }
}