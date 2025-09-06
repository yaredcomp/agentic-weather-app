# City Weather Explorer

A modern Single Page Application (SPA) built with Next.js that allows users to explore weather conditions and interesting facts about cities around the world.

## Features

- 🌤️ Real-time weather information for any city
- 🏙️ City overview and interesting facts
- 🌓 Dark/Light theme support
- 📱 Responsive design
- ⚡ Fast and efficient data fetching
- 🎨 Beautiful UI with smooth animations
- New Commit

## Tech Stack

- [Next.js 14](https://nextjs.org/) - React framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Next Themes](https://github.com/pacocoursey/next-themes) - Theme management
- [Lucide React](https://lucide.dev/) - Icons
- [Ollama](https://ollama.ai/) - Local LLM integration

## Prerequisites

- Node.js 18.17 or later
- Ollama running locally (for LLM functionality)
- npm or yarn package manager

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd city-weather-explorer
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Project Structure

```plaintext
src/
├── app/
│   ├── api/
│   │   └── weather/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   └── providers.tsx
├── components/
└── types/
```

## API Endpoints

### Weather Information

- **Endpoint**: `/api/weather`
- **Method**: POST
- **Body**: `{ "location": "city-name" }`
- **Response**: Weather data, city overview, and fun facts

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Weather data provided by Open-Meteo API
- City information from Wikipedia
- Fun facts generated using Ollama LLM
