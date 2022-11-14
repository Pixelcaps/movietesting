import Image from 'next/image'
import styles from '../styles/ReviewList.module.css'
import { IReviewListProps } from '../types'

export default function ReviewList({ reviews }: IReviewListProps) {

    return (
        <div className={styles.reviewList}>
            {reviews.length > 0 ? 
                reviews.map((review, index) => 
                    <div key={index} className={styles.review}>
                        <div className={styles.reviewAuthorDetails}>
                            {review.author_details.avatar_path && 
                                <Image 
                                    className={styles.reviewAuthorAvatar}
                                    src={review.author_details.avatar_path.includes('gravatar') ?
                                        review.author_details.avatar_path.slice(1)
                                        :
                                        `https://image.tmdb.org/t/p/w92${review.author_details.avatar_path}`
                                    }
                                    alt={review.author}
                                    unoptimized={true}
                                    width={44}
                                    height={44}
                                />
                            }
                            <div className={styles.reviewAuthorNames}>
                                <div className={styles.reviewAuthorName}>{review.author}</div>
                                <div className={styles.reviewAuthorUserName}>{review.author_details.username}</div>
                            </div>
                        </div>
                        <div className={styles.reviewContent}>{review.content}</div>
                    </div>
                )
                :
                <h2>No reviews yet.</h2>
            }
        </div>
    );
}
