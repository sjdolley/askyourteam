// setting up mock for the aws sdk document client

export const awsSdkPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true));

const putFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

const queryFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

const deleteFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

const getFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

const updateFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

class DocumentClient {
  put = putFn;
  query = queryFn;
  delete = deleteFn;
  get = getFn;
  update = updateFn;
}

export const DynamoDB = {
  DocumentClient,
};