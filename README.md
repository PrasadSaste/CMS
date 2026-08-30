# CMS
 open project in vs code 
1 Backend
 npm install 
 npm init -y
 add your credtinals in .env filr
 then npm run seed
 nodemon app.js

 frontend
 2
 npm install 
 .env file with your backend api like http://localhost:5000/api
 npm run dev
 

 Test Login

The seed script creates a test admin user.

Email: admin@example.com
Password: Admin@123

The password is hashed before it is stored in MongoDB.

API Endpoints
Login
POST /api/auth/login
