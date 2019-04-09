const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
    entry: "./src/app.js",
    mode: "development",
    output: {
        path: path.join(__dirname, "public"),
        filename: "bundle.js", // this is the compiled final javascript file which we will include in the index.html
        publicPath: "/"
    },
    module: {
        rules: [
            {
                loader: "babel-loader",
                test: /\.(jsx|js)?$/,
                exclude: /node_modules/,
                query: {
                    presets: ["react"],
                    plugins: ["transform-class-properties"]
                }
            },
            {
                test: /(\.css|.scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: ["file-loader"]
            }
        ]
    },
    devtool: false,
    devServer: {
        contentBase: path.join(__dirname, "public"),
        historyApiFallback: true // this prevents the default browser full page refresh on form submission and link change
    },
    plugins: [new CopyWebpackPlugin([{ from: "src/assets", to: "img" }])]
};
