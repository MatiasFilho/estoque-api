const server = require('./server');

const { SERVER_PORT } = process.env;

server.listen(SERVER_PORT || 3000, () => {
  console.log('Application initialized on port:', SERVER_PORT || 3000);
});
