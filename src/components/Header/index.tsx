import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { Dropdown } from '../Dropdown';
import { FiSearch } from "react-icons/fi";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from 'react';
import { AiFillFolder } from 'react-icons/ai';
import { FolderModal } from '../FolderModal';


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
                {isModalVisible ? <FolderModal/> : null}
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
                            {click && <Dropdown/>}
                        </div> :
                        <FaBars
                            color='var(--white)'
                            size={25}
                        />
                    }
                </button>
            </header>
        </div>
    );
}