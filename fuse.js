const { FuseBox, CSSResourcePlugin, CSSPlugin, JSONPlugin, RawPlugin, VueComponentPlugin, WebIndexPlugin, EnvPlugin, QuantumPlugin } = require('fuse-box');
const { task, src } = require('fuse-box/sparky');

const server = (debug, NODE_ENV = 'development') => {
  const fuse = FuseBox.init({
    homeDir: 'src',
    target: 'server@esnext',
    output: 'dist/server/$name.js',
    useTypescriptCompiler: true,
    cache: false,
    sourceMaps: !!debug,
    plugins: [
      EnvPlugin({        
        NODE_ENV,        
        // NODE_TLS_REJECT_UNAUTHORIZED: NODE_ENV === 'development' ? "0" : "1"
      }),
      RawPlugin(['.gql']),
      
      NODE_ENV === 'production' && QuantumPlugin({
        replaceProcessEnv: false,
        bakeApiIntoBundle: true,
        uglify: true
      })
    ]
  });

  const bundle = fuse
    .bundle('server')
    .instructions('> [server/index.ts]');

  if (!debug && NODE_ENV === 'development') {
    bundle
      .watch()
      .completed(server => server.start());
  }

  return fuse.run();
};

task('s:s', () => {
  return server();
});
task('d:s', () => {
  return server(true);
});
task('b:s', () => {
  return server(false, 'production');
});

task('s:c', ['client-assets'], () => {
  const fuse = FuseBox.init({
    homeDir: 'src',
    target: 'browser@es2015',
    output: 'dist/client/$name.js',
    useTypescriptCompiler: true,
    cache: true,
    sourceMaps: true,
    plugins: [     
      VueComponentPlugin(),
      [
        CSSResourcePlugin({
          inline: true
        }),
        CSSPlugin()        
      ],      
      JSONPlugin(),
      WebIndexPlugin({
        template: 'src/client/index.html'
      })
    ]
  });

  fuse.dev({
    port: 8080
   
  });

  fuse
    .bundle('app')
    .instructions('> client/index.ts')
    .watch('client/**')
    .hmr();

  return fuse.run();
});
