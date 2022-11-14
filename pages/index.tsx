import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import GenreList from '../components/GenreList';
import styles from '../styles/Home.module.css';
import { IGenre } from '../types';
import { useGenres, usePopularMovies } from '../utils/tmdb';
import MovieSummaryList from '../components/MovieSummaryList';

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState<IGenre>();

  const { genres, isGenresLoading, isGenresError } = useGenres();
  const { movies, isMoviesLoading, isMoviesError } = usePopularMovies(selectedGenre?.id);

  const handleGenre = (genre?: IGenre) => {
    if (genre) {
      setSelectedGenre(genre);
    } else setSelectedGenre(undefined);
  }

  if (isGenresError || isMoviesError) return <div></div>;

  return (
    <div>
      <Head>
        <title>Movietesting</title>
        <meta name="description" content="Movietesting app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.navbar}>
        <Link href='/'>
          <span>Movietesting</span>
        </Link>
      </div>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Not your go-to place to research and review movies.
        </h1>

        {!isGenresLoading && <GenreList genres={genres} selectedGenre={selectedGenre} handleGenre={handleGenre} />}

        {!isMoviesLoading && <MovieSummaryList movies={movies}/>}
      </main>
    </div>
  );
}
