import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import dotenv from 'rollup-plugin-dotenv';

export default {
  input: 'src/main.js',
  output: {
    file: 'dist/Code.js'
  },
  plugins: [resolve(), commonjs(), dotenv()]
};
