export const responseMock = [{
  history: [
    {
      title: "test",
      body: "testing",
      updatedAt: new Date("2022-08-26T18:41:10.296Z"),
      _id: "63091a8ef1597685674fd06c"
    }
  ],
  _id: "63091a8ef1597685674fd06b",
  createdAt: new Date("2022-08-26T19:10:06.620Z"),
  updatedAt: new Date("2022-08-26T19:10:06.620Z"),
}];

export const responseBodyMock = [{
  history: [
    {
      title: "test",
      body: "testing",
      updatedAt: "2022-08-26T18:41:10.296Z",
      _id: "63091a8ef1597685674fd06c"
    }
  ],
  _id: "63091a8ef1597685674fd06b",
  createdAt: "2022-08-26T19:10:06.620Z",
  updatedAt: "2022-08-26T19:10:06.620Z",
}];

export const createPostMock = {
  history: [{
    title: 'test',
    body: 'testing',
    updatedAt: new Date(),
  }],
};

export const invalidCreatePostMock = {
  history: [{
    body: 'testing',
    updatedAt: new Date(),
  }],
};

export const updateResponseMock = {
  _id: "63091a8ef1597685674fd06b",
  history: [
    {
      title: "test2",
      body: "testing2",
      updatedAt: new Date("2022-08-27T18:53:43.234Z"),
      _id: "63093e693cf4365539d649fe",
    },
    {
      title: "test",
      body: "testing",
      updatedAt: new Date("2022-08-26T18:41:10.296Z"),
      _id: "63091a8ef1597685674fd06c",
    }
  ],
  createdAt: "2022-08-26T19:10:06.620Z",
  updatedAt: new Date("2022-08-26T21:43:05.074Z"),
};

export const updateResponseBodyMock = {
  _id: "63091a8ef1597685674fd06b",
  history: [
    {
      title: "test2",
      body: "testing2",
      updatedAt: "2022-08-27T18:53:43.234Z",
      _id: "63093e693cf4365539d649fe",
    },
    {
      title: "test",
      body: "testing",
      updatedAt: "2022-08-26T18:41:10.296Z",
      _id: "63091a8ef1597685674fd06c",
    }
  ],
  createdAt: "2022-08-26T19:10:06.620Z",
  updatedAt: "2022-08-26T21:43:05.074Z",
};

export const updatePostMock = {
  history: [{
    title: "test2",
    body: "testing2",
    updatedAt: new Date(),
  }],
};

export const MOCK_ID = '63091a8ef1597685674fd06b';

export const createRequestBody = {
  title: "test333",
  body: "testing333",
  updatedAt: "2022-08-26T18:41:10.296Z",
};

export const updateRequestBody = {
  title: "test2",
  body: "testing2",
  updatedAt: "2022-08-27T18:53:43.234Z",
};
