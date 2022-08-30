import express, { Application, Response, Request } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { Server, createServer } from 'http';

import { addErrorHandler } from './middlewares/error.middleware';

export default class App {
  public app: Application;

  public httpServer: Server;

  // eslint-disable-next-line @typescript-eslint/require-await
  public async init(): Promise<void> {
    this.app = express();
    this.httpServer = createServer(this.app);
    this.loadMiddlewares();
    this.registerRoutes();
    // this.catchErrors();
  }

  private loadMiddlewares(): void {
    this.app.use(helmet({ contentSecurityPolicy: false }));
    this.app.use(express.json({ limit: '100mb' }));
    this.app.use(express.urlencoded({ limit: '100mb', extended: true }));
    this.app.use(cors());
  }

  private registerRoutes(): void {
    this.app.get('/', (req: Request, res: Response): void => {
      res.json({ msg: 'Welcome to the Express Typescript boilerplate' });
    });
  }

  private catchErrors(): void {
    this.app.use(addErrorHandler);
  }
}
