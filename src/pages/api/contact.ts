import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'

type ResponseData = {
  success: boolean
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' })
  }

  const { name, email, subject, message } = req.body

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required' })
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return res.status(400).json({ success: false, message: 'Invalid email address' })
  }

  try {
    // Create transporter (configure with your email service)
    const transporter = nodemailer.createTransport({
      service: 'gmail', // or your preferred service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password for Gmail
      },
    })

    // Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'devpatel170521@gmail.com',
      replyTo: email,
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1, #d946ef); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #6366f1; }
            .value { margin-top: 5px; padding: 10px; background: white; border-radius: 5px; }
            .footer { margin-top: 20px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2 style="margin: 0;">New Portfolio Contact Message</h2>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">From:</div>
                <div class="value">${name} (${email})</div>
              </div>
              <div class="field">
                <div class="label">Subject:</div>
                <div class="value">${subject}</div>
              </div>
              <div class="field">
                <div class="label">Message:</div>
                <div class="value">${message.replace(/\n/g, '<br>')}</div>
              </div>
            </div>
            <div class="footer">
              This message was sent from your portfolio website contact form.
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New Portfolio Contact Message
        
        From: ${name} (${email})
        Subject: ${subject}
        
        Message:
        ${message}
        
        ---
        This message was sent from your portfolio website contact form.
      `,
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Send auto-reply to the sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Dev Patel',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #6366f1, #d946ef); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 24px; background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; text-decoration: none; border-radius: 25px; margin-top: 20px; }
            .footer { margin-top: 20px; text-align: center; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">Thank You!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Your message has been received</p>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              <p>Thank you for reaching out! I've received your message and will get back to you within 24-48 hours.</p>
              <p>In the meantime, feel free to:</p>
              <ul>
                <li>Check out my latest projects on GitHub</li>
                <li>Connect with me on LinkedIn</li>
                <li>Browse my portfolio for more information</li>
              </ul>
              <p>Looking forward to connecting with you!</p>
              <p>Best regards,<br><strong>Dev Patel</strong><br>Full Stack Developer & Technical Leader</p>
            </div>
            <div class="footer">
              This is an automated response. Please do not reply to this email.
            </div>
          </div>
        </body>
        </html>
      `,
    }

    await transporter.sendMail(autoReplyOptions)

    return res.status(200).json({ success: true, message: 'Message sent successfully!' })
  } catch (error) {
    console.error('Email error:', error)
    return res.status(500).json({ success: false, message: 'Failed to send message. Please try again.' })
  }
}
