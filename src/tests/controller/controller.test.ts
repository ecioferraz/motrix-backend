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

  afterEach(() => Sinon.restore());

  describe('create', () => {
    before(() => Sinon
    .stub(postModel.model, 'create')
    .onFirstCall().resolves(responseMock[0])
    .onSecondCall().throws()
    .onThirdCall().throws());

    it('should return a status 201 and a new post created when data is valid', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/')
        .send(createRequestBody);

        expect(chaiHttpResponse).to.have.status(201);
        expect(chaiHttpResponse.body.history).to.be.an('array');
        expect(chaiHttpResponse.body).to.be.deep.eq(responseBodyMock[0]);
    });

    it('should return status 400 when data is invalid', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/')
        .send(invalidCreatePostMock);

        expect(chaiHttpResponse).to.have.status(400);
        expect(chaiHttpResponse.body.error.name).to.be.eq('ZodError');
    });

    it('should return status 500 and an "Internal Server Error" message', async () => {
      const chaiHttpResponse = await chai
      .request(app)
      .post('/')
      .send(createRequestBody);

      expect(chaiHttpResponse).to.have.status(500);
      expect(chaiHttpResponse.body.error).to.be.eq('Internal Server Error');
    });
  });
});
