import { Server } from 'http';
import { AddressInfo } from 'net';
import App from './app';

const newApp: App = new App();
let server: Server;
const port = 8080;

function serverError(error: NodeJS.ErrnoException): void {
  if (error.syscall !== 'listen') throw error;

  // TODO: Handle other error codes here
  throw error;
}

newApp
  .init()
  .then(() => {
    newApp.app.set('port', port);

    server = newApp.httpServer;
    server.on('error', serverError);
    server.on('listening', () => {
      const addressInfo: AddressInfo = <AddressInfo>server.address();
      console.log(`Server is listening on ${addressInfo.address}:${port}`);
    });
    server.listen(port);
  })
  .catch((err: Error) => {
    console.log('app.init.error');
    console.error(err.name);
    console.error(err.message);
    console.error(err.stack);
  });
