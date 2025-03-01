import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { thunk } from 'redux-thunk';
import Posts from './Posts';

console.log('typeof thunk:', typeof thunk);
console.log('typeof configureStore:', typeof configureStore);

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

test('renders loading state when posts are loading', () => {
  const initialState = {
    posts: {
      posts: [],
      loading: true,
      error: null,
      comments: {},
      loadingComments: {},
      votes: {}
    }
  };

  const store = mockStore(initialState);

  render(
    <Provider store={store}>
      <Posts subreddit="pics" />
    </Provider>
  );

  expect(screen.getByText(/loading posts/i)).toBeInTheDocument();
});
