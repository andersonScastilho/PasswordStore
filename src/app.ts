import express from "express";

import { userRouter } from "routes/user-routes";
import { storageRoutes } from "routes/store-routes";
import { auhRoutes } from "routes/auth";
import { passwordRoutes } from "routes/password-routes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this._middlewares();
    this._router();
  }

  private _middlewares() {
    this.app.use(express.json());
  }

  private _router() {
    this.app.use(userRouter);
    this.app.use(storageRoutes);
    this.app.use(auhRoutes);
    this.app.use(passwordRoutes);
  }
}
export default new App();
