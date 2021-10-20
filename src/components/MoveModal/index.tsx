import { FormEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { AiFillHome, AiOutlineClose } from 'react-icons/ai';
import { folderFileTypes } from '../../protocols/protocols';
import { MoveModalItem } from '../MoveModaItem';
import { api } from '../../services/api';
import router from 'next/router';

type modalFunc = {
    modalFunc: () => void;
    id?: string;
    buckets: folderFileTypes[];
    allIdsFolder: string[];
    allIdsFiles: string[];
    setAllIdsFolder: React.Dispatch<React.SetStateAction<string[]>>;
    setAllIdsFiles: React.Dispatch<React.SetStateAction<string[]>>;
}

export function MoveModal({ 
    modalFunc, 
    id = 'moveModal',
    buckets,
    allIdsFiles,
    allIdsFolder,
    setAllIdsFolder,
    setAllIdsFiles,
}: modalFunc) {

    const [defaultBuckets, setDefaultBuckets] = useState(buckets);
    const [folderSelected, setFolderSelected] = useState(null);
    
    // Não carregar as pastas marcadas para não serem movidas para elas mesmas.
    useEffect(() => {
        // console.log(allIdsFolder)
        const filteredBuckets = defaultBuckets.filter(bucket => !allIdsFolder.includes(bucket.id))
        setDefaultBuckets(filteredBuckets)
    }, [allIdsFolder])

    const handleHomeSubmit = async (e: FormEvent) => {
        let response: folderFileTypes[];
        e.preventDefault();
        try {
            response = await (await api.get(`/bucket/`)).data
            setDefaultBuckets(response)
            setFolderSelected(null);
        } catch (error) {
            router.replace('login')
        }
    }

    const handleCutSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            allIdsFolder.forEach(async cuts => {
                await api.patch(`/folder/${cuts}`, {
                    root: folderSelected
                })
                setAllIdsFolder([])
                setAllIdsFiles([])
                router.replace(router.asPath)
                modalFunc()
            })
        } catch (error) {
            router.replace('login')
        }
    }

    async function handleOutSideClick(e: FormEvent) {
        if ((e.target as Element).id === id) modalFunc() 
    }

    return (
        <div id={id} className={styles.shadowZone} onClick={handleOutSideClick}>
            <div className={styles.modalContainer}>
                <div className={styles.header}>
                    <button onClick={handleHomeSubmit}>
                        <AiFillHome size='1.5rem' color='var(--black)'/>
                    </button>
                    <button onClick={handleCutSubmit} className={styles.moveButton}>
                        Mover
                    </button>
                    <button onClick={modalFunc}>
                        <AiOutlineClose size='1.5rem' color='var(--black)'/>
                    </button>
                </div>
                {defaultBuckets.map(bucket => {
                    if (bucket.file === undefined){
                        return (
                            <MoveModalItem 
                                key={bucket.id}
                                id={bucket.id} 
                                owner={bucket.owner} 
                                created_at={bucket.created_at} 
                                updated_at={bucket.updated_at} 
                                name={bucket.name} 
                                folderSelected={folderSelected}
                                setFolderSelected={setFolderSelected}
                                defaultBuckets={defaultBuckets}
                                setDefaultBuckets={setDefaultBuckets}
                            />
                        )
                    }
                })}
            </div>
        </div>
    )
}