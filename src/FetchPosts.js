export const fetchPosts = async (subreddit) => {
  const response = await fetch(`https://www.reddit.com/r/${subreddit}.json`);
  if (!response.ok) {
    throw new Error("Subreddit not found");
  }
  const json = await response.json();
  if (!json.data || !json.data.children.length) {
    throw new Error("Subreddit not found");
  }
  return json.data.children.map((child) => child.data);
};

export const fetchPostComments = async (permalink) => {
  try {
    const response = await fetch(`https://www.reddit.com${permalink}.json`);
    const json = await response.json();
    return json[1].data.children.map((child) => child.data);
  } catch (error) {
    console.error("Errore nel recupero dei commenti:", error);
    return [];
  }
};
