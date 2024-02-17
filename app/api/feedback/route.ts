import nodemailer from "nodemailer";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, topic, subject, description } = body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const html = `
      <h1>From: ${name}</h1>
      <h3>${topic}: ${subject}</h3>
      <p>${description}</p>
    `;

    const mailOptions = {
      from: `${name} <${process.env.USER}>`,
      to: process.env.USER,
      subject,
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
