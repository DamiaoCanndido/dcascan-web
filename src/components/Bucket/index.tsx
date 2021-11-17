import styles from './styles.module.scss';
import { Dropzone } from '../Dropzone';
import { useRouter } from "next/router";
import { bucketProps } from '../../protocols/protocols';
import { FolderItem } from '../FolderItem';
import React, { useEffect, useState } from 'react';
import { FileItem } from '../FileItem';
import { OptionsBar } from '../OptionsBar';
import recoverUser from '../../services/recoverUser';


export default function Bucket({ buckets }: bucketProps) {
    const router = useRouter()

    const [isCheckAll, setIsCheckAll] = useState(false);
    const [allIdsFolder, setAllIdsFolder] = useState<string[]>([]);
    const [allIdsFiles, setAllIdsFiles] = useState<string[]>([]);
    const [disableOptionsBar, setDisableOptionsBar] = useState(false);

    const [isSuperUser, setIsSuperUser] = useState(false);
    
    useEffect(() => {
        const recordUser = async () => {
            const user = await recoverUser()
            setIsSuperUser(user.is_superuser)       
        }
        recordUser()
    }, [])

    useEffect(() => {
        setAllIdsFolder([]);
        setAllIdsFiles([]);
    }, [router.query.uuid])


    useEffect(() => {
        if ((allIdsFolder.length + allIdsFiles.length) > 0) {
            setDisableOptionsBar(true)
        } else {
            setDisableOptionsBar(false)
            setIsCheckAll(false);
        }
    }, [allIdsFolder, allIdsFiles])


    return (
        <div className={styles.homePage}>
            {isSuperUser && <Dropzone/>}
            {isSuperUser && disableOptionsBar && 
                <OptionsBar 
                    allIdsFolder={allIdsFolder} 
                    allIdsFiles={allIdsFiles}
                    setAllIdsFolder={setAllIdsFolder}
                    setAllIdsFiles={setAllIdsFiles}
                    buckets={buckets}
                />
            }
            <section className={styles.myBucket}>
                <table cellSpacing={0}>
                    <thead>
                        <tr>
                            {isSuperUser && 
                                <th>
                                    <input
                                        type="checkbox"
                                        disabled={false}
                                        checked={isCheckAll}
                                        onChange={() => setIsCheckAll(!isCheckAll)}
                                    />
                                </th>
                            }
                            <th>Tipo</th>
                            <th>Nome</th>
                            <th>Modificado em</th>
                            <th>Criado em</th>
                            <th>Tamanho</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {buckets.map(bucket => {
                            if (!bucket.file) {
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
                                        setAllIdsFolder={setAllIdsFolder}
                                        setAllIdsFiles={setAllIdsFiles}                    
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
                                        size={bucket.size}
                                        name={bucket.name}
                                        file={bucket.file}
                                        checkAll={isCheckAll}
                                        setAllIdsFiles={setAllIdsFiles}
                                        allIdsFiles={allIdsFiles} 
                                        setAllIdsFolder={setAllIdsFolder}                                    
                                    /> 
                                )
                            }
                        })}
                    </tbody>
                </table>
            </section>
            <section className={styles.myMobileBucket}>
                {buckets.map(bucket => {
                    if (!bucket.file) {
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
                                setAllIdsFolder={setAllIdsFolder}
                                setAllIdsFiles={setAllIdsFiles}                    
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
                                size={bucket.size}
                                name={bucket.name}
                                file={bucket.file}
                                checkAll={isCheckAll}
                                setAllIdsFiles={setAllIdsFiles}
                                allIdsFiles={allIdsFiles} 
                                setAllIdsFolder={setAllIdsFolder}                                    
                            /> 
                        )
                    }
                })}
            </section>
        </div>
    )
}

