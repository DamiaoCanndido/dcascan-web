import styles from './styles.module.scss';
import { Dropzone } from '../Dropzone';
import { bucketProps } from '../../protocols/protocols';
import { FolderItem } from '../FolderItem';
import React, { useState } from 'react';
import { FileItem } from '../FileItem';


export default function Bucket({ buckets }: bucketProps) {

    const [isCheckAll, setIsCheckAll] = useState(false);

    return (
        <div className={styles.homePage}>
            <Dropzone/>
            <section className={styles.myBucket}>
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    disabled={false}
                                    onChange={() => setIsCheckAll(!isCheckAll)}
                                />
                            </th>
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
                                        checkAll={isCheckAll}
                                    />
                                )
                            } else {
                                return (
                                    <FileItem 
                                        key={bucket.id}
                                        id={bucket.id} 
                                        owner={bucket.owner} 
                                        created_at={bucket.created_at} 
                                        updated_at={bucket.updated_at} 
                                        name={bucket.name} 
                                        file={bucket.file}
                                        checkAll={isCheckAll}
                                    /> 
                                )
                            }
                        })}
                    </tbody>
                </table>
            </section>
        </div>
    )
}

