import { FormEvent } from "react";
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import styles from './styles.module.scss';
import { api } from "../../services/api";

type modalFunc = {
    modalFunc: () => void;
    id?: string
}

type data = {
    name: string;
    root?: string;
}

export function FolderModal({ modalFunc = () => {}, id = 'modal' }: modalFunc) {

    const [name, setName] = useState('');
    const router = useRouter();

    async function handleSubmit(e: FormEvent) {

        e.preventDefault();

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
                        onChange={(e) => setName(e.target.value)}
                        value={name}
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