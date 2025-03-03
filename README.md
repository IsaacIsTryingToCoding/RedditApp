# RedditApp

Hello everyone! RedditApp is a React and Redux application that fetches posts and comments from the Reddit API. Users can view posts, search for subreddits, vote on posts, and toggle comments. The application is fully responsive and is deployed directly on GitHub.

---

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

### `npm run eject`

**Note:** This is a one-way operation. Once you `eject`, you can't go back!  
If you're not satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

---

## Project Overview

**RedditApp** is a React and Redux application that allows users to fetch posts and comments from Reddit. The key functionalities include:

- **Fetching and displaying posts** from any chosen subreddit.
- **Upvote and downvote** functionality.
- **Toggle to view comments** for each post.
- **Search bar** to switch between subreddits.
- **Responsive design**: a navbar with a hamburger menu and a sidebar for desktop.
- **Error handling**: displays error messages for invalid subreddits or failed fetches.

---

## Live Application

The application is deployed directly on GitHub.  
[View the app online](https://github.com/IsaacIsTryingToCoding/RedditApp.git)  

---

## Project Structure

reddit-client/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── Sidebar.js
│   │   ├── PostDetails.js
│   │   └── SearchBar.js
│   ├── store/
│   │   ├── postsSlice.js
│   │   └── store.js
│   ├── styles/
│   │   ├── variables.css
│   │   └── (other CSS files)
│   ├── App.js
│   ├── App.css
│   ├── index.js
│   └── (other files)
├── package.json
└── README.md

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/IsaacIsTryingToCoding/RedditApp.git
   cd RedditApp

2. **Install dependencies:**
    npm install

3. **Run the app in development mode:**
    npm start
    Open http://localhost:3000 to view it in your browser.

4. **Build for production:**
    npm run build
    This will create an optimized production build in the build/ folder.

---

## Technologies
- React
- Redux (or Redux Toolkit)
- React Router
- Redux Thunk for asynchronous actions
- Jest & React Testing Library for testing
- CSS (using CSS variables for theming)

---

## Testing
npm test
Tests cover components such as SearchBar, Posts, and others using Jest and React Testing Library.

---

## How It Works
1. Navbar: Displays the app logo, a search bar, and a hamburger menu (which toggles the sidebar on mobile).
2. Sidebar: Lists popular subreddits; clicking a subreddit fetches new posts.
3. Posts: Fetches and displays posts from the selected subreddit. Users can upvote/downvote, read the post  content, and toggle comments.
4. PostDetails: Shows a detailed view of a selected post along with its comments.
5. SearchBar: Allows users to enter a subreddit name to update the feed.

---

## Future Improvements
- Enhanced error handling and user feedback.
- Additional animations and transitions for a smoother user experience.
- Pagination or infinite scrolling.
- Progressive Web App (PWA) enhancements.
- Continuous Integration/Continuous Deployment (CI/CD) setup for automated deployment.

## Author
Isaac - @IsaacIsTryingToCoding(https://github.com/IsaacIsTryingToCoding)

