import axios from 'axios';
import useSWR from 'swr';

const fetcher = (url: string) => axios.get(url).then(res => res.data)

export function useGenres() {
    const { data, error } = useSWR(`${process.env.TMDB_BASE_API_URL}/genre/movie/list?api_key=${process.env.TMDB_API_KEY}`, fetcher)

    return {
      genres: data?.genres,
      isGenresLoading: !error && !data,
      isGenresError: error
    }
}

export function usePopularMovies(genres?: number) {
    let url = '';
    genres ? 
      url = `${process.env.TMDB_BASE_API_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc&with_genres=${genres}`
      :
      url = `${process.env.TMDB_BASE_API_URL}/discover/movie?api_key=${process.env.TMDB_API_KEY}&sort_by=popularity.desc`;
    
    const { data, error } = useSWR(url, fetcher)
  
    return {
      movies: data?.results,
      isMoviesLoading: !error && !data,
      isMoviesError: error
    }
}

export function useMovieDetails(movieId: string) {
  const { data, error } = useSWR(`${process.env.TMDB_BASE_API_URL}/movie/${movieId}?api_key=${process.env.TMDB_API_KEY}`, fetcher)

  return {
    movie: data,
    isMovieDetailsLoading: !error && !data,
    isMovieDetailsError: error
  }
}

export function useMovieCredits(movieId: string) {
  const { data, error } = useSWR(`${process.env.TMDB_BASE_API_URL}/movie/${movieId}/credits?api_key=${process.env.TMDB_API_KEY}`, fetcher)

  return {
    cast: data?.cast,
    crew: data?.crew,
    isCreditsLoading: !error && !data,
    isCreditsError: error
  }
}

export function useMovieReviews(movieId: string) {
  const { data, error } = useSWR(`${process.env.TMDB_BASE_API_URL}/movie/${movieId}/reviews?api_key=${process.env.TMDB_API_KEY}`, fetcher)
  
  return {
    reviews: data?.results,
    isReviewsLoading: !error && !data,
    isReviewsError: error
  }
}
