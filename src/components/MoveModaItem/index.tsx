import React, { FormEvent } from "react";
import styles from './styles.module.scss';
import { AiFillFolder } from "react-icons/ai";
import { folderFileTypes } from "../../protocols/protocols";
import { api } from "../../services/api";
import router from "next/router";


export function MoveModalItem(bucket: folderFileTypes) {

    // Entra na pasta do moveModal.
    const handleSubmit = async (e: FormEvent) => {
        // impedi que se mova uma pasta para ela mesma
        bucket.setIsGoHome(true)

        e.preventDefault()
        let response: folderFileTypes[];
        try {
            response = await (await api.get(`/bucket/${bucket.id}`)).data
            bucket.setDefaultBuckets(response)
            // novo root
            bucket.setFolderSelected(bucket.id)
        } catch (error) {
            router.replace('login');
        }
        
        bucket.setIsGoHome(false)
    }

    return (
        <div className={styles.moveModalItem}>
            <button onClick={handleSubmit}>
                <AiFillFolder size='2rem' color='var(--folder)'/>
                <p>{bucket.name}</p>
            </button>
        </div>
    )
}