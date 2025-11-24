# Game Vault

**A stunning full-stack gaming collection app built with Next.js 15, Firebase Auth, MongoDB Atlas & Tailwind CSS**

<div align="center">

<kbd><img src="https://i.imgur.com/34Ps92a.png" alt="Game Vault - Epic Homepage" style="border-radius:16px; box-shadow:0 20px 40px rgba(0,0,0,0.4); max-width:100%; height:auto;" /></kbd>

</div>

Live Demo: https://game-vault-client.vercel.app

## Features

- Google Login with Firebase Authentication
- Add, Edit & Delete your favorite games (only you can manage yours)
- Real-time latest games auto-sliding banner from MongoDB
- Beautiful responsive design (mobile to 4K)
- Floating particle animations + smooth Swiper slider
- Full CRUD operations with MongoDB Atlas
- Deployed on Vercel with zero downtime
- Stunning hero section with gradient text & animations

## Tech Stack

| Technology         | Purpose                     |
|--------------------|-----------------------------|
| Next.js 15 (App Router) | Full-stack React framework  |
| Firebase Auth      | Google Login                |
| MongoDB Atlas      | Cloud database              |
| Tailwind CSS + DaisyUI | Beautiful UI                |
| Framer Motion      | Smooth animations           |
| Swiper.js          | Auto-sliding game banners   |
| Vercel             | Production deployment       |

## Project Structure
```
src/
├── app/
│   ├── api/games/           # CRUD API routes
│   ├── games/               # All games + single game page
│   ├── my-games/            # User's personal collection
│   ├── add-game/            # Add new game form
│   ├── edit-game/[id]/      # Edit game form
│   └── page.jsx             # Epic homepage with slider
├── components/
│   └── Footer.jsx
├── lib/
│   ├── firebase.js          # Firebase config
│   └── mongodb.js           # MongoDB connection
└── public/
```


## Local Development

```bash
git clone https://github.com/TheLunatic1/game-vault.git
cd game-vault

npm install
npm run dev
```

Environment Variables (Required)
Create .env.local:
```
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxxx.mongodb.net/gamevault
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

Deployment
Deployed with one click on Vercel:
https://vercel.com/new/clone?repository-url=https://github.com/TheLunatic1/game-vault



