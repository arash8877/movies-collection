import Image from "next/image";

export async function getStaticPaths() {
  try {
    const data = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=dce76334c2564193f3f9aad8edb50238"
    );
    const res = await data.json();

    if (!res.results) {
      throw new Error("No results in API response");
    }

    return {
      paths: res.results.slice(0, 10).map((movie) => ({
        params: { movie: String(movie.id) }, 
      })),
      fallback: false,
    };
  } catch (error) {
    console.error(error);
    return { paths: [], fallback: false };
  }
}

export async function getStaticProps({ params }) {
  const { movie } = params;
  const imagePath = "https://image.tmdb.org/t/p/original";

  try {
    const data = await fetch(
      `https://api.themoviedb.org/3/movie/${movie}?api_key=dce76334c2564193f3f9aad8edb50238`
    );
    const res = await data.json();

    if (!res || res.success === false) {
      throw new Error(`Failed to fetch movie with ID: ${movie}`);
    }

    return {
      props: { movieData: res, imagePath },
    };
  } catch (error) {
    console.error("Error fetching movie data:", error);
    return {
      notFound: true, // show 404 page
    };
  }
}

export default function MovieDetail({ movieData, imagePath }) {
  return (
    <div className="max-w-4xl m-auto">
      <div>
        <h2 className="text-2xl">{movieData.title}</h2>
        <h2 className="text-lg">{movieData.release_date}</h2>
        <h2 className="text-sm">Rating: {movieData.vote_count}</h2>
        <h2 className="bg-green-600 inline-block my-2 py-2 px-4 text-sm rounded">
          {movieData.status}
        </h2>
        {movieData.backdrop_path ? (
          <Image
            src={imagePath + movieData.backdrop_path}
            className="my-12 w-full rounded"
            width={1000}
            height={1000}
            alt={movieData.title}
            priority
          />
        ) : (
          <p className="italic text-gray-500">No image available</p>
        )}

        {movieData.overview}
      </div>
    </div>
  );
}
