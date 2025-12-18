"use client";

import { CldImage, CldImageProps } from "next-cloudinary";

// Simple client wrapper so server components can render Cloudinary images safely
export default function CloudinaryImage(props: CldImageProps) {
  return <CldImage {...props} />;
}
