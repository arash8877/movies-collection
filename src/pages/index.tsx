import React, { useEffect, useState } from "react";
// import Link from "next/link";
import { Montserrat } from "next/font/google";
import Movie from "../components/Movie";

const montserrat = Montserrat({
  weight: ["400", "700", "900"],
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const Movies = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/popular?api_key=dce76334c2564193f3f9aad8edb50238`
      );
      const data = await response.json();
      setMovies(data.results);
    };

    fetchMovies();
  }, []);

  if (!movies) {
    return <div>Loading...</div>;
  }

  return (
    <main>
      <main>
        <div className="grid gap-16 grid-cols-fluid">
          {movies.map((movie: any) => (
            <Movie
              key={movie.id}
              id={movie.id}
              title={movie.original_title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              rate={movie.vote_count}
            />
          ))}
        </div>
      </main>
    </main>
  );
};

export default Movies;
