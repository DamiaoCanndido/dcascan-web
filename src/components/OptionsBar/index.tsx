import styles from './styles.module.scss';
import { MdContentCut, MdDelete } from 'react-icons/md';
import React, { FormEvent, useState } from 'react';
import { FolderModal } from '../FolderModal';


export function OptionsBar() {

    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [disabled, setDisabled] = useState(false);

    const handleModal = () => setIsModalDeleteVisible(!isModalDeleteVisible);

    async function handleDeleteSubmit(e: FormEvent) {
        e.preventDefault()
        setDisabled(true);
        setIsModalDeleteVisible(false);
        setDisabled(false);
    }

    return (
        <div className={styles.optionsBar}>
            <div className={styles.list}>
                <button className={styles.cutButton}>
                    <MdContentCut size='2rem' color='var(--white)'/>
                </button>
                <button className={styles.deleteButton} onClick={handleModal}>
                    <MdDelete size='2rem' color='var(--white)'/>
                </button>
            </div>
            <div className={styles.general}></div>
            {isModalDeleteVisible &&
                <FolderModal 
                    modalFunc={handleModal}
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