import WebpackDevServer from "webpack-dev-server";
import webpack from "webpack";
import config from "./webpack.config";

const host = process.env.HOST || "localhost";
const port = (process.env.PORT + 1) || 3001;

const options = {
  contentBase: `http://${host}:${port}`,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  }
};
const compiler = webpack(config);
compiler.run(() => {

});
const webpackServer = () => {
  const webpackDevServer = new WebpackDevServer(compiler, options);
  return webpackDevServer.listen(port, host, function() {
    console.log("Webpack development server listening on %s:%s", host, port);
  });
};
export default webpackServer;
export {
  webpackServer
};