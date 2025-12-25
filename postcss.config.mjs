import { createRequire } from 'module';

const require = createRequire(import.meta.url);

module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};

