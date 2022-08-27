import { Schema, model as createModel, Document } from 'mongoose';
import { Post } from '../schema/PostSchema';
import MongoModel from './MongoModel';

interface IPostDocument extends Post, Document { }

const postSchema = new Schema<IPostDocument>({
  history: [{
    title: String,
    body: String,
    updatedAt: Date,
  }]}, {
  versionKey: false,
  timestamps: true,
});

export default class PostModel extends MongoModel<Post> {
  constructor(public model = createModel('Post', postSchema)) {
    super(model);
  }
}
