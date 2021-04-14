import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders calendar title', () => {
  render(<App />);
  const linkElement = screen.getByText(/calendar/i);
  expect(linkElement).toBeInTheDocument();
});
