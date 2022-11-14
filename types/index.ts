export interface IGenre {
    id: number,
    name: string
}

export interface IGenreListProps {
    genres: IGenre[],
    selectedGenre: IGenre | undefined,
    handleGenre: Function
}

export interface IMovie {
    poster_path: string | null,
    adult: boolean,
    overview: string,
    release_date: string,
    genre_ids: number[],
    id: number,
    original_title: string,
    original_language: string,
    title: string,
    backdrop_path: string | null,
    popularity: number,
    vote_count: number,
    video: boolean,
    vote_average: number
}

export interface IMovieSummaryListProps {
    movies: IMovie[]
}

export interface ICredit {
    adult: boolean,
    gender: number,
    id: number,
    known_for_department: string,
    name: string,
    original_name: string,
    popularity: number,
    profile_path: string,
    cast_id?: number,
    character?: string,
    credit_id: string,
    order?: number,
    department?: string,
    job?: string
}

export interface ICreditsGridProps {
    credits: ICredit[]
}

export interface IAuthorDetails {
    name: string,
    username: string,
    avatar_path: string,
    rating: number
}

export interface IReview {
    author: string,
    author_details: IAuthorDetails,
    content: string,
    created_at: string,
    id: string,
    updated_at: string,
    url: string
}

export interface IReviewListProps {
    reviews: IReview[]
}

