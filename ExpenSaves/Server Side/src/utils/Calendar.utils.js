import { google } from "googleapis";
import User from "../models/user.model.js";

const getGoogleClient = async(userId) => {
    const user = await User.findById(userId);
    if(!user ) throw new Error("User Not found");
    if(!user.google) throw new Error("User Google Not found");

    const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    "http://localhost:8000/auth/google/callback"
    );

    oAuth2Client.setCredentials({
    access_token: user.google.access_token,
    refresh_token: user.google.refresh_token,
    expiry_date: user.google.expiryDate ? new Date(user.google.expiryDate).getTime() : null
    });

    oAuth2Client.on("tokens", async (tokens) => {
    if (tokens.access_token) user.google.access_token = tokens.access_token;
    if (tokens.refresh_token) user.google.refresh_token = tokens.refresh_token;
    if (tokens.expiry_date) user.google.expiryDate = tokens.expiry_date;
    await user.save();
    });

    return oAuth2Client;
}

const addReminderToCalendar = async(userId, reminder) => {
    console.log(userId);
    const auth = await getGoogleClient(userId);
    const calendar = google.calendar({ version: "v3", auth });

const start = new Date(reminder.reminderDate).toISOString().split("T")[0];
const end = new Date(new Date(reminder.reminderDate).getTime() + 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];

  const event = {
      summary: `Pay ${reminder.amount} for ${reminder.title}`,
      description: "Payment Reminder from ExpenSaves App",
      start: { date: start },
      end: { date: end },
      reminders: {
        useDefault: false,
        overrides: [{ method: "popup", minutes: 5 }],
    },
  };

  const response = await calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });

  console.log("Event created:", response.data.htmlLink);
}



export {addReminderToCalendar};