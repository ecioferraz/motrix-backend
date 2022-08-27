import { Router } from 'express';
import Controller from '../controller';

export default class CustomRouter<T> {
  public router: Router;

  constructor() {
    this.router = Router();
  }

  public addRoute(
    controller: Controller<T>,
    route: string = controller.route,
  ) {
    this.router.route(route)
      .post(controller.create)
      .get(controller.read);
    this.router.route(`${route}:id`)
      .get(controller.readOne)
      .put(controller.update)
      .delete(controller.delete);
  }
}
