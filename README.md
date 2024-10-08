# Pet Care Tips & Stories

## Overview

**Pet Care Tips & Stories** provides practical advice and engaging tales for pet owners, covering essential care aspects and heartwarming stories that highlight the bond between humans and their pets.

## Features

- **User Authentication**: Secure registration, login, and password recovery using JWT.
- **Profile Management**: Update profiles, view posts, followers, and following.
- **Content Creation**: Write and edit pet care tips and stories with a rich text editor.
- **Image Attachments**: Enhance posts with images.
- **Content Categorization**: Classify posts as "Tip" or "Story."
- **Monetization**: Option to create premium content for purchase.
- **Upvote & Downvote System**: Users can upvote or downvote posts.
- **Commenting System**: Comment on posts, edit or delete own comments.
- **Payment Integration**: Secure payments via Stripe for premium content.
- **News Feed**: Real-time feed with infinite scroll, advanced search, and filtering.
- **Following System**: Follow or unfollow other pet owners.
- **Micro Animations**: Smooth transitions and hover effects.

## Bonus Features

- **PDF Generation**: Generate nutrition charts based on a pet’s age and weight.
- **Debouncing Mechanism**: Optimized search functionality for better performance.

## Technologies Used

- **Frontend**: Next.js, React, Redux Toolkit, React Redux
- **Styling**: Tailwind CSS, DaisyUI, React Icons
- **Rich Text Editor**: React Quill, Quill
- **Utilities**: Lodash, Date-fns, JS Cookie
- **Payment Integration**: Stripe.js, React Stripe.js
- **Notifications**: Sonner, SweetAlert2
- **Carousel**: Swiper

## Installation

```bash
# Clone the Repository
git clone https://github.com/RobinTheRedLight/pet-tales-frontend.git

# Navigate to the Project Directory
cd pet-tales-frontend

# Install Dependencies
npm install

# Create Environment Variables
# Create a .env.local file in the root directory and add your environment variables
# Example:
# NEXT_PUBLIC_API_URL=your_backend_api_url
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

# Run the Development Server
npm run dev

# Open the App
# Visit http://localhost:3000 in your browser
```
