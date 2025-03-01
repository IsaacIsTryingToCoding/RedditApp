// SearchBar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

test('calls onSearch with the entered query when submitted', () => {
  const onSearchMock = jest.fn();
  render(<SearchBar onSearch={onSearchMock} />);

  // Trova l'input tramite il placeholder
  const inputElement = screen.getByPlaceholderText(/search subreddit/i);
  
  // Simula il cambiamento del valore
  fireEvent.change(inputElement, { target: { value: 'reactjs' } });
  
  // Simula il submit del form
  fireEvent.submit(inputElement.closest('form'));

  // Verifica che la funzione di callback sia stata chiamata con 'reactjs'
  expect(onSearchMock).toHaveBeenCalledWith('reactjs');
});
