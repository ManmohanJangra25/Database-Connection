import React, {useCallback, useEffect, useState} from 'react';

import MoviesList from './components/MoviesList';
import SpinLoader from './loading.gif';
import './App.css';

function App() {
  const [dummyMovies, setDummyMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMoviesHandler = useCallback(async() => {
    setIsLoading(true);
    try{
      const response = await fetch('https://swapi.py4e.com/api/films/');
      if(!response.ok) {
        throw new Error('Something went wrong!');
      }

      const data = await response.json();
      const transformedData = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          releaseDate: movieData.release_date,
          openingText: movieData.opening_crawl
        };
      })
      setTimeout(() => {
        setDummyMovies(transformedData);
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      alert(error.message);
    }
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {isLoading && <img src={SpinLoader} alt="loading" height="50" width="50" />}
        {!isLoading && dummyMovies.length === 0 && <p>Found No Movies</p>}
        {!isLoading && dummyMovies.length > 0 && <MoviesList movies={dummyMovies} />}
      </section>
    </React.Fragment>
  );
}

export default App;
