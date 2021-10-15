import { FormEvent, useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai';
import { folderFileTypes } from '../../protocols/protocols';
import { MoveModalItem } from '../MoveModaItem';

type modalFunc = {
    modalFunc: () => void;
    id?: string;
    buckets: folderFileTypes[];
    allIdsFolder: string[];
    allIdsFiles: string[];
}

export function MoveModal({ 
    modalFunc, 
    id = 'moveModal',
    buckets,
    allIdsFiles,
    allIdsFolder,
}: modalFunc) {

    const [defaultBuckets, setDefaultBuckets] = useState(buckets);
    const [folderSelected, setFolderSelected] = useState('');
    
    // Não carregar as pastas marcadas para não serem movidas para elas mesmas.
    useEffect(() => {
        const filteredBuckets = defaultBuckets.filter(bucket => !allIdsFolder.includes(bucket.id))
        setDefaultBuckets(filteredBuckets)
    }, [allIdsFolder])

    async function handleOutSideClick(e: FormEvent) {
        if ((e.target as Element).id === id) modalFunc() 
    }

    return (
        <div id={id} className={styles.shadowZone} onClick={handleOutSideClick}>
            <div className={styles.modalContainer}>
                <div className={styles.header}>
                    <button>
                        <AiOutlineArrowLeft size='1.5rem' color='var(--black)'/>
                    </button>
                    <button className={styles.moveButton}>
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
                            />
                        )
                    }
                })}
            </div>
        </div>
    )
}