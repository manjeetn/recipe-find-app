const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmail(to, subject, html) {
  try {
    const { error } = await resend.emails.send({
      from: "FlavourFind <onboarding@resend.dev>",
      to,
      subject,
      html,
    });

    if (error) {
      console.error("Email sending failed:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("Resend internal error:", err);
    return false;
  }
}

module.exports = sendEmail;
