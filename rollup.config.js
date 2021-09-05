import babel from '@rollup/plugin-babel';
import glslify from 'rollup-plugin-glslify';
import postcss from 'rollup-plugin-postcss';
import typescript from '@rollup/plugin-typescript';
import nodeResolve from 'rollup-plugin-node-resolve';

const extensions = ['.ts', '.js'];

export default [

  {
    input: 'src/index.ts',

    preserveModules: true,

    output: {
      dir: 'build/commonjs',
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
    },

    plugins: [
      nodeResolve({browser: true}),
      glslify(),
      postcss({
        extract: true,
      }),
      babel({
        extensions,
      }),
      typescript({
        declaration: true,
        rootDir: 'src',
        declarationDir: 'build/commonjs/types',
      }),
    ],
  },

  {
    input: 'src/index.ts',
    preserveModules: true,
    output: {
      dir: 'build/es6',
      format: 'es',
      exports: 'named',
      sourcemap: true,
    },

    plugins: [
      nodeResolve({browser: true}),
      postcss({
        extract: true,
      }),
      babel({
        extensions,
      }),
      typescript({
        declaration: true,
        rootDir: 'src',
        declarationDir: 'build/es6/types',
      }),
      glslify(),
    ],
  },

  {
    input: 'src/index.ts',
    output: {
      file: 'build/umd/graphim.js',
      // dir: 'build/umd',
      format: 'umd',
      name: 'Graphim',
      sourcemap: true,
    },
    plugins: [
      nodeResolve({browser: true}),
      postcss({
        extract: true,
      }),
      babel({
        extensions,
      }),
      typescript({
        declaration: true,
        rootDir: 'src',
        declarationDir: 'build/umd',
      }),
      glslify(),
    ],
  },
];
