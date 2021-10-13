import styles from './styles.module.scss';
import { Dropzone } from '../Dropzone';
import { bucketProps } from '../../protocols/protocols';
import { FolderItem } from '../FolderItem';
import React, { SetStateAction, useEffect, useState } from 'react';
import { FileItem } from '../FileItem';
import { OptionsBar } from '../OptionsBar';


export default function Bucket({ buckets }: bucketProps) {

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [allIdsFolder, setAllIdsFolder] = useState<string[]>([]);
    const [allIdsFiles, setAllIdsFiles] = useState<string[]>([]);
    const [disableOptionsBar, setDisableOptionsBar] = useState(false);


    useEffect(() => {
        if ((allIdsFolder.length + allIdsFiles.length) > 0) {
            setDisableOptionsBar(true)
        } else {
            setDisableOptionsBar(false)
        }
    }, [allIdsFolder, allIdsFiles])

    return (
        <div className={styles.homePage}>
            <Dropzone/>
            {disableOptionsBar && <OptionsBar/>}
            {allIdsFolder.map((e, i)=> {
                return (
                    <h3 key={i}>{e}</h3>
                )
            })}
            {allIdsFiles.map((e, i)=> {
                return (
                    <p key={i}>{e}</p>
                )
            })}
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
                                        allIdsFolder={allIdsFolder}
                                        setAllIdsFolder={setAllIdsFolder} setAllIdsFiles={function (value: SetStateAction<string[]>): void {
                                            throw new Error('Function not implemented.');
                                        } } allIdsFiles={[]}                                    
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
                                        setAllIdsFiles={setAllIdsFiles}
                                        allIdsFiles={allIdsFiles} setAllIdsFolder={function (value: SetStateAction<string[]>): void {
                                            throw new Error('Function not implemented.');
                                        } } allIdsFolder={[]}                                    
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

