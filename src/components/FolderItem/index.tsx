import Link from "next/link";
import styles from './styles.module.scss';
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { AiFillFolder, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { folderFileTypes } from "../../protocols/protocols";
import { FolderModal } from "../FolderModal";
import { api } from "../../services/api";

export function FolderItem(bucket: folderFileTypes){

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModal = () => setIsModalVisible(!isModalVisible);

    const [disabled, setDisabled] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        setDisabled(true);

        const deleteFolder = async () => {
            await api.delete(`folder/${bucket.id}`)
                .catch(error => console.log(error))
        }

        deleteFolder();

        setDisabled(false);

        router.replace(router.asPath)
    }

    return (
        <tr className={styles.folderItem} key={bucket.id}>
            <td>
                <input
                    type="checkbox"
                    disabled={false}
                    onChange={() => {}}
                />
            </td>
            <td>
                <AiFillFolder size='3rem' color='var(--folder)'/>
            </td>
            <td>
                <Link href={`/home/${bucket.id}`}>
                    <a>
                    {bucket.name}
                    </a>
                </Link>
            </td>
            <td>{bucket.updated_at}</td>
            <td>{bucket.created_at}</td>
            <td>
                <button>
                    <AiOutlineEdit size='2rem' color='var(--green-500)'/>
                </button>
                <button onClick={handleModal}>
                    <AiOutlineDelete size='2rem' color='var(--pdf)'/>
                </button>
                {isModalVisible &&
                    <FolderModal 
                        modalFunc={handleModal}
                        inputVisible={false}
                        titleVisible={true}
                        title={'Deletar pasta'} 
                        disabled={disabled}
                        handleSubmit={handleSubmit}                  
                    />
                }
            </td>
        </tr>   
    )
}