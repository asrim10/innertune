import { Music } from "lucide-react";
import { Repeat1Icon } from "lucide-react";
import { Headphones } from "lucide-react";
import { SpeakerIcon } from "lucide-react";

import user1 from "../assets/profile-pictures/user1.jpg";
import user2 from "../assets/profile-pictures/user2.jpg";
import user4 from "../assets/profile-pictures/user4.jpg";

export const navItems = [
  { label: "Hero", href: "#hero-section" },
  { label: "Features", href: "#landing-features" },
  { label: "Workflow", href: "#landing-workflow" },
  { label: "Testimonials", href: "#landing-testo" },
  { label: "Footer", href: "#landing-footer" },
];

export const testimonials = [
  {
    user: "John Doe",
    company: "A Partime job worker",
    image: user1,
    text: "The platform's design and features have been praised for their ease of use. A reviewer mentioned, It's fast, cheap, and easy to use. I never had any trouble with the app, and the sound quality is good.",
  },
  {
    user: "Jane Smith",
    company: "CEO",
    image: user2,
    text: "Spotify's social aspects, such as collaborative playlists and sharing options, have been highlighted positively. A user shared, I love creating playlists and the small social aspects of it.",
  },
  {
    user: "Ronee Brown",
    company: "Innertune user",
    image: user4,
    text: "Spotify's model is effective in providing familiar music that users enjoy, but it lacks the excitement of authentic discovery.",
  },
];

export const features = [
  {
    icon: <Headphones />,
    text: "Listen-to-your-own-music",
    description: "You can easily listen What you want",
  },
  {
    icon: <SpeakerIcon />,
    text: "High-Quality Audio Streaming",
    description:
      "Different streaming quality options (Low, Normal, High, and Very High for Premium users)",
  },
  {
    icon: <Repeat1Icon />,
    text: " Personalized Playlists & Recommendations",
    description:
      "A curated playlist based on your listening habits. You can also create your own playlists.",
  },
  {
    icon: <Music />,
    text: "Music Streaming",
    description: "Access to millions of songs from various artists and genres.",
  },
];

export const checklistItems = [
  {
    title: "Easy access to your favourites",
    description:
      "Hey, music lovers! Looking for the perfect snack to enjoy with your tunes?",
  },
  {
    title: "Listen according to your mood",
    description: "Sad, Happy or Angry. Listen music of your choice",
  },
];

export const pricingOptions = [
  {
    title: "Free",
    price: "$0",
    features: [
      "Private board sharing",
      "5 Gb Storage",
      "Web Analytics",
      "Private Mode",
    ],
  },
  {
    title: "Pro",
    price: "$10",
    features: [
      "Private board sharing",
      "10 Gb Storage",
      "Web Analytics (Advance)",
      "Private Mode",
    ],
  },
  {
    title: "Enterprise",
    price: "$200",
    features: [
      "Private board sharing",
      "Unlimited Storage",
      "High Performance Network",
      "Private Mode",
    ],
  },
];

export const resourcesLinks = [
  { href: "#", text: "Getting Started" },
  { href: "#", text: "Artists" },
  { href: "#", text: "Tutorials" },
  { href: "#", text: "API Reference" },
];

export const platformLinks = [
  { href: "#", text: "Features" },
  { href: "#", text: "Supported Devices" },
  { href: "#", text: "System Requirements" },
  { href: "#", text: "Downloads" },
  { href: "#", text: "Release Notes" },
];

export const communityLinks = [
  { href: "#", text: "Events" },
  { href: "#", text: "Concerts" },
  { href: "#", text: "Karaoke" },
  { href: "#", text: "GGs" },
];
