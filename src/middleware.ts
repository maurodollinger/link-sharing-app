import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({});

export const config = {
 matcher: [
  '/^((?!.+\\.[w]+$|.*\\.svg$|_next).*)$/',
  '/dashboard',
  '/(api|trpc)(.*)'
  ]
};
