import 'reflect-metadata'
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

describe('CreateUserController', () => {
  it('should call the CreateUserUseCase with the correct params and return 201 status code', async () => {
    // Create a mock CreateUserUseCase instance
    const createUserUseCase = {
      execute: jest.fn()
    } as unknown as CreateUserUseCase;

    // Inject the mock CreateUserUseCase instance into the container
    jest.spyOn(container, 'resolve').mockImplementation(() => createUserUseCase);

    // Create an instance of the CreateUserController
    const createUserController = new CreateUserController();

    // Create a mock request object with the desired input data
    const request = {
      body: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: '123456'
      }
    } as Request;

    // Create a mock response object
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    } as unknown as Response;

    // Call the execute method of the createUserController instance
    await createUserController.execute(request, response);

    // Assert that the CreateUserUseCase's execute method was called with the correct params
    expect(createUserUseCase.execute).toHaveBeenCalledWith({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    });

    // Assert that the mock response object's status and send methods were called correctly
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.send).toHaveBeenCalled();
  });
});
