import Image from 'next/image'
import styles from '../styles/CreditsGrid.module.css'
import { ICreditsGridProps } from '../types'

export default function CreditsGrid({ credits }: ICreditsGridProps) {
    return (
        <div className={styles.creditsGrid}>
            {credits.map((credit, index) => 
                <div key={index}>
                    <Image
                        src={`https://image.tmdb.org/t/p/w154${credit.profile_path}`} 
                        alt={credit.name}
                        unoptimized={true}
                        width={154}
                        height={231}
                    />
                    <div className={styles.creditName}>{credit.name}</div>
                    {credit.character && <div className={styles.creditCharacter}>{credit.character}</div>}
                    {credit.job && <div className={styles.creditJob}>{credit.job}</div>}
                </div>
            )}
        </div>
    );
}
