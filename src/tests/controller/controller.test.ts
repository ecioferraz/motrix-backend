import Sinon from 'sinon';
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import PostModel from '../../model/PostModel';
import { createRequestBody, invalidCreatePostMock, responseBodyMock, responseMock, updateResponseMock } from '../mocks/postsMock';

chai.use(chaiHttp);

const app = server.getApp();

describe('PostController', () => {
  const postModel = new PostModel();

  let chaiHttpResponse;

  afterEach(() => Sinon.restore());

  describe('create', () => {
    before(() => Sinon
    .stub(postModel.model, 'create')
    .onFirstCall().resolves(responseMock[0])
    .onSecondCall().throws()
    .onThirdCall().throws());

    it('should return a status 201 and a new post created when data is valid', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/')
        .send(createRequestBody);

        expect(chaiHttpResponse).to.have.status(201);
        expect(chaiHttpResponse.body.history).to.be.an('array');
        expect(chaiHttpResponse.body).to.be.deep.eq(responseBodyMock[0]);
    });

    it('should return status 400 when data is invalid', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .post('/')
        .send(invalidCreatePostMock);

        expect(chaiHttpResponse).to.have.status(400);
        expect(chaiHttpResponse.body.error.name).to.be.eq('ZodError');
    });

    it('should return status 500 and an "Internal Server Error" message', async () => {
      chaiHttpResponse = await chai
      .request(app)
      .post('/')
      .send(createRequestBody);

      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body.error).to.be.eq('Internal Server Error');
    });
  });

  describe('read', () => {
    before(() => Sinon
      .stub(postModel.model, 'find')
      .resolves(responseMock));

    it('should return status 200 and a list of all tasks', async () => {
      chaiHttpResponse = await chai
        .request(app)
        .get('/')
        .send();

      expect(chaiHttpResponse).to.have.status(200);
      expect(chaiHttpResponse.body).to.be.deep.eq(responseBodyMock);
    });
  });
});
