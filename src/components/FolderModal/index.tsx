import { ChangeEvent, FormEvent } from "react";
import styles from './styles.module.scss';


type modalFunc = {
    modalFunc: () => void;
    id?: string;
    inputVisible: boolean;
    titleVisible: boolean;
    title: string;
    disabled: boolean;
    name: string;
    handleSubmit: (e: FormEvent) => Promise<void>
    changeInput: (e: ChangeEvent<HTMLInputElement>) => void
}

export function FolderModal({ 
    modalFunc = () => {}, 
    id = 'modal', 
    inputVisible, 
    titleVisible, 
    title, 
    disabled, 
    name, 
    handleSubmit, 
    changeInput }: modalFunc) 
{

    async function handleOutSideClick(e: FormEvent) {
        if ((e.target as Element).id === id) modalFunc() 
    }

    return (
        <div id={id} className={styles.shadowZone} onClick={handleOutSideClick}>
            <div className={styles.modalContainer}>
                <form onSubmit={handleSubmit}>
                    {titleVisible && <p>{title}</p>}
                    <br />
                    {inputVisible && 
                        <input 
                            type="text" 
                            placeholder="Nova pasta..."
                            onChange={changeInput}
                            value={name}
                            disabled={disabled}
                        />
                    }
                    <div className={styles.modalButtons}>
                        <button 
                            className={styles.create} 
                            type="submit" 
                            disabled={disabled}
                        >
                            Criar
                        </button>
                        <button 
                            onClick={modalFunc} 
                            className={styles.cancel} 
                            type="button" 
                            disabled={disabled}
                        >
                            Fechar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}