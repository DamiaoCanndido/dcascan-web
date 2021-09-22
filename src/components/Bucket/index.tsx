import styles from './styles.module.scss';
import Link from 'next/link';
import { bucketProps } from '../../protocols/protocols';
import Folder from '../Folder';
import { AiFillFolder, AiFillFilePdf } from "react-icons/ai";
import File from '../File';


export default function Bucket({ buckets }: bucketProps) {
    return (
        <div className={styles.homePage}>
            <section className={styles.myBucket}>
                <table cellSpacing={0}>
                    <thead>
                        <th></th>
                        <th>Nome</th>
                        <th>Modificado em</th>
                        <th>Criado em</th>
                    </thead>
                    <tbody>
                        {buckets.map(bucket => {
                            if (bucket.file === undefined) {
                                return (
                                    <tr key={bucket.id}>
                                        <td>
                                            <AiFillFolder size='3rem' color='var(--folder)'/>
                                        </td>
                                        <td>
                                            <Link href='#'>
                                                <a>
                                                {bucket.name}
                                                </a>
                                            </Link>
                                        </td>
                                        <td>{bucket.updated_at}</td>
                                        <td>{bucket.created_at}</td>
                                    </tr>   
                                )
                            } else {
                                return (
                                    <tr key={bucket.id}>
                                        <td>
                                            <AiFillFilePdf size='3rem' color='var(--pdf)'/>
                                        </td>
                                        <td>
                                            <Link href='#'>
                                                <a>
                                                    {bucket.name}
                                                </a>
                                            </Link>
                                        </td>
                                        <td>{bucket.updated_at}</td>
                                        <td>{bucket.created_at}</td>
                                    </tr>  
                                )
                            }
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

/*
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
*/