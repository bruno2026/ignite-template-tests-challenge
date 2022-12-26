import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserError } from "./CreateUserError";
import { CreateUserUseCase } from "./CreateUserUseCase";

let userRepositoryInMemory: InMemoryUsersRepository;
let createUser: CreateUserUseCase;

describe("Create User", () => {


  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository();
    createUser = new CreateUserUseCase(userRepositoryInMemory);
  })

  it("should be able create a new user", async () => {
    const user = {
      name: "teste",
      email: "teste@teste.com",
      password: "teste123"
    }

    await createUser.execute({
      name: user.name,
      email: user.email,
      password: user.password
    });

    const userCreated = await userRepositoryInMemory.findByEmail(user.email);
    expect(userCreated).toHaveProperty("id")
  });

  it("should not be able create user already exists", async () => {
    const user = {
      name: "teste",
      email: "teste@teste.com",
      password: "teste123"
    }

    expect(async () => {
      await createUser.execute({
        name: user.name,
        email: user.email,
        password: user.password
      });

      await createUser.execute({
        name: user.name,
        email: user.email,
        password: user.password
      });
    }).rejects.toBeInstanceOf(CreateUserError)

  });

})
