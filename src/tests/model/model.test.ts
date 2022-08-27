import { expect } from 'chai';
import Sinon from 'sinon';
import PostModel from '../../model/PostModel';
import {
  createPostMock,
  MOCK_ID,
  responseMock,
  updatePostMock,
  updateResponseMock,
} from '../mocks/postsMock';

describe('PostModel', () => {
  const postModel = new PostModel();

  afterEach(() => Sinon.restore());

  describe('create', () => {
    before(() => Sinon
      .stub(postModel.model, 'create')
      .resolves(responseMock[0]));

    it('should return a new post created', async () => {
      const post = await postModel.create(createPostMock);

      expect(post).to.have.property('history');
      expect(post.history).to.be.an('array');
      post.history.forEach((version) => {
        expect(version).to.have.property('title');
        expect(version).to.have.property('body');
        expect(version).to.have.property('updatedAt');
      });
    });
  });

  describe('read', () => {
    before(() => Sinon
      .stub(postModel.model, 'find')
      .resolves(responseMock));

    it('should return a list of all posts', async () => {
      const posts = await postModel.read();

      expect(posts).to.be.an('array');
      posts.forEach((post) => {
        expect(post).to.have.property('history')
        expect(post.history).to.be.an('array');
        post.history.forEach((version) => {
          expect(version).to.have.property('title');
          expect(version).to.have.property('body');
          expect(version).to.have.property('updatedAt');
        });
      })
    });
  });

  describe('readOne', () => {
    before(() => Sinon
      .stub(postModel.model, 'findById')
      .resolves(responseMock[0]));

    it('should return the required post', async () => {
      const post = await postModel.readOne(MOCK_ID);

      expect(post).to.have.property('history');
      expect(post?.history).to.be.an('array');
      post?.history.forEach((version) => {
        expect(version.title).to.be.eq('test');
        expect(version.body).to.be.eq('testing');
        expect(version.updatedAt).to.be.a('string');
      });
    });
  });

  describe('update', () => {
    before(() => {
      Sinon.stub(postModel.model, 'findByIdAndUpdate').resolves(updateResponseMock);
    });

    it('should return an updated post', async () => {
      const updatedPost = await postModel.update(MOCK_ID, updatePostMock);

      expect(updatedPost).to.have.property('history');
      expect(updatedPost?.history).to.be.an('array');
      expect(updatedPost?.history[0].title).to.be.eq('test2');
      expect(updatedPost?.history[0].body).to.be.eq('testing2');
      expect(updatedPost?.history[0].updatedAt).to.be.a('string');
      expect(updatedPost?.history[1].title).to.be.eq('test');
      expect(updatedPost?.history[1].body).to.be.eq('testing');
      expect(updatedPost?.history[1].updatedAt).to.be.a('string');
    });
  });

  describe('delete', () => {
    before(() => {
      Sinon.stub(postModel.model, 'findByIdAndDelete').resolves(responseMock[0]);
    });

    it('should return the task deleted', async () => {
      const deletedPost = await postModel.delete(MOCK_ID);

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
