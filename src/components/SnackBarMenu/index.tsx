import React, { FormEvent } from "react"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdContentCut } from "react-icons/md";
import styles from './styles.module.scss';

type snackBarFunc = {
    modalFunc: () => void;
    id: string;
    name: string;
    folder: boolean;
    handleUpdateModal?: () => void;
    handleDeleteModal: () => void;
}

export function SnackBarMenu({
    modalFunc = () => {}, 
    id = 'snackModal', 
    name,
    folder,
    handleUpdateModal,
    handleDeleteModal
}: snackBarFunc) {

    function handleOutSideClick(e: FormEvent) {
        if ((e.target as Element).id === id){ 
            modalFunc() 
        }
    }

    return (
        <div id={id} className={styles.snackBarShadow} onClick={handleOutSideClick}>
            <div className={styles.snackContainer}>
                <div className={styles.snackTitle}>
                    {name}
                </div>
                
                {folder && 
                    <button onClick={handleUpdateModal} className={styles.snackIcon}>
                        <AiOutlineEdit size='1.5rem' color='var(--white)'/>
                        <p>Renomear</p>
                    </button>
                }
                <button className={styles.snackIcon}>
                    <MdContentCut size='1.5rem' color='var(--white)'/>
                    <p>Mover</p>
                </button>
                <button onClick={handleDeleteModal} className={styles.snackIcon}>
                    <AiOutlineDelete size='1.5rem' color='var(--white)'/>
                    <p>Excluir</p>
                </button>
                
            </div>
        </div>
    )
}