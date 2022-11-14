import { useState } from 'react';
import { useRouter } from 'next/router'
import Image from 'next/image'
import styles from '../../styles/Movie.module.css'
import { useMovieCredits, useMovieDetails, useMovieReviews } from '../../utils/tmdb'
import { ICredit, IGenre } from '../../types';
import cx from 'classnames';
import CreditsGrid from '../../components/CreditsGrid';
import ReviewList from '../../components/ReviewList';
import Link from 'next/link';

export async function getServerSideProps() {
    return {
        props: {},
    };
}

export default function Movie() {

    const router = useRouter();
    const { id } = router.query;
    const { movie, isMovieDetailsLoading, isMovieDetailsError } = useMovieDetails(id as string);
    const { cast, crew, isCreditsLoading, isCreditsError } = useMovieCredits(id as string);
    const { reviews, isReviewsLoading, isReviewsError } = useMovieReviews(id as string);

    const [selectedOption, setSelectedOption] = useState('cast');

    if (isMovieDetailsError || isCreditsError || isReviewsError) return <div></div>;

    return (
        <div>
            <div className={styles.navbar}>
                <Link href='/'>
                    <span>Movietesting</span>
                </Link>
            </div>
            {!isMovieDetailsLoading &&
                <div className={styles.movieDetails}>
                    <main className={styles.movieMainColumn}>
                        <div className={styles.movieMainTitle}>{movie.title}</div>
                        <div className={styles.movieMainVotes}>{movie.vote_average} • {movie.vote_count} Votes</div>
                        <div className={styles.movieMainOverview}>{movie.overview}</div>
                        <ul>
                            <li>
                                <div className={cx(styles.movieMainOption,
                                    selectedOption === 'cast' && styles.movieMainOptionSelected)}
                                    onClick={() => setSelectedOption('cast')}
                                >
                                    Cast
                                </div>
                            </li>
                            <li>
                                <div className={cx(styles.movieMainOption,
                                    selectedOption === 'crew' && styles.movieMainOptionSelected)}
                                    onClick={() => setSelectedOption('crew')}
                                >
                                    Crew
                                </div>
                            </li>
                            <li>
                                <div className={cx(styles.movieMainOption,
                                    selectedOption === 'reviews' && styles.movieMainOptionSelected)} 
                                    onClick={() => setSelectedOption('reviews')}
                                >
                                    Reviews
                                </div>
                            </li>
                        </ul>
                        {
                            (selectedOption === 'cast' && !isCreditsLoading) && <CreditsGrid credits={cast.filter((credit: ICredit) => credit.profile_path)}></CreditsGrid>
                            || (selectedOption === 'crew' && !isCreditsLoading) && <CreditsGrid credits={crew.filter((credit: ICredit) => credit.profile_path)}></CreditsGrid>
                            || (selectedOption === 'reviews' && !isReviewsLoading) && 
                                <>
                                    <h1>{movie.title} Reviews</h1>
                                    <ReviewList reviews={reviews}></ReviewList>
                                </>
                        }
                    </main>
                    <aside className={styles.movieAsideColumn}>
                        <Image
                            className={styles.movieAsidePoster}
                            src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} 
                            alt={movie.title}
                            unoptimized={true}
                            width={300}
                            height={450}
                        />
                        <div className={styles.movieAsideDetails}>
                            <div className={styles.movieAsideVotes}>
                                <div className={styles.movieAsideVoteAverage}>{movie.vote_average}</div>
                                <div className={styles.movieAsideVoteCountText}>Vote average from {movie.vote_count} votes</div>
                            </div>
                            <div>
                                <div className={styles.movieAsideDetailsRow}>
                                    <div className={styles.movieAsideProperty}>Genres</div>
                                    <div className={styles.movieAsideValue}>{movie.genres.map((genre: IGenre) => genre.name).join(', ')}</div>
                                </div>
                                <div className={styles.movieAsideDetailsRow}>
                                    <div className={styles.movieAsideProperty}>Status</div>
                                    <div className={styles.movieAsideValue}>{movie.status}</div>
                                </div>
                                <div className={styles.movieAsideDetailsRow}>
                                    <div className={styles.movieAsideProperty}>Runtime</div>
                                    <div className={styles.movieAsideValue}>{movie.runtime}</div>
                                </div>
                                <div className={styles.movieAsideDetailsRow}>
                                    <div className={styles.movieAsideProperty}>Release Date</div>
                                    <div className={styles.movieAsideValue}>{movie.release_date}</div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            }
        </div>
    );
}
