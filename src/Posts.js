import React, { useState, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostsThunk, fetchCommentsThunk, handleUpvote, handleDownvote, clearComments } from './store/postsSlice';
import { FaAngleUp, FaAngleDown, FaRegComment, FaImage } from "react-icons/fa";
import './Posts.css';

const Post = ({ subreddit }) => {
  const dispatch = useDispatch();
  const { posts, loading, votes, comments, loadingComments } = useSelector((state) => state.posts);
  const [visibleComments, setVisibleComments] = useState({});

  useEffect(() => {
    dispatch(fetchPostsThunk(subreddit));
  }, [subreddit, dispatch]);

  const memoizedPosts = useMemo(() => posts, [posts]);

  const toggleComments = (permalink) => {
    if (visibleComments[permalink]) {
      setVisibleComments((prev) => ({ ...prev, [permalink]: false }));
      setTimeout(() => {
        dispatch(clearComments(permalink));
      }, 300);
    } else {
      setVisibleComments((prev) => ({ ...prev, [permalink]: true }));
      dispatch(fetchCommentsThunk(permalink));
    }
  };

  return (
    <div>
      {loading && <p>Loading posts...</p>}
      
      <ul className="posts-list">
        {memoizedPosts.map((post) => (
          <li key={post.id} className="post-item">
            <div className="post-header-votes">
              <FaAngleUp onClick={() => dispatch(handleUpvote(post.id))} />
              <p>{(votes[post.id] || 0) + post.ups}</p>
              <FaAngleDown onClick={() => dispatch(handleDownvote(post.id))} />
            </div>
            <div className="post">
              <div className="post-header">
                <h3>{post.title}</h3>
                {post.preview && post.preview.images && post.preview.images.length > 0 ? (
                  <img
                    src={post.preview.images[0].source.url.replace("&amp;", "&")}
                    alt="Post image"
                    className="post-thumbnail"
                    loading="lazy"
                  />
                ) : post.thumbnail && post.thumbnail.startsWith('http') ? (
                  <img
                    src={post.thumbnail}
                    alt="Post thumbnail"
                    className="post-thumbnail"
                    loading="lazy"
                  />
                ) : (
                  <div className="no-image">
                    <FaImage className="no-image-icon" />
                  </div>
                )}
              </div>

              
              {post.selftext && (
                <div className="post-message-container">
                  <p className="post-message">{post.selftext}</p>
                </div>
              )}

              <div className="post-info">
                <p>Author: {post.author}</p>
                <p>Published: {new Date(post.created * 1000).toLocaleString()}</p>
                <button
                  className="comments-toggle"
                  onClick={() => toggleComments(post.permalink)}
                >
                  {loadingComments[post.permalink]
                    ? "Loading comments..."
                    : visibleComments[post.permalink]
                    ? "Hide comments"
                    : (
                      <>
                        <FaRegComment className="comments-icon" /> {post.num_comments} comments
                      </>
                    )}
                </button>
              </div>
              <div className={`comments-container ${visibleComments[post.permalink] ? "show-comments" : ""}`}>
                {comments[post.permalink] && (
                  <ul className="comments-list">
                    {comments[post.permalink].map((comment, idx) => (
                      <li key={idx}>{comment.body}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Post);
