const fs = require('fs');
const minimo = require('minimojs/minimojs/minimo');
const httpServer = require('http-server/lib/http-server');
const _ = require('underscore');

const destFolder = `${__dirname}/tmp`;

const deleteFolderRecursive = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file, index) => {
      let curPath = `${path}/${file}`;
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(path);
  }
};

deleteFolderRecursive(destFolder);

console.log('Compiling pages');
minimo.generateMinimoJs({
  workingFolder: __dirname,
  defaultTemplate: 'tpl.htmx',
  destinationPath: destFolder,
  devMode: true
}).then(() => {
  console.log('starting server');
  let server = httpServer.createServer({
    root: destFolder,
    robots: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': 'true'
    }
  });

  server.listen(8080);
});