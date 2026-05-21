import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    include: ['chat/static/chat/js/**/*.test.js'],
  },
});
