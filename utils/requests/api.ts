import axios from 'axios';
import { url } from '../constants/url';

export const api = axios.create({
  baseURL: url,
  headers: {
    'Content-Type': 'application/json',
  },
});