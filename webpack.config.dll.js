const path    = require('path');
const webpack = require('webpack');
let CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';
const commont = [
    'jquery',
    'react',
    'react-dom',
    'react-router',
    'redux',
    'react-redux',
    'react-bootstrap',
    'classnames',
    'rc-checkbox',
    'rc-tree'
]
module.exports = {
    entry: {
        vendor: commont
    },
    output: {
        path: path.join(__dirname, 'dll'),
        filename: '[name].dll.js',
        library: '[name]'
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            comments: false,
            output: {
                comments: false,  // remove all comments
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(nodeEnv) //'"production"',
            },
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new CleanWebpackPlugin(['dll'],{
            root: __dirname,
            verbose: true,
            dry: false
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dll', 'manifest.json'),
            name: '[name]',
            context: __dirname,
        })
    ]
};
