const BabiliPlugin = require('babili-webpack-plugin');

module.exports = {
    entry: "./src/test.ts",
    output: {
        filename: "test.js",
        path: __dirname + "/dist"
    },

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js", '.jsx']
    },

    module: {
        loaders: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { test: /\.js$/, loader: "source-map-loader", enforce: "pre"}
        ]
    },

    
    plugins: [
        new BabiliPlugin(),
    ],

    externals: {
    },
};