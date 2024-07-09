const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Import cors
require('dotenv').config();

const prisma = new PrismaClient();
const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

app.post('/api/referrals', async (req, res) => {
    const { referrerName, refereeName, refereeEmail } = req.body;

    if (!referrerName || !refereeName || !refereeEmail) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const newReferral = await prisma.referral.create({
            data: {
                referrerName,
                referrerEmail: process.env.EMAIL_USER,
                refereeName,
                refereeEmail,
            },
        });

        // Configure Nodemailer
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: refereeEmail,
            subject: 'Join our Course - Accredian',
            text: `Hi ${refereeName},\n\n${referrerName} has referred you. Please join our course.\n\nBest,\nTeam`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending email:', error);
                return res.status(500).json({ error: 'Failed to send referral email' });
            }
            console.log('Email sent:', info.response);
            res.json(newReferral);
        });

    } catch (error) {
        console.error('Error creating referral:', error);
        res.status(500).json({ error: 'Failed to create referral' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
