import dotenv from 'dotenv';
dotenv.config({ path: './config/.env' });
import mongoStore from 'connect-mongo';

const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

export const sessionConfig = {
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URL,
        mongoOptions: advancedOptions,
        collectionName: 'sessions',
        ttl: 600,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
};

export const mongoURL = process.env.MONGO_URL;
export const port = process.env.PORT;

export const accountSID = process.env.ACCOUNT_SID;
export const authToken = process.env.AUTH_TOKEN;
export const service = process.env.SERVICE;
export const gmailPort = process.env.GMAIL_PORT;
export const user = process.env.USER;
export const pass = process.env.PASS;
export const adminEmail = process.env.ADMIN_EMAIL;
export const twilioNumber = process.env.TWILIO_NUMBER;
export const adminNumber = process.env.ADMIN_NUMBER;
export const twilioNumberSms = process.env.TWILIO_NUMBER_SMS;
