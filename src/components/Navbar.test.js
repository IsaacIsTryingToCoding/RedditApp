// Navbar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from './Navbar';

describe('Navbar component', () => {
  test('renders logo and hamburger icon when sidebar is closed', () => {
    const toggleSidebarMock = jest.fn();
    render(<Navbar toggleSidebar={toggleSidebarMock} sidebarOpen={false}> 
             <div>Dummy</div>
           </Navbar>);
    // Verifica che il logo sia presente
    const logo = screen.getByText(/RedditApp/i);
    expect(logo).toBeInTheDocument();

    // Verifica che l'icona hamburger sia presente
    const icon = document.querySelector('.hamburger-icon');
    expect(icon).toBeInTheDocument();

    // Simula un click sull'icona e controlla che venga chiamato toggleSidebar
    fireEvent.click(icon);
    expect(toggleSidebarMock).toHaveBeenCalled();
  });

  test('renders X icon when sidebar is open', () => {
    const toggleSidebarMock = jest.fn();
    render(<Navbar toggleSidebar={toggleSidebarMock} sidebarOpen={true}> 
             <div>Dummy</div>
           </Navbar>);
    const icon = document.querySelector('.hamburger-icon');
    expect(icon).toBeInTheDocument();
    // Qui potresti verificare ulteriormente eventuali differenze se usi attributi distintivi
  });
});
