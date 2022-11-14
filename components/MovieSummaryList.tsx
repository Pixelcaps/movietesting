import Link from 'next/link';
import Image from 'next/image';
import { Fragment } from 'react';
import styles from '../styles/MovieSummaryList.module.css';
import { IMovieSummaryListProps } from '../types';

export default function MovieSummaryList({ movies }: IMovieSummaryListProps) {

    return (
        <div className={styles.movieList}>
            {movies.map((movie: any) =>
              <Fragment key={movie.id}>
                <Image
                    className={styles.movieSummaryPoster}
                    src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    alt={movie.title}
                    unoptimized={true}
                    width={300}
                    height={450}
                />
                <div className={styles.movieSummary}>
                    <Link href={`/movies/${movie.id}`}>
                        <div className={styles.movieSummaryTitle}>{movie.original_title}</div>
                    </Link>
                    <div className={styles.movieSummaryVotes}>{movie.vote_average} • {movie.vote_count} Votes</div>
                    <div>{movie.overview}</div>
                </div>
              </Fragment>
            )}
        </div>
    );
}
