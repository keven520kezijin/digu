process.env.NODE_CONFIG_DIR = 'server/config';
const Koa = require('koa');
const Router = require('koa-router');
const config = require('config');
const path = require('path');
const cors = require('koa2-cors');
const proxy = require('koa-better-http-proxy');
const neoProxy = require('koa-proxy');
const bodyParser = require('koa-bodyparser');
const koaService = require('./util/koaService');
const HomeController = require('./controllers/HomeController');
const DownloadController = require('./controllers/DownloadController');
const koaSend = require('koa-send');
const streamToString = require('stream-to-string');
const fs = require('fs');

const app = new Koa();
const router = new Router();

app.use(
  koaService({
    serviceRoot: path.join(__dirname, 'services'),
  }),
);

// 开发环境要支持跨域
if (config.get('env') === 'dev') {
  const devFrontGlobalVariables = fs.readFileSync(path.resolve(__dirname, `../build/globalVariables/dev.js`), 'utf8');
  app.use(
    cors({
      origin: function(ctx) {
        return false;
      },
      exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
      maxAge: 5,
      credentials: true,
      allowMethods: ['GET', 'POST', 'DELETE'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
    }),
  );

  router.use(
    '/neojs(.*)',
    neoProxy({
      host: 'http://localhost:1235',
    }),
  );

  router.get('/flow/(.*)', async (ctx, next) => {
    if (!/\/flow\/index\.html/.test(ctx.request.url) || process.env.MODE === 'manage') {
      const res = await koaSend(ctx, ctx.path, {
        root: path.join(__dirname, process.env.MODE === 'manage' ? '/../manage-source' : '/../front-source'),
        immutable: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      });

      if (/\/flow\/(.*)\.html/.test(ctx.request.url)) {
        const body = await streamToString(ctx.body);
        ctx.body = body.replace('GLOBAL_VARIABLES_SCRIPT', devFrontGlobalVariables);
      }
    } else {
      return neoProxy({
        url: 'http://localhost:1235',
      })(ctx, next);
    }
  });
}

// 线上环境要转发dist
if (config.get('env') === 'prod') {
  const options = {
    root: path.join(__dirname, '/dist'),
    immutable: true,
    maxAge: 1000 * 60 * 60 * 24 * 365,
  };

  router
    .get('/', async ctx =>
      koaSend(ctx, ctx.path, {
        root: path.join(__dirname, '/dist/index.html'),
        immutable: true,
        maxAge: 1000 * 60 * 60 * 24 * 365,
      }),
    )
    .get('/index.html', async ctx => koaSend(ctx, ctx.path, options))
    .get('/static/(.*)', async ctx => koaSend(ctx, ctx.path, options))
    .get('/common-static/(.*)', async ctx => koaSend(ctx, ctx.path, options))
    .get('/flow/(.*)', async ctx => koaSend(ctx, ctx.path, options));
}

// 其他地址反向代理
router
  .get('/home', HomeController.index)
  .get('/download-static-file/:fileName', DownloadController.index)
  .all(
    '*',
    proxy(process.env.npm_package_config_backendUrl || config.defaultBackendUrl, {
      limit: '102400kb',
    }),
  );

app
  .use(router.routes())
  .use(router.allowedMethods())
  .listen({ port: config.get('serverPort') }, () =>
    console.log(`🚀 Server ready at http://127.0.0.1:${config.get('serverPort')}`),
  );
