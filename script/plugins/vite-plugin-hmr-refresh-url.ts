import type { ViteDevServer } from 'vite';

export default function HmrRefreshUrl() {
  let _cacheServer: ViteDevServer;

  return {
    name: 'vite-plugin-hmr-refresh-url',

    configureServer(server: ViteDevServer) {
      _cacheServer = server;
    },

    handleHotUpdate() {
      _cacheServer.config.logger.info('vite Server refresh');
      _cacheServer.printUrls && _cacheServer.printUrls();
    },
  };
}
