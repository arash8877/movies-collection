import React, { useEffect, useState } from "react";
import Link from "next/link";

const Movies = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=dce76334c2564193f3f9aad8edb50238`
      );
      const data = await response.json();
      console.log(data);
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      {movies.map((movie) => (
        <Link href={`/movies/${movie.id}`} key={movie.id}>
          <div key={movie.id}>
            <h2>{movie.title}</h2>
            {/* Render other movie details here */}
          </div>
        </Link>
      ))}
    </main>
  );
};

export default Movies;
