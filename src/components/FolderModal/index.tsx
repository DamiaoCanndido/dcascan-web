import { FormEvent } from "react";
import { useRouter } from 'next/router';
import { useState } from "react";
import styles from './styles.module.scss';
import { api } from "../../services/api";

type modalFunc = {
    modalFunc: () => void;
    id?: string;
    inputVisible: boolean;
    titleVisible: boolean;
    title: string;
}

type data = {
    name: string;
    root?: string;
}

export function FolderModal({ modalFunc = () => {}, id = 'modal', inputVisible, titleVisible, title }: modalFunc) {

    const [name, setName] = useState('');
    const [disabled, setDisabled] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        setDisabled(true);

        if(name.trim() === ""){
            return;
        }

        const folder = router.query.uuid as string;

        const createFolder = async () => {
            let data: data = {name: name.trim()}

            if (folder !== undefined) {
                data.root = folder.trim();
            }

            await api.post('folder/', data)
            .catch(function(error){
                console.log(error)
            })
        }

        createFolder();

        setDisabled(false);

        router.replace(router.asPath)
    }

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
                            onChange={(e) => setName(e.target.value)}
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