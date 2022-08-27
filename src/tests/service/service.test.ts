import { expect } from 'chai';
import Sinon from 'sinon';
import { Post } from '../../schema/PostSchema';
import PostService from '../../service/PostService';
import { createPostMock, invalidCreatePostMock, MOCK_ID, responseMock, updatePostMock, updateResponseMock } from '../mocks/postsMock';

describe('PostService', () => {
  const postService = new PostService();

  afterEach(() => Sinon.restore());

  describe('create', () => {
    it('should return a new post created', async () => {
      Sinon
        .stub(postService.model, 'create')
        .resolves(responseMock[0] as Post);

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

  describe('read', () => {
    before(() => Sinon
      .stub(postService.model, 'read')
      .resolves(responseMock));

    it('should return a list of all posts', async () => {
      const posts = await postService.read();

      expect(posts).to.be.an('array');
      posts.forEach((post) => {
        expect(post).to.have.property('history')
        expect(post.history).to.be.an('array');
        post.history.forEach((version) => {
          expect(version).to.have.property('title');
          expect(version).to.have.property('body');
          expect(version).to.have.property('updatedAt');
        });
      });
    });
  });

  describe('readOne', () => {
    before(() => Sinon
      .stub(postService.model, 'readOne')
      .resolves(responseMock[0]));

    it('should return the required post', async () => {
      const post = await postService.readOne(MOCK_ID);

      expect(post).to.be.deep.eq(responseMock[0]);
    });
  });

  describe('update', () => {
    before(() => Sinon
        .stub(postService.model, 'update')
        .resolves(updateResponseMock));

    it('should return an updated post', async () => {
      const updatedPost = await postService.update(MOCK_ID, updatePostMock);

      expect(updatedPost).to.be.deep.eq(updateResponseMock);
    });
  });

  describe('delete', () => {
    before(() => Sinon
      .stub(postService.model, 'delete')
      .resolves(responseMock[0]));

    it('should return the task deleted', async () => {
      const deletedPost = await postService.delete(MOCK_ID) as Post;

      expect(deletedPost).to.have.property('history');
      expect(deletedPost?.history).to.be.an('array');
      deletedPost?.history.forEach((version) => {
        expect(version).to.have.property('title');
        expect(version).to.have.property('body');
        expect(version).to.have.property('updatedAt');
      });
    });
  });
});
