"""
Email notification service for admin changes
"""

from fastapi_mail import FastMail, MessageSchema, ConnectionConfig
from typing import List
import os
from datetime import datetime

# Email configuration
conf = ConnectionConfig(
    MAIL_USERNAME=os.getenv("SMTP_USERNAME", "mtendereeduconsult@gmail.com"),
    MAIL_PASSWORD=os.getenv("SMTP_PASSWORD", ""),
    MAIL_FROM=os.getenv("SMTP_USERNAME", "mtendereeduconsult@gmail.com"),
    MAIL_PORT=587,
    MAIL_SERVER="smtp.gmail.com",
    MAIL_FROM_NAME="Mtendere Education Admin System",
    MAIL_STARTTLS=True,
    MAIL_SSL_TLS=False,
    USE_CREDENTIALS=True,
    VALIDATE_CERTS=True
)

# Initialize FastMail
fastmail = FastMail(conf)

# Default notification recipients
NOTIFICATION_RECIPIENTS = [
    os.getenv("ADMIN_EMAIL", "mtendereeduconsult@gmail.com")
]


async def send_notification_email(subject: str, content: str, recipients: List[str] = None):
    """Send notification email to admin"""
    if recipients is None:
        recipients = NOTIFICATION_RECIPIENTS
    
    # Skip sending if no SMTP password is configured
    if not os.getenv("SMTP_PASSWORD"):
        print(f"Email notification skipped (no SMTP configured): {subject}")
        return
    
    try:
        # Format content for HTML
        html_content = content.replace(chr(10), '<br>')
        
        # Create email message
        message = MessageSchema(
            subject=f"[Mtendere Admin] {subject}",
            recipients=recipients,
            body=f"""
            <html>
                <body>
                    <h2>Mtendere Education Consult - Admin Notification</h2>
                    <p><strong>Time:</strong> {datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')} UTC</p>
                    <hr>
                    <div style="margin: 20px 0;">
                        {html_content}
                    </div>
                    <hr>
                    <p style="color: #666; font-size: 12px;">
                        This is an automated notification from the Mtendere Education Admin System.
                    </p>
                </body>
            </html>
            """,
            subtype="html"
        )
        
        # Send email
        await fastmail.send_message(message)
        print(f"Notification email sent: {subject}")
        
    except Exception as e:
        print(f"Failed to send notification email: {e}")


async def send_application_status_email(application_email: str, applicant_name: str, status: str, admin_notes: str = ""):
    """Send application status update email to applicant"""
    if not os.getenv("SMTP_PASSWORD"):
        print(f"Application status email skipped (no SMTP configured) for {application_email}")
        return
    
    try:
        status_messages = {
            "approved": {
                "subject": "Application Approved - Mtendere Education Consult",
                "message": "Congratulations! Your application has been approved.",
                "color": "#28a745"
            },
            "rejected": {
                "subject": "Application Update - Mtendere Education Consult",
                "message": "Thank you for your application. After careful review, we are unable to proceed at this time.",
                "color": "#dc3545"
            },
            "under_review": {
                "subject": "Application Under Review - Mtendere Education Consult",
                "message": "Your application is currently under review. We will contact you soon with updates.",
                "color": "#ffc107"
            }
        }
        
        status_info = status_messages.get(status, status_messages["under_review"])
        
        message = MessageSchema(
            subject=status_info["subject"],
            recipients=[application_email],
            body=f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: {status_info['color']};">Mtendere Education Consult</h2>
                        <h3>Application Status Update</h3>
                        
                        <p>Dear {applicant_name},</p>
                        
                        <p>{status_info['message']}</p>
                        
                        {'<div style="background-color: #f8f9fa; padding: 15px; border-left: 4px solid ' + status_info["color"] + '; margin: 20px 0;"><strong>Additional Notes:</strong><br>' + admin_notes + '</div>' if admin_notes else ''}
                        
                        <p>If you have any questions, please don't hesitate to contact us.</p>
                        
                        <hr style="margin: 30px 0;">
                        <p style="color: #666; font-size: 14px;">
                            Best regards,<br>
                            Mtendere Education Consult Team<br>
                            Email: mtendereeduconsult@gmail.com
                        </p>
                    </div>
                </body>
            </html>
            """,
            subtype="html"
        )
        
        await fastmail.send_message(message)
        print(f"Application status email sent to {application_email}: {status}")
        
    except Exception as e:
        print(f"Failed to send application status email: {e}")


async def send_contact_response_email(contact_email: str, contact_name: str, original_subject: str, response_message: str):
    """Send response email to contact inquiry"""
    if not os.getenv("SMTP_PASSWORD"):
        print(f"Contact response email skipped (no SMTP configured) for {contact_email}")
        return
    
    try:
        message = MessageSchema(
            subject=f"Re: {original_subject} - Mtendere Education Consult",
            recipients=[contact_email],
            body=f"""
            <html>
                <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                    <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                        <h2 style="color: #007bff;">Mtendere Education Consult</h2>
                        <h3>Thank you for contacting us</h3>
                        
                        <p>Dear {contact_name},</p>
                        
                        <p>Thank you for your inquiry. Here is our response:</p>
                        
                        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                            {response_message.replace(chr(10), '<br>')}
                        </div>
                        
                        <p>If you have any additional questions, please feel free to reach out to us again.</p>
                        
                        <hr style="margin: 30px 0;">
                        <p style="color: #666; font-size: 14px;">
                            Best regards,<br>
                            Mtendere Education Consult Team<br>
                            Email: mtendereeduconsult@gmail.com
                        </p>
                    </div>
                </body>
            </html>
            """,
            subtype="html"
        )
        
        await fastmail.send_message(message)
        print(f"Contact response email sent to {contact_email}")
        
    except Exception as e:
        print(f"Failed to send contact response email: {e}")
