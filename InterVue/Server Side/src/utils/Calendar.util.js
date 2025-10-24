import { google } from "googleapis";
import User from "../models/user.model.js";

const oAuth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET
);

async function setGoogleAuth(userId) {
  const user = await User.findById(userId);
  if (!user || !user.google) throw new Error("Google tokens not found");

  oAuth2Client.setCredentials({
    access_token: user.google.googleAccess_token,
    refresh_token: user.google.googleRefresh_token,
  });

  oAuth2Client.on("tokens", (tokens) => {
    if (tokens.access_token) {
      user.google.googleAccess_token = tokens.access_token;
      user.save();
    }
  });

  return oAuth2Client;
}

const addEvent = async (userId, interview) => {
    const auth = await setGoogleAuth(userId);
    const calendar = google.calendar({ version: "v3", auth });

    const event = {
        summary: eventData.title,
        description: eventData.description,
        location: eventData.location,
        start: { dateTime: eventData.startDateTime, timeZone: "Asia/Kolkata" },
        end: { dateTime: eventData.endDateTime, timeZone: "Asia/Kolkata" },
    };

    const res = await calendar.events.insert({
        calendarId: "primary",
        requestBody: event,
    });
    return res.data;
}

export {addEvent};