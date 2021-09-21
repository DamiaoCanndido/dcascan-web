import styles from './styles.module.scss';
import Link from 'next/link';
import { bucketProps } from '../../protocols/protocols';
import Folder from '../Folder';
import File from '../File';


export default function Bucket({ buckets }: bucketProps) {
    return (
        <div className={styles.homePage}>
            <section className={styles.myBucket}>
                <ul>
                    {buckets.map(bucket => {
                        if (bucket.file === undefined) {
                            return (
                                <Link href='#'>
                                    <a>
                                        <li key={bucket.id}>
                                            <Folder 
                                                id={bucket.id} 
                                                owner={bucket.owner} 
                                                created_at={bucket.created_at} 
                                                updated_at={bucket.updated_at} 
                                                name={bucket.name}
                                                root={bucket.root}
                                            />
                                        </li>
                                    </a>
                                </Link>
                            )
                        } else {
                            return (
                                <Link href='#'>
                                    <a>
                                        <li key={bucket.id}>
                                            <File 
                                                id={bucket.id} 
                                                owner={bucket.owner} 
                                                created_at={bucket.created_at} 
                                                updated_at={bucket.updated_at} 
                                                name={bucket.name}
                                                file={bucket.file}
                                                key={bucket.key}
                                                folder={bucket.folder}
                                            />
                                        </li>
                                    </a>
                                </Link>
                            )
                        }
                    })}
                </ul>
            </section>
        </div>
    )
}