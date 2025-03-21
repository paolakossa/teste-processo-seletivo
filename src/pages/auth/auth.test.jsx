import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { it, expect, describe, vi, beforeEach } from 'vitest';
import { Auth } from '.';
import TestWrapper from '../../../__tests__/utils/testWrapper';
import axios from 'axios';
import { store } from '../../store/store';

vi.mock('axios');

describe('Auth Component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the email, password fields, and the submit button', () => {
    render(
      <TestWrapper>
        <Auth />
      </TestWrapper>,
    );
    // Check if the fields and the button are present in the document
    expect(screen.getByTestId('emailInput')).toBeInTheDocument();
    expect(screen.getByTestId('passwordInput')).toBeInTheDocument();
    expect(screen.getByTestId('submitButton')).toBeInTheDocument();
  });

  it('should successfully submit the form and process the API response', async () => {
    // Mock axios to simulate a successful response
    const mockSuccessResponse = { token: 'QpwL5tke4Pnpja7X4' };
    axios.post.mockResolvedValue({ data: mockSuccessResponse });

    render(
      <TestWrapper>
        <Auth />
      </TestWrapper>,
    );

    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');
    const submitButton = screen.getByTestId('submitButton');

    // Fill in the form fields
    fireEvent.change(emailInput, { target: { value: 'eve.holt@reqres.in' } });
    fireEvent.change(passwordInput, { target: { value: 'cityslicka' } });
    fireEvent.click(submitButton);

    // Check if axios.post was called with the correct data
    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(expect.any(String), {
        email: 'eve.holt@reqres.in',
        password: 'cityslicka',
      });
    });
  });

  it('should log an error to the console when the API returns an error', async () => {
    // Mock axios to simulate an error response from the API
    const mockErrorResponse = { error: 'Missing password' };
    const error = { response: { data: mockErrorResponse } };
    vi.spyOn(axios, 'post').mockRejectedValueOnce(error);

    render(
      <TestWrapper>
        <Auth />
      </TestWrapper>,
    );

    const emailInput = screen.getByTestId('emailInput');
    const passwordInput = screen.getByTestId('passwordInput');
    const submitButton = screen.getByTestId('submitButton');

    // Fill in the form with invalid data (no password)
    fireEvent.change(emailInput, { target: { value: 'peter@klaven' } });
    fireEvent.change(passwordInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    // Wait for the API call and check if the error was logged to the console
    await waitFor(() => {
      const {
        userData: { error },
      } = store.getState();
      expect(error).toEqual(mockErrorResponse.error);
    });
  });
});
