import { DynamoDB, awsSdkPromiseResponse } from "../__mocks__/aws-sdk";
import { deleteDbDemoQuestion, createDbDemoQuestion } from "../lib/demoDb";
const demoQuestionTable = process.env.quizTable;
const db = new DynamoDB.DocumentClient();

describe("deleteing a demographic question", () => {
  test("demo Q deletion", async () => {
    const demo = {
      questionID: 1,
    };

    await deleteDbDemoQuestion(demo);
    expect(db.delete).toHaveBeenCalledWith({
      TableName: demoQuestionTable,
      Key: demo,
    });
  });
});

test("delete  demo question with invalid data", async () => {
  awsSdkPromiseResponse.mockReturnValueOnce(
    Promise.reject(new Error("some error"))
  );
  expect.assertions(1);
  const question = {
    email: "pallapolozi@nono.com",
  };
  try {
    await deleteDbDemoQuestion(question);
  } catch (e) {
    expect(e.message).toBe("some error");
  }
});

describe("createDemoQuestion test for valid data", () => {
  test("save question", async () => {
    const question = {
      questionID: 1,
      question_type: "M",
      question_body: "What is your position in the company?",
      answer1_body: "Peon",
      answer2_body: "Serf",
      answer3_body: "slave",
      answer4_body: "groveller",
      answer5_body: "CEO",
    };
    await createDbDemoQuestion(question);
    expect(db.put).toHaveBeenCalledWith({
      TableName: demoQuestionTable,
      Item: question,
    });
  });
});

test("createDemoQuestion test for invalid data", async () => {
  awsSdkPromiseResponse.mockReturnValueOnce(
    Promise.reject(new Error("some error"))
  );
  expect.assertions(1);
  const quiz = {
    question_type: "M",
    question_body: "What is your position in the company?",
    answer1_body: "Peon",
    answer2_body: "Serf",
    answer3_body: "slave",
    answer4_body: "groveller",
    answer5_body: "CEO",
  };
  try {
    await createDbDemoQuestion(quiz);
  } catch (e) {
    expect(e.message).toBe("some error");
  }
});
