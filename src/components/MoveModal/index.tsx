import { FormEvent } from 'react';
import styles from './styles.module.scss';

type modalFunc = {
    modalFunc: () => void;
    id?: string;
}

export function MoveModal({ 
    modalFunc, 
    id = 'moveModal' 
}: modalFunc) {

    async function handleOutSideClick(e: FormEvent) {
        if ((e.target as Element).id === id) modalFunc() 
    }

    return (
        <div id={id} className={styles.shadowZone} onClick={handleOutSideClick}>
            <div className={styles.modalContainer}>

            </div>
        </div>
    )
}