# Chat Server with WebSocket

A real-time chat server built with Node.js, Socket.io, and Redis. Supports public/private rooms, live messaging, typing indicators, and message persistence using Redis.

## Features

- Real-time messaging using WebSocket
- Public and private chat rooms
- Typing indicators
- Redis-based message storage

## Stack

- Node.js
- Express
- Socket.io
- Redis

## Setup Instructions

1. Clone the repository

```bash
git clone https://github.com/yourusername/chat-server-nodejs.git
cd chat-server-nodejs
```

2. Install dependencies

```bash
npm install
```

3. Configure environment variables

Create a `.env` file in the root directory:

```env
PORT=5000
REDIS_URL=redis://localhost:6379
```

4. Run the server

```bash
npm run dev
```

## Usage

- Connect to the WebSocket at `ws://localhost:5000`
- Join rooms using `joinRoom`
- Send messages using `sendMessage`
- Notify typing using `typing`
