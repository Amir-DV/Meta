const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output bundle file name
    publicPath: "/", // Public URL of the output directory when referenced in a browser
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/, // Apply babel-loader to files ending in .js or .jsx
        exclude: /node_modules/, // Exclude node_modules directory
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"], // Babel presets
          },
        },
      },
      {
        test: /\.css$/, // Apply css-loader and style-loader to CSS files
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/, // Apply file-loader to image files
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[hash].[ext]", // File naming pattern
              outputPath: "assets/images", // Output path for images
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"], // Resolve these file types
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./Public/index.html", // HTML template file
    }),
  ],
  devServer: {
    static: path.join(__dirname, "dist"), // Serve files from the output directory
    compress: true, // Enable gzip compression
    port: 3000, // Development server port
    historyApiFallback: true, // Enable history API fallback for SPAs
  },
  mode: "development", // Set the mode to development
};
