
export type FormState = {
    image: string;
    name: string;
    description: string;
    location: string;
  }

import { Response } from 'express';

declare module 'express' {
  export interface Response {
    locals: {
      [key: string]: any;
    },
    cookie: (
      name: string,
      value: string,
      options?: {
        domain?: string;
        encode?: (val: string) => string;
        expires?: Date;
        httpOnly?: boolean;
        maxAge?: number;
        path?: string;
        secure?: boolean;
      }
    ) => Response;
  }
}

