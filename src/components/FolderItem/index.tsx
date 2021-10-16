import Link from "next/link";
import styles from './styles.module.scss';
import { useRouter } from "next/router";
import React, { FormEvent, useEffect, useState } from "react";
import { AiFillFolder, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { folderFileTypes } from "../../protocols/protocols";
import { FolderModal } from "../FolderModal";
import { api } from "../../services/api";

export function FolderItem(bucket: folderFileTypes){

    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

    useEffect(()=>{
        setIsChecked(bucket.checkAll)
    }, [bucket.checkAll])

    useEffect(()=>{
        setIsChecked(bucket.checkAll)
        if (!bucket.checkAll) {
            bucket.setAllIdsFolder([])
            bucket.setAllIdsFiles([])
        }
    }, [bucket.checkAll])

    useEffect(() => {
        if (isChecked) {
            bucket.setAllIdsFolder(oldArray => [...oldArray, bucket.id])
        } else {
            const filteredBuckets = bucket.allIdsFolder.filter(item => item !== bucket.id)
            bucket.setAllIdsFolder(filteredBuckets)
        }
    }, [isChecked])

    const [name, setName] = useState('');

    const handleUpdateModal = () => {
        setIsModalUpdateVisible(!isModalUpdateVisible);
        setIsModalDeleteVisible(false);
    }
    const handleDeleteModal = () => {
        setIsModalDeleteVisible(!isModalDeleteVisible);
        setIsModalUpdateVisible(false);
    }

    const [disabled, setDisabled] = useState(false);

    const router = useRouter();

    async function handleUpdateSubmit(e: FormEvent) {
        e.preventDefault();

        setDisabled(true);

        const updateFolder = async () => {
            await api.put(`folder/${bucket.id}`, {
                name: name.trim()
            }).catch(error => console.log(error))

            setIsModalUpdateVisible(false);
            router.replace(router.asPath)
        }

        updateFolder();

        setDisabled(false);
    }

    async function handleDeleteSubmit(e: FormEvent) {
        e.preventDefault();

        setDisabled(true);

        const deleteFolder = async () => {
            await api.delete(`folder/${bucket.id}`)
                .catch(error => console.log(error))

            setIsModalDeleteVisible(false);
            router.replace(router.asPath)
        }

        deleteFolder();

        setDisabled(false);
    }

    return (
        <tr className={styles.folderItem}>
            <td>
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
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
                <button onClick={handleUpdateModal}>
                    <AiOutlineEdit size='2rem' color='var(--green-500)'/>
                </button>
                <button onClick={handleDeleteModal}>
                    <AiOutlineDelete size='2rem' color='var(--pdf)'/>
                </button>
                {isModalUpdateVisible &&
                    <FolderModal 
                        modalFunc={handleUpdateModal}
                        inputVisible={true}
                        titleVisible={true}
                        title={`Atualizar pasta ${bucket.name}?`}
                        name={name}
                        changeInput={(e) => setName(e.target.value)}
                        disabled={disabled}
                        handleSubmit={handleUpdateSubmit} 
                        leftButtonTitle={'Atualizar'}                    
                    />
                }
                {isModalDeleteVisible &&
                    <FolderModal 
                        modalFunc={handleDeleteModal}
                        inputVisible={false}
                        titleVisible={true}
                        title={`Deletar pasta ${bucket.name}?`}
                        disabled={disabled}
                        handleSubmit={handleDeleteSubmit} 
                        leftButtonTitle={'Excluir'}                    
                    />
                }
            </td>
        </tr>   
    )
}