import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    build: {
        lib: {
            entry: path.resolve(__dirname, 'src/rc-year-calendar.jsx'),
            name: 'Calendar',
            fileName: (format) => `rc-year-calendar.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'prop-types'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
          'prop-types': 'PropTypes'
                }
            }
        }
    }
});
