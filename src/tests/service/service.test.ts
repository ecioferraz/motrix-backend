import { expect } from 'chai';
import Sinon from 'sinon';
import { Post } from '../../schema/PostSchema';
import PostService from '../../service/PostService';
import { createPostMock, invalidCreatePostMock, responseMock } from '../mocks/postsMock';

describe('PostService', () => {
  const postService = new PostService();

  afterEach(() => Sinon.restore());

  describe('create', () => {
    it('should return a new post created', async () => {
      Sinon.stub(postService.model, 'create').resolves(responseMock[0] as Post);
      const post = await postService.create(createPostMock) as Post;

      expect(post).to.have.property('history');
      expect(post.history).to.be.an('array');
      post.history.forEach((version) => {
        expect(version).to.have.property('title');
        expect(version).to.have.property('body');
        expect(version).to.have.property('updatedAt');
      });
    });

    it('should return an error', async () => {
      Sinon.stub(postService.model, 'create').throws();
      const post = await postService.create(invalidCreatePostMock as Post);

      expect(post).to.have.property('error');
    });
  });
});
