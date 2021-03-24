import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../../pages/app/App';

test('renders account button', () => {
    render(
        <Router>
            <App />
        </Router>,
    );
    const linkElement = screen.getByText(/John/i);
    expect(linkElement).toBeInTheDocument();
});
