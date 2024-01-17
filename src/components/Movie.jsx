import Link from "next/link";
import Image from "next/image";

export default function Movie({id, title, poster_path, release_date, rate}) {
    const imagePath = 'https://image.tmdb.org/t/p/original';
    return(
        <div>
            <h1 className="text-xl line-clamp-1">{title}</h1>
            <h1 className="text-md">{release_date}</h1>
            <h2 className="text-sm pb-6">Rating: {rate}</h2>
            <Link href={`/${id}`}>
                <Image src={imagePath + poster_path} width={800} height={800} alt={title}/>
            </Link>
        </div>
    )
}