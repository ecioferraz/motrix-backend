import { Request, Response } from 'express';
import { isValidObjectId } from 'mongoose';
import Controller from '.';
import { Post } from '../schema/PostSchema';
import { IRequestWithBody } from '../interfaces/IRequestWithBody';
import PostService from '../service/PostService';
import { ResponseError } from '../types/ResponseError';
import { IPost } from '../interfaces/IPost';

export default class PostController extends Controller<Post> {
  constructor(
    public service = new PostService(),
    public _route = '/',
  ) {
    super(service);
  }

  get route() {
    return this._route;
  }

  public create = async (
    req: IRequestWithBody<IPost>,
    res: Response<Post | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const post = await this.service.create({ history: [req.body] });

      if (!post) {
        return res.status(this.status.INTERNAL)
          .json({ error: this.errors.internal });
      }

      if ('error' in post) {
        return res.status(this.status.BAD_REQUEST).json(post);
      }

      return res.status(this.status.CREATED).json(post);
    } catch (error) {
      return res.status(this.status.INTERNAL)
        .json({ error: this.errors.internal });
    }
  };

  public readOne = async (
    req: Request<{ id: string }>,
    res: Response<Post | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res.status(this.status.BAD_REQUEST)
          .json({ error: this.errors.invalidId });
      }

      const post = await this.service.readOne(id);

      return post ? res.json(post)
        : res.status(this.status.NOT_FOUND)
          .json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(this.status.INTERNAL)
        .json({ error: this.errors.internal });
    }
  };

  private serializeUpdateBody = (body: IPost) => {
    return {
      history: [body],
    };
  };

  public update = async (
    req: Request<{ id: string }>,
    res: Response<Post | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res.status(this.status.BAD_REQUEST)
          .json({ error: this.errors.invalidId });
      }
      
      const post = await this.service
        .update(id, this.serializeUpdateBody(req.body));

      return post ? res.json(post)
        : res.status(this.status.NOT_FOUND)
          .json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(this.status.INTERNAL)
        .json({ error: this.errors.internal });
    }
  };

  public delete = async (
    req: Request<{ id: string }>,
    res: Response<Post | ResponseError>,
  ): Promise<typeof res> => {
    try {
      const { id } = req.params;

      if (!isValidObjectId(id)) {
        return res.status(this.status.BAD_REQUEST)
          .json({ error: this.errors.invalidId });
      }

      const post = await this.service.delete(id);

      return post ? res.status(this.status.NO_CONTENT).json(post)
        : res.status(this.status.NOT_FOUND)
          .json({ error: this.errors.notFound });
    } catch (error) {
      return res.status(this.status.INTERNAL)
        .json({ error: this.errors.internal });
    }
  };
}