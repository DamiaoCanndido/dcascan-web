import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Dropdown } from '../Dropdown';
import { FiSearch } from "react-icons/fi";
import { FaBars, FaTimes } from "react-icons/fa";
import React, { useState } from 'react';
import { AiFillFolder } from 'react-icons/ai';
import { FolderModal } from '../FolderModal';
import { FloatFolderButton } from '../FloatFolderButton';


const headerOptions = ['Exemplo 1', 'Exemplo 2', 'Exemplo 3']


export default function Header(){

    const [click, setClick] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleClick = () => setClick(!click);
    const handleModal = () => setIsModalVisible(!isModalVisible);

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
                    />
                }
                <form>
                    <input placeholder='Em desenvolvimento...'/>
                    <button>
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
                            {click && <Dropdown dropDownOptions={headerOptions}/>}
                        </div> :
                        <FaBars
                            color='var(--white)'
                            size={25}
                        />
                    }
                </button>
            </header>
            <FloatFolderButton modalFunc={handleModal} />
        </div>
    );
}