import styles from './styles.module.scss';
import Link from 'next/link';
import { Dropzone } from '../Dropzone';
import { bucketProps } from '../../protocols/protocols';
import { AiFillFolder, AiFillFilePdf } from "react-icons/ai";
import { FloatFolderButton } from '../FloatFolderButton';


export default function Bucket({ buckets }: bucketProps) {
    return (
        <div className={styles.homePage}>
            <Dropzone/>
            <section className={styles.myBucket}>
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nome</th>
                            <th>Modificado em</th>
                            <th>Criado em</th>
                        </tr>
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
                                            <Link href={`/home/${bucket.id}`}>
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
                                            <Link href={bucket.file}>
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

