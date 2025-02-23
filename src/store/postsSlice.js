import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPosts } from '../FetchPosts';

// Fetch posts thunk
export const fetchPostsThunk = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit, thunkAPI) => {
    try {
      return await fetchPosts(subreddit);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Fetch comments thunk
export const fetchCommentsThunk = createAsyncThunk(
  'posts/fetchComments',
  async (permalink) => {
    const response = await fetch(`https://www.reddit.com${permalink}.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch comments');
    }
    const json = await response.json();
    return { permalink, comments: json[1].data.children.map((child) => child.data) };
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
    comments: {},
    loadingComments: {},
    votes: {},
  },
  reducers: {
    clearComments: (state, action) => {
      delete state.comments[action.payload];
    },
    handleUpvote: (state, action) => {
      const postId = action.payload;
      const currentVote = state.votes[postId] || 0;
      if (currentVote === 1) {
        // Già upvotato: non fare nulla
        return;
      } else if (currentVote === -1) {
        // Se era downvotato, il click su upvote annulla il voto (ritorna a default)
        state.votes[postId] = 0;
      } else {
        // Se era 0, applica l'upvote
        state.votes[postId] = 1;
      }
    },
    handleDownvote: (state, action) => {
      const postId = action.payload;
      const currentVote = state.votes[postId] || 0;
      if (currentVote === -1) {
        // Già downvotato: non fare nulla
        return;
      } else if (currentVote === 1) {
        // Se era upvotato, il click su downvote annulla il voto (ritorna a default)
        state.votes[postId] = 0;
      } else {
        // Se era 0, applica il downvote
        state.votes[postId] = -1;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPostsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPostsThunk.rejected, (state, action) => {
        state.loading = false;
        // Se action.payload è falsy, imposta comunque il messaggio di default
        state.error = action.payload || "Subreddit not found";
      })
      .addCase(fetchCommentsThunk.pending, (state, action) => {
        state.loadingComments[action.meta.arg] = true;
      })
      .addCase(fetchCommentsThunk.fulfilled, (state, action) => {
        state.loadingComments[action.payload.permalink] = false;
        state.comments[action.payload.permalink] = action.payload.comments;
      })
      .addCase(fetchCommentsThunk.rejected, (state, action) => {
        state.loadingComments[action.meta.arg] = false;
      });
  },
});

export const { clearComments, handleUpvote, handleDownvote } = postsSlice.actions;
export default postsSlice.reducer;
