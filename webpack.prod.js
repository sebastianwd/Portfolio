const path = require("path");

const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin"); //installed via npm
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const buildPath = path.resolve(__dirname, "dist");

module.exports = {
    //devtool: "source-map",
    entry: {
        index: "./src/index.js"
    },
    output: {
        filename: "[name].[hash:20].js",
        path: buildPath
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
                test: /\.(scss|css|sass)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        // translates CSS into CommonJS
                        loader: "css-loader",
                        options: {
                            sourceMap: false
                        }
                    },
                    {
                        // Runs compiled CSS through postcss for vendor prefixing
                        loader: "postcss-loader",
                        options: {
                            sourceMap: false
                        }
                    },
                    {
                        // compiles Sass to CSS
                        loader: "sass-loader",
                        options: {
                            outputStyle: "expanded",
                            sourceMap: false,
                            sourceMapContents: false
                        }
                    }
                ]
            },
            {
                // Load all images as base64 encoding if they are smaller than 8192 bytes
                test: /\.(ttf|eot|woff|woff2)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "fonts/[name].[ext]",
                            limit: 6192
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[name].[hash:20].[ext]"
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
        new HtmlWebpackPlugin({
            filename: "about.html",
            template: "./about.html",
            inject: "body",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./index.html",
            inject: "body",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            filename: "skills.html",
            template: "./skills.html",
            inject: "body",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            filename: "projects.html",
            template: "./projects.html",
            inject: "body",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            filename: "contact.html",
            template: "./contact.html",
            inject: "body",
            chunks: ["index"]
        }),
        new HtmlWebpackPlugin({
            filename: "google1682f38a8d13574e.html",
            template: "./google1682f38a8d13574e.html"
        }),
        new CleanWebpackPlugin(buildPath),
        new FaviconsWebpackPlugin({
            // Your source logo
            logo: "./src/assets/icon.png",
            // The prefix for all image files (might be a folder or a name)
            prefix: "icons-[hash]/",
            // Generate a cache file with control hashes and
            // don't rebuild the favicons until those hashes change
            persistentCache: true,
            // Inject the html into the html-webpack-plugin
            inject: true,
            // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
            background: "#fff",
            // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
            title: "Personal-portfolio}}",

            // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
            icons: {
                android: true,
                appleIcon: true,
                appleStartup: true,
                coast: false,
                favicons: true,
                firefox: true,
                opengraph: false,
                twitter: false,
                yandex: false,
                windows: false
            }
        }),
        new MiniCssExtractPlugin({
            filename: "styles.[contenthash].css"
        }),
        new OptimizeCssAssetsPlugin({
            cssProcessor: require("cssnano"),
            cssProcessorOptions: {
                map: {
                    inline: false
                },
                discardComments: {
                    removeAll: true
                }
            },
            canPrint: true
        })
    ]
};
