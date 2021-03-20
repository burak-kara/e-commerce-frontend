import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from '../../pages/app/App';

test('renders account button', () => {
    render(<App />);
    const linkElement = screen.getByText(/John/i);
    expect(linkElement).toBeInTheDocument();
});
