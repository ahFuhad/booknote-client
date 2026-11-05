# BookNote — Online Library Platform

BookNote is a modern online library platform where users can explore books, manage their personal book collections, borrow books, and track their borrowed books. It provides a clean, responsive interface with secure authentication and a simple book-management experience.

## Live Demo

**Website:** [https://booknook-client.vercel.app/](https://booknote-client.vercel.app/)

**Backend API:**[ https://booknote-server-9nphgx8sp-ah-fuhad.vercel.app](https://booknote-client.vercel.app/)

## Repositories

- **Frontend:** [https://github.com/ahFuhad/booknote-client](https://github.com/ahFuhad/booknote-client)
- **Backend:** [https://github.com/ahFuhad/booknote-server](https://github.com/ahFuhad/booknote-server)

## Features

- **Modern Homepage:** A welcoming homepage with a hero slider, featured content, and newly added books.
- **Browse Books:** Explore the book collection in a responsive grid.
- **Search and Filter:** Find books using search and category filters.
- **Book Details:** View individual book information.
- **User Authentication:** Register and log in using email and password.
- **Google Authentication:** Sign in using a Google account.
- **Add Books:** Authenticated users can add books to the library.
- **My Books:** Manage books added by the logged-in user.
- **Borrow Books:** Borrow available books and track borrowing information.
- **My Borrows:** View borrowed books and return them.
- **Image Upload:** Upload book cover images using ImgBB.
- **Responsive Design:** Designed to work across desktop, tablet, and mobile screen sizes.
- **Notifications:** User-friendly toast messages for important actions.

## Technology Stack

### Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Better Auth
- Swiper
- ImgBB

### Backend Integration

- REST API
- JWT authentication
- MongoDB

## Authentication

BookNote uses Better Auth for user authentication.

Supported authentication methods:

- Email and password
- Google sign-in

The frontend also integrates with the backend's JWT-protected API.

For Google sign-in, configure the OAuth client in Google Cloud Console and add the appropriate local and production callback URLs.

## Deployment

The frontend is deployed using Vercel.

**Production URL:** [https://booknook-client.vercel.app/](https://booknote-client.vercel.app/)

Configure the required production environment variables in your Vercel project settings before deploying.

## Author

Developed as part of the Programming Hero B14 Assignment 8.

**Project:** BookNook — Online Library Platform
