import styles from './styles.module.scss';
import { MdContentCut, MdDelete } from 'react-icons/md';
import React, { FormEvent, useState } from 'react';
import { FolderModal } from '../FolderModal';
import { api } from '../../services/api';
import { useRouter } from 'next/router';
import { MoveModal } from '../MoveModal';
import { folderFileTypes } from '../../protocols/protocols';

type archiveType = {
    allIdsFiles: string[];
    allIdsFolder: string[];
    setAllIdsFolder: React.Dispatch<React.SetStateAction<string[]>>;
    setAllIdsFiles: React.Dispatch<React.SetStateAction<string[]>>;
    buckets: folderFileTypes[];
}

export function OptionsBar({ 
    allIdsFolder, 
    allIdsFiles, 
    setAllIdsFolder, 
    setAllIdsFiles,
    buckets
}: archiveType) {

    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [isModalMoveVisible, setIsModalMoveVisible] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const router = useRouter();

    const handleMoveModal = () => {
        setIsModalMoveVisible(!isModalMoveVisible);
        setIsModalDeleteVisible(false);
    }

    const handleDeleteModal = () => {
        setIsModalDeleteVisible(!isModalDeleteVisible);
        setIsModalMoveVisible(false);
    }

    async function handleDeleteSubmit(e: FormEvent) {
        e.preventDefault()

        setDisabled(true);

        allIdsFolder.forEach(elem => {
            const deleteFolder = async () => {
                await api.delete(`folder/${elem}`)
                    .catch(error => console.log(error))

                setAllIdsFolder([]);
                setIsModalDeleteVisible(false);
                router.replace(router.asPath)
            }
            deleteFolder()
            
        })

        allIdsFiles.forEach(elem => {
            const deleteFile = async () => {
                await api.delete(`uploads/${elem}`)
                    .catch(error => console.log(error))

                setAllIdsFiles([])
                setIsModalDeleteVisible(false);    
                router.replace(router.asPath)
            }
            deleteFile()
        })
        
        setDisabled(false);
    }

    return (
        <div className={styles.optionsBar}>
            <div className={styles.list}>
                <button className={styles.cutButton} onClick={handleMoveModal}>
                    <MdContentCut size='2rem' color='var(--white)'/>
                </button>
                <button className={styles.deleteButton} onClick={handleDeleteModal}>
                    <MdDelete size='2rem' color='var(--white)'/>
                </button>
            </div>
            <div className={styles.general}></div>
            {isModalMoveVisible && 
                <MoveModal 
                    modalFunc={handleMoveModal}
                    buckets={buckets}
                />
            }
            {isModalDeleteVisible &&
                <FolderModal 
                    modalFunc={handleDeleteModal}
                    titleVisible={true}
                    title={'Deletar os selecionados?'}
                    disabled={disabled}
                    handleSubmit={handleDeleteSubmit}
                    leftButtonTitle={'Deletar'} 
                    inputVisible={false}                
                />
            }
        </div>
    )
}