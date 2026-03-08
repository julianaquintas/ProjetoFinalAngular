
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/ProjetoFinalAngular/',
  locale: undefined,
  routes: [
  {
    "renderMode": 0,
    "redirectTo": "/ProjetoFinalAngular/dashboard",
    "route": "/ProjetoFinalAngular"
  },
  {
    "renderMode": 0,
    "route": "/ProjetoFinalAngular/tasklist"
  },
  {
    "renderMode": 0,
    "route": "/ProjetoFinalAngular/options"
  },
  {
    "renderMode": 0,
    "route": "/ProjetoFinalAngular/dashboard"
  },
  {
    "renderMode": 0,
    "route": "/ProjetoFinalAngular/add-task"
  },
  {
    "renderMode": 0,
    "route": "/ProjetoFinalAngular/detail/*"
  },
  {
    "renderMode": 0,
    "route": "/ProjetoFinalAngular/add-subject"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 24714, hash: 'c8e220461172a1b27b3408419f16c70291f2d50ab8731ad67d02c10f85868235', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17177, hash: 'b9fc8ec26ef64518148878a20470fd9e77bb585c67c2190a20b0989dd8547e20', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'styles-VLF5BSNN.css': {size: 8096, hash: 'XiK8zwfwaOg', text: () => import('./assets-chunks/styles-VLF5BSNN_css.mjs').then(m => m.default)}
  },
};
