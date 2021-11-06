import Link from "next/link";
import styles from './styles.module.scss';
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { AiFillFilePdf, AiOutlineDelete, AiOutlineMore } from "react-icons/ai";
import { folderFileTypes } from "../../protocols/protocols";
import { FolderModal } from "../FolderModal";
import { api } from "../../services/api";
import { SnackBarMenu } from "../SnackBarMenu";

export function FileItem(bucket: folderFileTypes){

    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);

    const handleDeleteModal = () => {
        setIsModalDeleteVisible(!isModalDeleteVisible);
        setIsSnackBarVisible(false);
    }
    const handleSnackBarModal = () => {
        setIsSnackBarVisible(!isSnackBarVisible);
        setIsModalDeleteVisible(false);
    }

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

            setIsModalDeleteVisible(false);    
            router.replace(router.asPath)
        }

        deleteFile();

        setDisabled(false);
    }

    return (
        <>
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
                <td>{bucket.size}</td>
                <td>
                    <button onClick={handleDeleteModal}>
                        <AiOutlineDelete size='2rem' color='var(--pdf)'/>
                    </button>
                    {isModalDeleteVisible &&
                        <FolderModal 
                            modalFunc={handleDeleteModal}
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
            <div className={styles.fileMobileItem}>
                <Link href={bucket.file}>
                    <a target="_blank" rel="noopener noreferrer">
                        <AiFillFilePdf size='5rem' color='var(--pdf)'/>
                    </a>
                </Link>
                <div className={styles.iconFileMobileOptions}>
                    <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => setIsChecked(!isChecked)}
                    />
                    <p>{bucket.name}</p>
                    <button onClick={handleSnackBarModal}>
                        <AiOutlineMore size='2rem' color='var(--black)'/>
                    </button>
                </div>
                {isSnackBarVisible && 
                    <SnackBarMenu 
                        modalFunc={handleSnackBarModal}
                        id={bucket.id}
                        name={bucket.name}
                        folder={false}
                        handleDeleteModal={handleDeleteModal}
                    />
                }
                {isModalDeleteVisible &&
                    <FolderModal 
                        modalFunc={handleDeleteModal}
                        inputVisible={false}
                        titleVisible={true}
                        title={`Deletar pasta ${bucket.name}?`}
                        disabled={disabled}
                        handleSubmit={handleSubmit} 
                        leftButtonTitle={'Excluir'}                    
                    />
                }
            </div>
        </>
    )
}