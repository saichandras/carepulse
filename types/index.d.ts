// src/types/index.d.ts

import { JWTPayload } from 'jose';
import { NextApiRequest } from 'next';

declare module 'next' {
  interface NextApiRequest {
    user?: JWTPayload | string;
  }
}
