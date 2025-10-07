import axios from 'axios';

console.log(process.env.NEXT_SERVER_URL);

export const nextServer = axios.create({
  baseURL: process.env.NEXT_SERVER_URL,
});
