# Waitlist Application

## Problem Statement

The Waitlist Application is designed to help potential customers sign up for a waiting list for a new iPhone product. The application allows customers to join the waiting list with their email address, view their position on the list, and receive a unique referral code to share with friends. Customers can improve their position on the list by referring friends, and the first customer to reach position 1 receives an email with a coupon code to purchase the new product.

### Functionality Required in the Application

- **Customer Sign-Up:**
  - Customers can sign up for the waiting list using their email address.
  - Upon signing up, customers will see their position on the waiting list.
  - The initial position starts at 99 and increments with each new sign-up.

- **Referral System:**
  - Each customer receives a unique referral code upon signing up.
  - Referring friends using this link improves the customer's position on the list by 1 for each referral.

- **Coupon Distribution:**
  - The first customer to reach position 1 receives an email with a coupon code to purchase the new product.

### Administrator Area

1. **Manage Waitlist:**
   - Create (Verify), edit, list, and delete the waitlist.

2. **Customer Management:**
   - View customers who have signed up for the waiting list.

### Frontend Requirements

1. **Sign-Up Form:**
   - A form for potential customers to enter their email address and join the waiting list.

2. **Position Display:**
   - Display the customer's position on the waiting list immediately after signing up.

3. **Referral Link:**
   - Provide customers with a unique referral link upon sign-up.

4. **Email Notification:**
   - Send an email with a coupon code to the customer who reaches position 1.

This application aims to streamline the process of managing a waitlist for a new product, incentivize referrals, and ensure that top customers are rewarded efficiently.

## Tech Stack and Libraries

### Frontend

The frontend of the waitlist application is built using the following technologies and libraries:

#### Tech Stack:
- **React**: A JavaScript library for building user interfaces.
- **React Router DOM**: A library for routing in React applications.
- **Axios**: A promise-based HTTP client for making API requests.
- **Material-UI (MUI)**: A popular React UI framework for building responsive and accessible designs.
- **Emotion**: A library for writing CSS styles with JavaScript.
- **Font Awesome**: A library for adding scalable vector icons to your application.
- **React Toastify**: A library for adding notifications to your React application.
- **Testing Library**: A family of libraries for testing JavaScript applications.

### Backend

The backend of the waitlist application is built using the following technologies and libraries:

#### Tech Stack:
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express**: A minimal and flexible Node.js web application framework.
- **Mongoose**: An elegant MongoDB object modeling tool for Node.js.
- **Bcrypt**: A library to help you hash passwords.
- **JWT (jsonwebtoken)**: A library to create and verify JSON Web Tokens.
- **Nodemailer**: A module for Node.js applications to allow easy email sending.
- **dotenv**: A zero-dependency module that loads environment variables from a `.env` file.
- **Node-cron**: A task scheduler in pure JavaScript for node.js.
- **Cookie-parser**: A middleware which parses cookies attached to the client request object.

## Features

- **User Registration:** Users can sign up and join the waitlist.
- **User Verification:** Only verified users are allowed to join the waitlist. Admins can verify users and manage the waitlist.
- **Email Notifications:** Automated emails are sent to users for verification and status updates.
- **Cookie Handling:** User sessions are managed using cookies, and authentication is done using JSON Web Tokens (JWT).
- **Admin Interface:** Admins can view and edit the waitlist, dividing it into verified and unverified users.
- **Stylish UI:** The application is styled using a given CSS theme.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/MOHAMEDRIZWANM/Waitlist-Application.git
   cd Waitlist-Application
   ```

2. **Install server dependencies:**
   ```bash
   cd backend
   npm install
   ```

3. **Install client dependencies:**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables:**
   Create a `.env` file in the `backend` directory and add the following variables:
   ```env
    db_url = your mongodb connection string
    system_mail = your gmail id
    system_pass = your gmail app password
    jwt_secret = your jwt secret
    jwt_expiry = 1d
    jwt_cookie_expiry = 1
   ```

5. **Run the application:**

   - Start the backend server:
     ```bash
     cd ../backend
     nodemon server.js
     ```

   - Start the frontend development server:
     ```bash
     cd ../frontend
     npm start
     ```
## Seeding Admin:

- To seed the admin credentials, run the following command in the backend server directory:
```bash
cd backend
node seedadmin.js
```
- Add the admin credentials in the `seedadmin.js`
```node
const email = your admin username
const password = your admin password
```
This command will populate the necessary admin credentials (your admin username and your admin password) for accessing the admin dashboard.

## Usage

- **User Registration:**
  - Visit the homepage and sign up to join the waitlist.
  - You will receive an email with an OTP for verification to join the waitlist.
  - Refer more users to get to position 1 and receive the coupon.

- **Admin Interface:**
  - Visit the admin dashboard using the admin credentials:
    - Username: your admin username
    - Password: your admin password
    - URL: [http://localhost:3000/admin](http://localhost:3000/admin)
  - Manage users, verify them, and update their status.
  - The waitlist table is divided into verified and unverified users, with specific columns and action buttons for each category.

## Sample Images

### User Interface

![Sign Up](https://github.com/MOHAMEDRIZWANM/Waitlist-Application/blob/main/readme_assets/sign%20up.png)

![Login](https://github.com/MOHAMEDRIZWANM/Waitlist-Application/blob/main/readme_assets/login.png)

![Loading](https://github.com/MOHAMEDRIZWANM/Waitlist-Application/blob/main/readme_assets/loading.png)

![OTP](https://github.com/MOHAMEDRIZWANM/Waitlist-Application/blob/main/readme_assets/OTP.png)

![Waiting List](https://github.com/MOHAMEDRIZWANM/Waitlist-Application/blob/main/readme_assets/Waiting%20list.png)

![Winner Page](https://github.com/MOHAMEDRIZWANM/Waitlist-Application/blob/main/readme_assets/Winner%20page.png)

### Admin Interface

![Admin Login](https://github.com/MOHAMEDRIZWANM/Waitlist-Application/blob/main/readme_assets/Admin%20login.png)

![Admin Access](https://github.com/MOHAMEDRIZWANM/Waitlist-Application/blob/main/readme_assets/Admin%20access.png)

## License

This project is licensed under the MIT License.

## Acknowledgements

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [React.js](https://reactjs.org/)
- [MongoDB](https://www.mongodb.com/)
- [NodeMailer](https://nodemailer.com/)
- [Cookie-Parser](https://www.npmjs.com/package/cookie-parser)
