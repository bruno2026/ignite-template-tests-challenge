import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { IncorrectEmailOrPasswordError } from "./IncorrectEmailOrPasswordError";

let authenticateUseCase: AuthenticateUserUseCase;
let usersRepository: InMemoryUsersRepository;
let createUser: CreateUserUseCase;

describe("authenticate user", () => {

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUseCase = new AuthenticateUserUseCase(usersRepository);
    createUser = new CreateUserUseCase(usersRepository);
  })

  it("shold be able authenticate a user", async () => {
    const user = {
      name: "teste",
      password: "teste123",
      email: "teste@teste.com"
    }
    await createUser.execute(user);
    const authenticated = await authenticateUseCase.execute({
      email: user.email,
      password: user.password
    });
    expect(authenticated).toHaveProperty("token")
    expect(authenticated.user.email).toEqual(user.email);
  })

  it("shold not be able authenticate password incorrect", async () => {
    expect(async () => {
      const user = {
        name: "teste",
        password: "teste123",
        email: "teste@teste.com"
      }
      await createUser.execute(user);


      await authenticateUseCase.execute({
        email: user.email,
        password: "user.password"
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
  })

  it("shold not be able authenticate email incorrect", async () => {
    expect(async () => {
      const user = {
        name: "teste",
        password: "teste123",
        email: "teste@teste.com"
      }
      await createUser.execute(user);


      await authenticateUseCase.execute({
        email: "user.email",
        password: user.password,
      });
    }).rejects.toBeInstanceOf(IncorrectEmailOrPasswordError)
  })


})
