import { Request, Response } from 'express';
import { ControllerErrors, StatusCode } from '../enums';
import { IPost } from '../interfaces/IPost';
import { IRequestWithBody } from '../interfaces/IRequestWithBody';
import Service from '../service';
import { ResponseError } from '../types/ResponseError';

export default abstract class Controller<T> {
  abstract route: string;

  protected errors = ControllerErrors;

  protected status = StatusCode;

  constructor(protected service: Service<T>) { }

  public abstract create(
    req: IRequestWithBody<T | IPost>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  public read = async (
    _req: Request,
    res: Response<T[] | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const response = await this.service.read();

      return res.json(response);
    } catch (error) {
      return res
        .status(this.status.INTERNAL)
        .json({ error: this.errors.internal });
    }
  };

  public abstract readOne(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  public abstract update(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;

  public abstract delete(
    req: Request<{ id: string }>,
    res: Response<T | ResponseError>,
  ): Promise<typeof res>;
}
