import styles from './styles.module.scss';
import Link from 'next/link';
import { Dropzone } from '../Dropzone';
import { bucketProps } from '../../protocols/protocols';
import { AiFillFilePdf, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { FolderItem } from '../FolderItem';


export default function Bucket({ buckets }: bucketProps) {
    return (
        <div className={styles.homePage}>
            <Dropzone/>
            <section className={styles.myBucket}>
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Tipo</th>
                            <th>Nome</th>
                            <th>Modificado em</th>
                            <th>Criado em</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {buckets.map(bucket => {
                            if (bucket.file === undefined) {
                                return (
                                    <FolderItem 
                                        key={bucket.id}
                                        id={bucket.id} 
                                        owner={bucket.owner} 
                                        created_at={bucket.created_at} 
                                        updated_at={bucket.updated_at} 
                                        name={bucket.name} 
                                    />
                                )
                            } else {
                                return (
                                    <tr key={bucket.id}>
                                        <td>
                                            <input
                                                className={styles.checkInput}
                                                type="checkbox"
                                                disabled={false}
                                                onChange={() => {}}
                                            />
                                        </td>
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
                                        <td>
                                            <button>
                                                <AiOutlineEdit size='2rem' color='var(--green-500)'/>
                                            </button>
                                            <button>
                                                <AiOutlineDelete size='2rem' color='var(--pdf)'/>
                                            </button>
                                        </td>
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

