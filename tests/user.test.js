const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4MmRhZTgyMTk5Y2JiZmQ2NzgzZDc1MCIsImlhdCI6MTc0NzgyNDI1OCwiZXhwIjoxNzQ4NDI5MDU4fQ.qUiTfA_p_EiVqB5JSRAB-k63O0hT259giWJa3g0TWKI";

const request = require("supertest");
const app = require("../server");
const { MongoMemoryServer } = require("mongodb-memory-server");
const mongoose = require("mongoose");
const User = require("../models/user.model");

let mongoServer;
beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("User API", () => {
  let user;

  beforeEach(async () => {
    await User.deleteMany({});

    user = await User.create({
      name: "testuser",
      email: "testuser@gmail.com",
      password: "example",
    });
  });

  test("GET /api/users?id=... should get a user", async () => {
    const res = await request(app)
      .get("/api/users/get-user?id=" + user._id)
      .set("Authorization", `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("testuser");
    expect(res.body.email).toBe("testuser@gmail.com");
  });

  test("PUT /api/users?id=... should update a user", async () => {
    const res = await request(app)
      .put(`/api/users/update-user?id=${user._id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "testuser2",
      });

    expect(res.status).toBe(200);
    expect(res.body.name).toBe("testuser2");
  });
});
