# 🪔 Shubh Deepavali 2026 – A Little Celebration of Love

An interactive, multilingual (English / Hindi / Bengali) Diwali experience. Visitors decorate a home with diyas and rangoli, open a mithai box, explore regional Diwali traditions across India, play mela games, send personalized greeting cards, and leave a wish on a community wall.

## ✨ Features

- **Guided scenes:** Welcome, Decorate, Mithai, Letter, Family Gifts, Fireworks
- **Regional traditions:** interactive activities from many Indian states (Alpona, Mandana, Deepotsav, Kali Pujo, and more)
- **Eco Diwali Mela:** quiz, memory game, rangoli challenge, treasure hunt, firework pattern challenge
- **AI greeting composer:** personalized cards in 5 tones using Google Gemini, with a built-in cultural fallback if the API is unavailable
- **Wish Across India:** a community wish wall backed by Firestore, with report-based moderation
- **Share and keepsake:** WhatsApp sharing and a downloadable keepsake collage
- **Audio:** conch, dhak and firecracker sounds with settings and credits

## ⏩ Quick Path: Skip the Traditions

The traditions are optional. Visitors do **not** have to go through the regional traditions or mela activities. They can go straight to the wish section and send a wish or greeting right away:

- **Wish Across India:** write and share a wish on the community wall.
- **Digital Greeting Creator:** compose a personalized greeting card and share it on WhatsApp.

Explore the traditions only if you want to. They never block access to the wishes.

## 🧱 Tech Stack

Frontend: React 19 · TypeScript · Vite · Tailwind CSS 4 · Motion · Lucide React

Backend and Services:
- Node.js · Express.js · REST APIs (local development server)
- Firebase Authentication (Anonymous Authentication)
- Cloud Firestore (real-time community wish synchronization)
- AWS Lambda (serverless greeting API handler)
AI Integration: Google Gemini API · Server-side API handling · Built-in cultural fallback engine

Deployment and Development: Google AI Studio project · AWS Amplify static build configuration

## 📁 Project Structure

```
├── src/                 # React app (components, config, data, utils)
├── public/              # Images and audio assets
├── serverless/          # AWS Lambda function for Gemini greetings
├── server.ts            # LOCAL DEV ONLY Express server (not used in production)
├── firestore.rules      # Firestore security rules
└── .env.example         # Environment variable template
```


## 🎵 Credits

Audio files are from Freesound and other contributors (see the in-app **Audio Credits** modal). Please check each licence before commercial reuse.

## 📜 License

Source code: Apache-2.0 (see file headers). Third-party audio and images remain under their original licences.

---

*Shubh Deepavali! May every home glow with light, love and laughter.* 🪔
