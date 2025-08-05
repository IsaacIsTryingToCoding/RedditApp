export const API_ROOT = ""; 

// 1. Recupera i post di un subreddit specifico
export const getSubredditPosts = async (subreddit) => {
    const response = await fetch(`${API_ROOT}/r/${subreddit}.json`); // Correzione del percorso
    const json = await response.json();

    console.log("Dati ricevuti da getSubredditPosts:", json);

    return json.data.children.map((post) => post.data);
};

// 2. Recupera tutti i subreddit
export const getSubreddits = async () => {
    const response = await fetch(`${API_ROOT}/subreddits.json`);
    const json = await response.json();

    console.log("Dati ricevuti da getSubreddits:", json);

    return json.data.children.map((subreddit) => subreddit.data);
};

// 3. Recupera i commenti di un post specifico
export const getPostComments = async (permalink) => {
  try {
    const response = await fetch(`${API_ROOT}${permalink}.json`);
    if (!response.ok) {
      throw new Error(`Errore nella risposta: ${response.status}`);
    }
    const json = await response.json();

    // Verifica che la struttura dei dati sia valida
    if (json[1] && json[1].data) {
      console.log('Dati ricevuti da getPostComments:', json[1].data);
      return json[1].data.children.map((comment) => comment.data);
    } else {
      throw new Error('Struttura dei dati non valida.');
    }
  } catch (error) {
    console.error('Errore durante il recupero dei commenti:', error.message);
    throw error; // Propaga l'errore per gestirlo nel componente
  }
};


// 4. Recupera i post di un subreddit per la visualizzazione
export const fetchPosts = async (subreddit = "all") => {
    const response = await fetch(`/r/${subreddit}.json`);
    const json = await response.json();
    console.log("Dati ricevuti da fetchPosts:", json);

    return json.data.children.map(({ data }) => data);
    };

