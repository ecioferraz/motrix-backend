import { IModel } from '../interfaces/IModel';
import { IServiceError } from '../interfaces/IServiceError';

export default abstract class Service<T> {
  constructor(protected model: IModel<T>) { }

  public create = async (obj: T): Promise<T | null | IServiceError> =>
    this.model.create(obj);

  public read = async (): Promise<T[]> => this.model.read();

  public readOne = async (id: string): Promise<T | null | IServiceError> =>
    this.model.readOne(id);

  public update = async (id: string, obj: T)
  : Promise<T | null | IServiceError> =>
    this.model.update(id, obj);

  public delete = async (id: string): Promise<T | null | IServiceError> =>
    this.model.delete(id);
}
