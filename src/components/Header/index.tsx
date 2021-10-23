import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Dropdown } from '../Dropdown';
import { FiSearch } from "react-icons/fi";
import { FaBars, FaTimes } from "react-icons/fa";
import React, { FormEvent, useState } from 'react';
import { AiFillFolder } from 'react-icons/ai';
import { FolderModal } from '../FolderModal';
import { FloatFolderButton } from '../FloatFolderButton';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { folderFileTypes } from '../../protocols/protocols';

type data = {
    name: string;
    root?: string;
}

type searchProps = {
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setDftbuckets: React.Dispatch<React.SetStateAction<folderFileTypes[]>>;
}

export default function Header({search, setSearch, setDftbuckets}:searchProps){

    const [click, setClick] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleClick = () => setClick(!click);
    const handleModal = () => setIsModalVisible(!isModalVisible);

    const [name, setName] = useState('');
    const [disabled, setDisabled] = useState(false);

    const router = useRouter();

    async function handleSearchSubmit(e: FormEvent) {
        e.preventDefault();
        if (search !== '') {
            const response = await (await api.get(`bucket/?name=${search}`)).data
            setDftbuckets(response)
        } else {
            const response = await (await api.get(`bucket`)).data
            setDftbuckets(response)
        }   
    }

    async function handleSubmit(e: FormEvent) {
        e.preventDefault();

        setDisabled(true);

        if(name.trim() === ""){
            setDisabled(false);
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

            setIsModalVisible(!isModalVisible);
            router.replace(router.asPath)
        }

        createFolder();

        setDisabled(false);
    }

    return (
        <div className={styles.divContainer}>
            <header>
                <Link href='/'>
                    <a>
                        <Image
                            src="/TomK32-Paperboat.svg"
                            alt="DCAlogo"
                            width={100}
                            height={100}
                        />
                    </a>
                </Link>
                <button onClick={handleModal} className={styles.addFolder}>
                    <AiFillFolder 
                        size={30} 
                        color='var(--green-500)'
                    />
                </button>
                {isModalVisible &&
                    <FolderModal 
                        modalFunc={handleModal}
                        inputVisible={true}
                        titleVisible={true}
                        title={'Criar pasta'} 
                        disabled={disabled}
                        name={name}
                        handleSubmit={handleSubmit}  
                        changeInput={(e) => setName(e.target.value)} 
                        leftButtonTitle={'Criar'}                 
                    />
                }
                <form onSubmit={handleSearchSubmit}>
                    <input 
                        placeholder='Em desenvolvimento...'
                        type="text" 
                        onChange={(e) => setSearch(e.target.value)}
                        value={search}
                    />
                    <button type='submit'>
                        <FiSearch
                            color='var(--white)'
                            size={25}
                        />
                    </button>
                </form>
                <button className={styles.dropButton} onClick={handleClick}>
                    {click ? 
                        <div>
                            <FaTimes
                                color='var(--white)'
                                size={25}
                            />
                        </div> :
                        <FaBars
                            color='var(--white)'
                            size={25}
                        />
                    }
                </button>
                {click && <Dropdown/>}
            </header>
            <FloatFolderButton modalFunc={handleModal} />
        </div>
    );
}