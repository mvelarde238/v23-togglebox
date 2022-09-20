const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env, argv) => {
    let entry_points = {
        ['v23-togglebox']: './src/v23-togglebox.js',
        demo: './src/index.js'
    };

    let config = {
        entry: (argv.mode === 'development') ? Object.values(entry_points) : entry_points,
        output: {
            filename: '[name].js',
            path: path.resolve(__dirname, 'dist')
        },
        devServer: {
            static: {
                directory: path.join(__dirname, './'),
            },
            liveReload: false,
            hot: true,
            open: true
        },
        plugins: [
            new HtmlWebpackPlugin({
                template : './src/index.html',
                scriptLoading: 'blocking'
            }),
            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ],
        module: {
            rules: [
              {
                test: /\.sass$/i,
                use: [
                    (argv.mode === 'development') ? 'style-loader' : MiniCssExtractPlugin.loader, 
                    "css-loader",
                    "sass-loader"
                ],
              },
            ],
        }
    }
    
    if (argv.mode === 'production') {
        // exclude license from build
        config.optimization = {
            minimize: true,
            minimizer: [new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            })],
        };
    }

    return config;    
};