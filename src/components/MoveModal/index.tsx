import { FormEvent } from 'react';
import styles from './styles.module.scss';
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai';
import { folderFileTypes } from '../../protocols/protocols';

type modalFunc = {
    modalFunc: () => void;
    id?: string;
    buckets: folderFileTypes[]
}

export function MoveModal({ 
    modalFunc, 
    id = 'moveModal',
    buckets,
}: modalFunc) {

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
                    <p>Mover</p>
                    <button onClick={modalFunc}>
                        <AiOutlineClose size='1.5rem' color='var(--black)'/>
                    </button>
                </div>
                {buckets.map(e => {
                    return (
                        <p>{e.name}</p>
                    )
                })}
            </div>
        </div>
    )
}