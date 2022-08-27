import Service from '.';
import { Post, PostSchema } from '../schema/PostSchema';
import { IServiceError } from '../interfaces/IServiceError';
import PostModel from '../model/PostModel';

export default class PostService extends Service<Post> {
  constructor(public model = new PostModel()) {
    super(model);
  }

  public create = async (post: Post)
  : Promise<Post | null | IServiceError> => {
    const parsed = PostSchema.safeParse(post);
    return (!parsed.success)
      ? { error: parsed.error }
      : this.model.create(post);
  };

  public update = (id: string, post: Post)
  : Promise<Post | IServiceError | null> => {
    return this.model.update(id, post.history[0] as unknown as Post);
  };
}
