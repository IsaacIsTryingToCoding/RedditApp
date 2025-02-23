import React from 'react';
import './Sidebar.css';

const Sidebar = ({ onSelectSubreddit, className }) => {
  const subreddits = [
    'html',
    'css',
    'javascript',
    'reactjs',
    'webdev',
    'frontend',
    'programming'
  ];

  return (
    <aside className={`sidebar ${className}`}>
      <h2 className="sidebar-title">Frontend related</h2>
      <ul className="sidebar-list">
        {subreddits.map((subreddit) => (
          <li
            key={subreddit}
            className="sidebar-item"
            onClick={() => onSelectSubreddit(subreddit)}
          >
            r/{subreddit}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
