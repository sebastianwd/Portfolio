const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var webpack = require("webpack");

module.exports = {
    devtool: "eval-cheap-module-source-map",
    entry: {
        index: "./src/index.js"
    },
    devServer: {
        port: 5500,
        contentBase: path.join(__dirname, "dist")
    },
    node: {
        fs: "empty"
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: ["env"]
                }
            },

            {
                test: /\.(scss|css)$/,
                use: [
                    // cambiado a igual que el de prod por bug - había delay en la carga del css
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader",
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            outputStyle: "expanded",
                            sourceMap: true,
                            sourceMapContents: true
                        }
                    }
                    // Please note we are not running postcss here
                ]
            },

            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            // On development we want to see where the file is coming from, hence we preserve the [path]
                            name: "[path][name].[ext]?hash=[hash:20]",
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|eot|woff|woff2)$/,
                loader: "file-loader",
                options: {
                    name: "fonts/[name].[ext]"
                }
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: "html-loader",
                    options: {
                        interpolate: true
                    }
                }
            }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html",
            inject: true,
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            filename: "about.html",
            template: "./about.html",
            inject: true,
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            filename: "skills.html",
            template: "./skills.html",
            inject: true,
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            filename: "projects.html",
            template: "./projects.html",
            inject: true,
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            filename: "contact.html",
            template: "./contact.html",
            inject: true,
            chunks: ["index"]
        }),
        new MiniCssExtractPlugin({
            filename: "styles.[contenthash].css"
        })
    ]
};
