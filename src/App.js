import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Posts from './Posts';
import PostDetails from './components/PostDetails';
import SearchBar from './components/SearchBar';
import './App.css';
import './styles/variables.css';

function App() {
  const { posts, loading, error } = useSelector((state) => state.posts);
  console.log("Redux error state:", error); // Debug

  const [selectedSubreddit, setSelectedSubreddit] = useState('pics');
  const [selectedPost, setSelectedPost] = useState(null);

  // Stato per controllare l’apertura/chiusura sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Apre/chiude sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Quando si seleziona un subreddit dalla sidebar
  const handleSelectSubreddit = (subreddit) => {
    setSelectedSubreddit(subreddit);
    // Chiude la sidebar
    setSidebarOpen(false);
  };

  // Quando si effettua una ricerca
  const handleSearch = (query) => {
    setSelectedSubreddit(query);
  };

  // Reset dello scroll ogni volta che cambia subreddit
  useEffect(() => {
    const container = document.querySelector('.centralizing-post');
    if (container) {
      container.scrollTop = 0;
    }
  }, [selectedSubreddit]);

  return (
    <Router>
      <div className="App">
        {/* NAVBAR */}
        <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen}>
          <SearchBar onSearch={handleSearch} />
        </Navbar>

        {/* ERROR HANDLING */}
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="content">
          {/* SIDEBAR */}
          <Sidebar 
            className={sidebarOpen ? 'open' : ''} 
            onSelectSubreddit={handleSelectSubreddit} 
          />

          {/* POSTS */}
          <div className="content-wrapper">
            <h1 className="content-title">r/{selectedSubreddit}</h1>
            <div className="centralizing-post">
              <div className="subreddits-post">
                <Routes>
                  <Route
                    path="/"
                    element={
                      <Posts 
                        subreddit={selectedSubreddit} 
                        setSelectedPost={setSelectedPost} 
                      />
                    }
                  />
                  <Route
                    path="/post/:postId"
                    element={
                      selectedPost ? (
                        <PostDetails post={selectedPost} />
                      ) : (
                        <Navigate to="/" replace />
                      )
                    }
                  />
                </Routes>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

