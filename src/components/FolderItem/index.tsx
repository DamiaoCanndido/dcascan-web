import Link from "next/link";
import styles from './styles.module.scss';
import { useRouter } from "next/router";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import React, { FormEvent, useEffect, useState } from "react";
import { AiFillFolder, AiOutlineDelete, AiOutlineEdit, AiOutlineMore } from "react-icons/ai";
import { folderFileTypes } from "../../protocols/protocols";
import { FolderModal } from "../FolderModal";
import { api } from "../../services/api";
import { SnackBarMenu } from "../SnackBarMenu";
import { returnAllErrors } from "../../handlers/errorRegisterHandlers";
import { errorToast } from "../../handlers/Toast";

export function FolderItem(bucket: folderFileTypes){

    const [isModalUpdateVisible, setIsModalUpdateVisible] = useState(false);
    const [isModalDeleteVisible, setIsModalDeleteVisible] = useState(false);
    const [isSnackBarVisible, setIsSnackBarVisible] = useState(false);

    const [isChecked, setIsChecked] = useState(false);

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
        setIsSnackBarVisible(false);
    }
    const handleDeleteModal = () => {
        setIsModalDeleteVisible(!isModalDeleteVisible);
        setIsModalUpdateVisible(false);
        setIsSnackBarVisible(false);
    }
    const handleSnackBarModal = () => {
        setIsSnackBarVisible(!isSnackBarVisible);
        setIsModalDeleteVisible(false);
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
            }).catch(function(error){
                const folderErrors = returnAllErrors(error.response.data)
                for(let i = 0; i < folderErrors.length; i++){
                    errorToast(folderErrors[i][0])
                }
            })

            setIsModalUpdateVisible(false);
            
            if(router.asPath.includes('?')){
                let queryString = router.asPath.split('?')
                router.replace(queryString[0])
            } else {
                router.replace(router.asPath)
            }
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
        <>
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
                <td>---</td>
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
            <div className={styles.folderMobileItem}>
                <Link href={`/home/${bucket.id}`}>
                    <a>
                        <div className={styles.iconMobileItem}>
                            <AiFillFolder size='5rem' color='var(--folder)'/>
                        </div> 
                    </a>
                </Link>
                <div className={styles.iconMobileOptions}>
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
                        folder={true}
                        handleUpdateModal={handleUpdateModal}
                        handleDeleteModal={handleDeleteModal}
                    />
                }
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
            </div>
        </> 
    )
}