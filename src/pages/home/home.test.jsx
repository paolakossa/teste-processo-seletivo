import React from 'react';
import { render, screen } from '@testing-library/react';
import { Home } from '.';
import { describe, expect, it } from 'vitest';

describe('Home Component', () => {
  it('should render the text "Home"', () => {
    render(<Home />);
    const divElement = screen.getByText(/Home/i);
    expect(divElement).toBeInTheDocument();
  });
});
