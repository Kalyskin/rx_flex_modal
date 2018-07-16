const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const autoprefixer = require('autoprefixer');

const bundleExtractPlugin = new ExtractTextPlugin({
    filename: 'bundle.css',
});
module.exports = {
    entry: ['./src/rx-modal.js', "./src/rx-modal.css"],
    //entry: './rx-modal.js' ,
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve('./dist')
    },

    plugins: [
        new UglifyJsPlugin({
            sourceMap: true
        }),
        bundleExtractPlugin,
        new OptimizeCssAssetsPlugin()
    ],
    module: {
        rules: [
            {
                test: /.css$/,
                exclude: [/node_modules/],
                use: bundleExtractPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {loader: 'css-loader', options: {minimize: true}},
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [require('autoprefixer')({
                                    'browsers': ['ie >= 8', 'last 4 version']
                                })],
                            }
                        },
                    ],
                }),
            },
        ]
    }
};