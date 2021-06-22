// setting up mock for the aws sdk document client

export const awsSdkPromiseResponse = jest.fn().mockReturnValue(Promise.resolve(true));

const putFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

const queryFn = jest.fn().mockImplementation(() => ({ promise: awsSdkPromiseResponse }));

class DocumentClient {
  put = putFn;
  //query = queryFn;
}

export const DynamoDB = {
  DocumentClient,
};