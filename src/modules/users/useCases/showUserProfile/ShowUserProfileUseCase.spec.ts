import { ShowUserProfileError } from "./ShowUserProfileError";
import { InMemoryUsersRepository } from "../../repositories/in-memory/InMemoryUsersRepository";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "../authenticateUser/AuthenticateUserUseCase";
import { ShowUserProfileUseCase } from './ShowUserProfileUseCase';

describe("Show user Profile", () => {
  let authenticateUseCase: AuthenticateUserUseCase;
  let userRepositoryInMemory: InMemoryUsersRepository;
  let createUser: CreateUserUseCase;
  let usecase: ShowUserProfileUseCase;

  beforeEach(() => {
    userRepositoryInMemory = new InMemoryUsersRepository();
    authenticateUseCase = new AuthenticateUserUseCase(userRepositoryInMemory);
    createUser = new CreateUserUseCase(userRepositoryInMemory);
    usecase = new ShowUserProfileUseCase(userRepositoryInMemory);
  })


  it("shold be able find user by id", async () => {
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

    const userByid = await userRepositoryInMemory.findById(`${authenticated.user.id}`)

    expect(userByid?.id).toEqual(authenticated.user.id)
  })

  it("shold not be able find user by not exists id", async () => {
    expect(async () => {
      const user = {
        name: "teste2",
        password: "teste1232",
        email: "teste2@teste.com"
      }
      await createUser.execute(user);
      await authenticateUseCase.execute({
        email: user.email,
        password: user.password
      });
      const tst = await usecase.execute(`id nao existente`)
      console.log(tst);
    }).rejects.toBeInstanceOf(ShowUserProfileError)



  });
})
