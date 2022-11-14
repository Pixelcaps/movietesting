import styles from '../styles/GenreList.module.css'
import { IGenreListProps } from '../types'

export default function GenreList({ genres, selectedGenre,  handleGenre}: IGenreListProps) {

    return (
        <div className={styles.genreList}>
            {selectedGenre ? 
                <>
                    <div className={styles.genreListBackToAll} onClick={() => handleGenre()}>&#8592; Back to all genres</div>
                    <button 
                        className={styles.genreButtonSelected} 
                        key={selectedGenre.id}
                        onClick={() => handleGenre(selectedGenre)}
                    >
                    {selectedGenre.name}
                    </button>
                </>
                :
                genres.map((genre: any) => 
                    <button 
                        className={styles.genreButton} 
                        key={genre.id}
                        onClick={() => handleGenre(genre)}
                    >
                    {genre.name}
                    </button>
                )
            }
        </div>
    );
}
