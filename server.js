const docker = require('./src/docker'),
      express = require('express'),
      basicAuth = require('express-basic-auth')
      app = express()
      path = require('path'),
      user = process.env.user,
      pass = process.env.pass;

if(user && pass) {
  app.use(basicAuth({
    users: {[user]: [pass]},
    challenge: true,
    realm: 'SD915246'
  }))
}
app.use(express.static('public'));

app.get('/services', (req, res) => 
  docker.getServices()
    .then(services => res.send(services))
    .catch(error => {
      console.log(error);
      res.statusCode = 500;
      res.send('Error found, try again later')
  })
);

app.get('/service/:name', (req, res) =>
  docker.getService(req.params.name)
    .then(service => res.send(service))
    .catch(error => {
      console.log(error);
      res.statusCode = 500;
      res.send('Error found, try again later')
  })
);

app.get('/get-nodes', (req, res) =>
  docker.getNodes()
    .then(nodes => res.send(nodes))
    .catch(error => {
      console.log(error);
      res.statusCode = 500;
      res.send('Error found, try again later')
  })
);

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '.', 'public', 'index.html'));
});

app.listen(8089, () => console.log('Swarm den running on port 8089'))