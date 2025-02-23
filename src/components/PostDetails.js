import React, { useState, useEffect } from 'react';

import { getPostComments } from '../api/api';
import './PostDetails.css';

const PostDetails = ({ post }) => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  
    useEffect(() => {
      if (!post) return;
      // Debug avanzato
      console.log("Valore di `post` ricevuto in PostDetails:", post);
      console.log("URL dell'immagine:", post.url); // Log aggiunto per verifica
    }, [post]);
  
    useEffect(() => {
      const fetchComments = async () => {
        try {
          const postComments = await getPostComments(post.permalink);
          setComments(postComments);
        } catch (err) {
          setError('Error during fetching comments');
        } finally {
          setLoading(false);
        }
      };
  
      if (post) {
        fetchComments();
      }
    }, [post]);
  
    if (!post) {
      return <div>Post non trovato.</div>;
    }

    const getImageUrl = () => {
        if (post.preview && post.preview.images && post.preview.images.length > 0) {
          return post.preview.images[0].source.url;
        }
        return null;
      };
    
      const imageUrl = getImageUrl();
  
    return (
      <div className="post-details">        
        <h3>{post.title}</h3>
        <p>Author: {post.author}</p>
        <p>Published: {new Date(post.created_utc * 1000).toLocaleString()}</p>
  
        {/* Sezione immagine del post */}
        <div className="post-image-section">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Post Preview"
            className="post-thumbnail"
          />
        ) : (
          <div className="no-thumbnail">No Image</div>
        )}
      </div>
  
        <p>{post.selftext || "No content available"}</p>
        <h3>{comments.length} comments</h3>
        {loading && <p>Loading comments...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul className="comments-list">
          {comments.map((comment, index) => (
            <li key={index} className="comment-item">
              <p>{comment.body}</p>
              <small>Author: {comment.author}</small>
            </li>
          ))}
        </ul>
      </div>
    );
  };
  
  export default PostDetails;
  
