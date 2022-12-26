import 'reflect-metadata';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { AuthenticateUserController } from './AuthenticateUserController';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

describe('AuthenticateUserController', () => {
  let authenticateUserController: AuthenticateUserController;
  beforeEach(() => {
    authenticateUserController = new AuthenticateUserController();
  });

  describe('Authenticate user controller', () => {
    it('should return the user and token in the response', async () => {
      // Create a mock implementation of the Response class
      const mockResponse = {
        json: jest.fn().mockReturnValue({}),
      } as unknown as Response;

      // Set up mock request object
      const request = {
        body: {
          email: 'user@example.com',
          password: 'password',
        },
      } as Request;

      // Override the container.resolve function to return the mock AuthenticateUserUseCase instance
      const mockAuthenticateUserUseCase = {
        execute: jest.fn().mockResolvedValue({
          user: {},
          token: 'mock-token',
        }),
      } as unknown as AuthenticateUserUseCase;
      jest.spyOn(container, 'resolve').mockReturnValue(mockAuthenticateUserUseCase);

      // Call the execute method
      await authenticateUserController.execute(request, mockResponse);

      // Assert that the response contains the expected data
      expect(mockResponse.json).toHaveBeenCalledWith({
        user: {},
        token: 'mock-token',
      });
    });
  });
});
