## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

To run this project on your own you'd need these variable inside of your .env file.
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
NEXT_AUTH_URL=http://localhost:3000
AUTH_SECRET=
OPENAI_API_KEY=
FIREBASE_SERVICE_ACCOUNT_KEY

## Purpose
This app was sued to test my currect React knowledge and practice or learn some new skills along the way. This Web app is supposed to replicate the functionality of openAi's ChaGPT website. The user can log in with a google account and instantly start chatting with the AI. The chat history is saved and multiple chats can be created and saved. The user can switch be the chats. The AI text is streamed through. 
As a developer this project helped me expand my Nextjs knowledge as well as taught me how to learn things on my own and figure out how to integrate the frontend with the backend. 

## Dependencies
 "@heroicons/react": "^2.1.3",
    "ai": "^3.0.24",
    "firebase": "^10.11.0",
    "firebase-admin": "^12.1.0",
    "framer-motion": "^11.1.7",
    "next": "14.2.2",
    "next-auth": "^5.0.0-beta.16",
    "openai": "^4.38.2",
    "react": "^18",
    "react-dom": "^18",
    "react-firebase-hooks": "^5.1.1",
    "react-hot-toast": "^2.4.1",
    "react-responsive": "^10.0.0",
    "react-select": "^5.8.0",
    "zustand": "^4.5.2"


