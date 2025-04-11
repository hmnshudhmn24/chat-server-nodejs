import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const redisClient = createClient({ url: process.env.REDIS_URL });
redisClient.connect().catch(console.error);

app.get('/', (req, res) => {
  res.send('Chat server is running');
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('joinRoom', ({ room }) => {
    socket.join(room);
    socket.to(room).emit('message', { user: 'System', text: `User ${socket.id} joined room ${room}` });
  });

  socket.on('sendMessage', async ({ room, user, message }) => {
    const data = { user, message };
    await redisClient.rPush(room, JSON.stringify(data));
    io.to(room).emit('message', data);
  });

  socket.on('typing', ({ room, user }) => {
    socket.to(room).emit('typing', { user });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Server listening on port ${process.env.PORT}`);
});
