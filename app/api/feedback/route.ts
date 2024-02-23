import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

import { feedbackSchema } from "@/lib/utils";

export async function POST(req: Request) {
  const schema = feedbackSchema.safeParse(await req.json());

  if (!schema.success) {
    return new NextResponse(schema.error.message, { status: 400 });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const html = `
      <div>
        <h3>Feedback from ${schema.data.email}</h3>
        <p>${schema.data.description}</p>
      </div>
    `;

    const mailOptions = {
      from: `<${process.env.USER}>`,
      to: process.env.USER,
      subject: "Feedback from AI",
      html,
    };

    const response = await transporter.sendMail(mailOptions);

    if (!response) {
      return new NextResponse("Failed to sent", { status: 400 });
    }

    return NextResponse.json("Mail sent successfully");
  } catch (error) {
    console.log("FEEDBACK_POST", error);
    return new NextResponse("Server error", { status: 500 });
  }
}
