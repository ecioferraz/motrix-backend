import App from './app';
import CustomRouter from './routes/Router';
import PostController from './controller/PostController';
import { Post } from './schema/PostSchema';

const server = new App();

const postController = new PostController();

const postRouter = new CustomRouter<Post>();
postRouter.addRoute(postController);

server.addRouter(postRouter.router);

export default server;
