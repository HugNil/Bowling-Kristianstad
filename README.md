# Bowling Kristianstad Website

A modern bowling alley website built with Next.js, TypeScript, Tailwind CSS, Firebase Firestore, and Cloudinary.

## Features

- 🎳 Modern, responsive design with Tailwind CSS
- 🔥 Firebase Firestore integration for dynamic pricing and opening hours
- 🖼️ Cloudinary support for image management (with fallback to local images)
- 📱 Mobile-friendly navigation
- ⚡ Built with Next.js 15 and TypeScript for optimal performance

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Firebase Firestore
- **Images:** Cloudinary (optional) / Local images
- **Deployment:** Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Firebase project (optional, will use fallback data if not configured)
- A Cloudinary account (optional, will use placeholder images if not configured)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/HugNil/Bowling-Kristianstad.git
cd Bowling-Kristianstad
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your Firebase and Cloudinary credentials:
```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Cloudinary Configuration (optional)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Firebase Setup (Optional)

If you want to use Firebase Firestore for dynamic pricing and opening hours:

1. Create a Firebase project at [https://console.firebase.google.com](https://console.firebase.google.com)

2. Enable Firestore Database in your Firebase project

3. Create two collections in Firestore:

### Prices Collection
Create a `prices` collection with documents like:
```json
{
  "name": "Vardagsbowling",
  "description": "Måndag - Fredag före 17:00",
  "price": 150,
  "duration": "per timme"
}
```

### Opening Hours Collection
Create an `openingHours` collection with documents like:
```json
{
  "day": "Måndag",
  "hours": "12:00 - 22:00",
  "isOpen": true
}
```

4. Add your Firebase configuration to `.env.local`

**Note:** If Firebase is not configured, the site will automatically use fallback data.

## Cloudinary Setup (Optional)

If you want to use Cloudinary for image management:

1. Create a Cloudinary account at [https://cloudinary.com](https://cloudinary.com)
2. Find your Cloud Name in the Cloudinary dashboard
3. Add it to `.env.local` as `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
4. Upload images to your Cloudinary media library

**Note:** If Cloudinary is not configured, the site will use placeholder images.

## Project Structure

```
├── app/
│   ├── about/          # About page with opening hours
│   ├── pricing/        # Pricing page with Firestore integration
│   ├── layout.tsx      # Root layout with header and footer
│   ├── page.tsx        # Homepage
│   └── globals.css     # Global styles
├── components/
│   ├── Header.tsx      # Navigation header
│   └── Footer.tsx      # Footer component
├── lib/
│   ├── firebase.ts     # Firebase configuration
│   └── types.ts        # TypeScript interfaces
├── public/             # Static assets
└── .env.example        # Environment variables template
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

## Customization

### Update Contact Information

Edit the contact details in:
- `components/Footer.tsx`
- `app/about/page.tsx`

### Update Branding

- Change the site name in `components/Header.tsx`
- Update metadata in `app/layout.tsx`

### Add Images

- For local images: Add to `public/` folder
- For Cloudinary: Upload to your Cloudinary account and reference by public ID

## Benefits of Firestore for Prices and Hours

✅ **Easy Updates:** Change prices and hours without redeploying the website
✅ **Free Tier:** Firebase free tier is generous for small data like prices and hours
✅ **Real-time:** Changes appear immediately on the website
✅ **No Backend Required:** No need to build a custom API

## Support

For questions or issues, please contact the development team.

