import { NextResponse } from 'next/server';
import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json();

        const params = {
            Source: "krishnendughosal999@gmail.com", // Must be verified in SES
            Destination: {
                ToAddresses: ["krishnendughosal999@gmail.com"], 
            },
            Message: {
                Subject: { Data: `Portfolio Lead: ${name}` },
                Body: {
                    Html: {
                        Data: `
                            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee;">
                                <h2 style="color: #6366f1;">New Contact Form Submission</h2>
                                <p><strong>Name:</strong> ${name}</p>
                                <p><strong>Email:</strong> ${email}</p>
                                <p><strong>Message:</strong></p>
                                <p style="background: #f9fafb; padding: 15px; border-radius: 8px;">${message}</p>
                            </div>
                        `,
                    },
                },
            },
        };

        const command = new SendEmailCommand(params);
        await sesClient.send(command);

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error: any) {
        console.error("SES Error:", error);
        return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }
}