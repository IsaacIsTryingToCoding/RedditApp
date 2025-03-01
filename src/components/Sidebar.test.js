// Sidebar.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from './Sidebar';

test('renders sidebar and calls onSelectSubreddit when a subreddit is clicked', () => {
  const onSelectSubredditMock = jest.fn();
  render(<Sidebar onSelectSubreddit={onSelectSubredditMock} />);
  
  // Verifica che un elemento della lista sia presente (es. "reactjs")
  const subredditItem = screen.getByText(/reactjs/i);
  expect(subredditItem).toBeInTheDocument();
  
  // Simula il click sull'elemento
  fireEvent.click(subredditItem);
  
  // Controlla che la funzione sia chiamata con "reactjs"
  expect(onSelectSubredditMock).toHaveBeenCalledWith('reactjs');
});
