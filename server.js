const express = require('express');
const app = express();

const { createServer } = require('http');
const { join } = require('path');

[
  { route: '/', path: join(__dirname, 'public') },
  { route: '/dist', path: join(__dirname, 'dist') }, 
  { route: '/dist', path: join(__dirname, 'ng-profile-card-demo/dist') },
  { route: '/dist', path: join(__dirname, 'preact-profile-card-demo/dist') },
  { route: '/node_modules', path: join(__dirname, 'node_modules') }
]
.forEach(staticFolder => app.use(staticFolder.route, express.static(staticFolder.path)));

let route = express.Router();
route.get('/profiles', (req, res) => {
  const profiles = require('./profiles.json');
  return res.status(200).json(profiles);
});
app.use('/api', route);

app.all('/*', function(req, res) {
  res.sendFile('index.html', {  root: join(__dirname, 'public') });
});  

const server = createServer(app);
server.listen(3000, '0.0.0.0')
  .on('listening', () => {
    const { port, address } = server.address();
    console.log(`Express server started on port ${port} at ${address}.`);   
  });  