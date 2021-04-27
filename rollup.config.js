import { uglify } from "rollup-plugin-uglify";
const path=require('path');
const externalId = path.resolve( __dirname, './coder.js' );
export default [{
    input: 'coder.js',
    output: {
        file: 'dist/coder.bundle.min.js',
        format: 'iife',
        name: 'Coder',
    },
    plugins: [
        uglify()
    ]
},{
    input: 'hash.js',
    external: [
        externalId
    ],
    output: {
        file: 'dist/hash.bundle.min.js',
        format: 'iife',
        name: 'Hash',
        globals: {
            [externalId]: 'Coder'
        },
    },
    plugins: [
        uglify()
    ]
}];