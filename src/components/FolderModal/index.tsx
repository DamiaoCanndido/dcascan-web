import { FormEvent } from "react";
import styles from './styles.module.scss';

type modalFunc = {
    modalFunc: () => void;
    id?: string
}

export function FolderModal({ modalFunc = () => {}, id = 'modal' }: modalFunc) {

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        console.log("CRIOU PASTA COM SUCESSO")
    }

    async function handleOutSideClick(e: FormEvent) {
        if ((e.target as Element).id === id) modalFunc() 
    }

    return (
        <div id={id} className={styles.shadowZone} onClick={handleOutSideClick}>
            <div className={styles.modalContainer}>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Nova pasta..."
                        onChange={(e) => {}}
                        value={''}
                    />
                    <div className={styles.modalButtons}>
                        <button className={styles.create} type="submit">
                            Criar
                        </button>
                        <button onClick={modalFunc} className={styles.cancel} type="button">
                            Fechar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}