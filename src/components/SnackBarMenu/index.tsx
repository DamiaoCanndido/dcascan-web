import React, { FormEvent } from "react"
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { MdContentCut } from "react-icons/md";
import styles from './styles.module.scss';

type snackBarFunc = {
    modalFunc: () => void;
    id: string;
    name: string;
    folder: boolean;
}

export function SnackBarMenu({
    modalFunc = () => {}, 
    id = 'snackModal', 
    name,
    folder,
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
                
                <div className={styles.icon}>
                    <AiOutlineEdit size='1.5rem' color='var(--white)'/>
                    Renomear
                </div>
                <div className={styles.icon}>
                    <MdContentCut size='1.5rem' color='var(--white)'/>
                    Mover
                </div>
                <div className={styles.icon}>
                    <AiOutlineDelete size='1.5rem' color='var(--white)'/>
                    Excluir
                </div>
                
            </div>
        </div>
    )
}