import { Model as M, Document } from 'mongoose';
import { IModel } from '../interfaces/IModel';

export default class MongoModel<T> implements IModel<T> {
  constructor(protected model: M<T & Document>) { }

  public create = async (obj: T): Promise<T> => this.model.create(obj);

  public read = async (): Promise<T[]> => this.model.find();

  public readOne = async (id: string): Promise<T | null> =>
    this.model.findById(id);

  public update = async (id: string, obj: T): Promise<T | null> => {
    return this.model.findByIdAndUpdate(id,
      { $push: { history: { $each: [obj], $position: 0 } } },
      { new: true },
    );
  };

  public delete = async (id: string): Promise<T | null> =>
    this.model.findByIdAndDelete(id);
}
