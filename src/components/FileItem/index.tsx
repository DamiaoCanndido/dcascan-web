import Link from "next/link";
import styles from './styles.module.scss';
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { AiFillFilePdf, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { folderFileTypes } from "../../protocols/protocols";
import { FolderModal } from "../FolderModal";
import { api } from "../../services/api";

export function FileItem(bucket: folderFileTypes){

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModal = () => setIsModalVisible(!isModalVisible);

    const [disabled, setDisabled] = useState(false);

    const router = useRouter();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        setDisabled(true);

        const deleteFile = async () => {
            await api.delete(`uploads/${bucket.id}`)
                .catch(error => console.log(error))
            router.replace(router.asPath)
        }

        deleteFile();

        setDisabled(false);
    }

    return (
        <tr className={styles.fileItem}>
            <td>
                <input
                    className={styles.checkInput}
                    type="checkbox"
                    disabled={false}
                    onChange={() => {}}
                />
            </td>
            <td>
                <AiFillFilePdf size='3rem' color='var(--pdf)'/>
            </td>
            <td>
                <Link href={bucket.file}>
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
                        title={`Deletar arquivo ${bucket.name}?`} 
                        disabled={disabled}
                        handleSubmit={handleSubmit} 
                        leftButtonTitle={'Excluir'}                 
                    />
                }
            </td>
        </tr>
    )
}