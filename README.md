Backend - Accredian Referral Program

This project is the backend part of the Accredian Referral Program, developed using Node.js, Express, and Prisma ORM for MySQL database.

Set up the environment variables. Create a .env file in the root directory and add the following:

DATABASE_URL=mysql://username:password@localhost:3306/database
EMAIL_USER=your-email@example.com, 
EMAIL_PASS=your-email-password, 
PORT=5000

Environment Variables
DATABASE_URL: The connection string for the MySQL database, 
EMAIL_USER: The email address used for sending referral emails, 
EMAIL_PASS: The password for the email address, 
PORT: The port on which the server will run.

Dependencies
Express, 
Prisma, 
MySQL, 
Nodemailer, 
dotenv, 
