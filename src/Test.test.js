import { render, screen } from '@testing-library/react';
import TestPage from './TestPage';
import '@testing-library/jest-dom';

test('renders 안녕', () => {
  render(<TestPage />);

  const linkElement = screen.getByText(/안녕/i);
  expect(linkElement).toBeInTheDocument();
});
