import Link from "next/link";
import styles from './styles.module.scss';
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { AiFillFilePdf, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { folderFileTypes } from "../../protocols/protocols";
import { FolderModal } from "../FolderModal";
import { api } from "../../services/api";

export function FileItem(bucket: folderFileTypes){

    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleModal = () => setIsModalVisible(!isModalVisible);

    const [disabled, setDisabled] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

    useEffect(()=>{
        setIsChecked(bucket.checkAll)
        if (!bucket.checkAll) {
            bucket.setAllIdsFiles([])
            bucket.setAllIdsFolder([])
        }
    }, [bucket.checkAll])

    useEffect(() => {
        if (isChecked) {
            bucket.setAllIdsFiles(oldArray => [...oldArray, bucket.id])
        } else {
            const filteredBuckets = bucket.allIdsFiles.filter(item => item !== bucket.id)
            bucket.setAllIdsFiles(filteredBuckets)
        }
    }, [isChecked])

    const router = useRouter();

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        setDisabled(true);

        const deleteFile = async () => {
            await api.delete(`uploads/${bucket.id}`)
                .catch(error => console.log(error))

            setIsModalVisible(false);    
            router.replace(router.asPath)
        }

        deleteFile();

        setDisabled(false);
    }

    return (
        <tr className={styles.fileItem}>
            <td>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                />
            </td>
            <td>
                <AiFillFilePdf size='3rem' color='var(--pdf)'/>
            </td>
            <td>
                <Link href={bucket.file}>
                    <a target="_blank" rel="noopener noreferrer">
                        {bucket.name}
                    </a>
                </Link>
            </td>
            <td>{bucket.updated_at}</td>
            <td>{bucket.created_at}</td>
            <td>
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