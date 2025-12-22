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
- **Deployment:** Vercel ??

## Getting Started

### Prerequisites

- Node.js 18+ and npm

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

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

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

## Support

For questions or issues, please contact the development team.

