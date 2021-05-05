require('dotenv').config();

const onProxyReq = (proxyReq, req, res) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (req.body) {
      let bodyData = JSON.stringify(req.body);

      let reqContentType = req.header('Content-Type');

      //Set header for multi part form data
      if (reqContentType && reqContentType.startsWith('multipart/form-data')) {
        proxyReq.setHeader('Content-Type', reqContentType);
      } else {
        proxyReq.setHeader('Content-Type', 'application/json');
      }

      proxyReq.write(bodyData);
    }
  }
};

const trelloAPISettings = {
  target: process.env.TRELLO_API,
  changeOrigin: true,
  ws: true,
  secure: false,
  pathRewrite(path, req) {
    return path;
  },
  onProxyReq: onProxyReq,
};

exports.trelloAPISettings = trelloAPISettings;
