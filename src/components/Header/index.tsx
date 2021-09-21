import styles from './styles.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { FiSettings, FiSearch } from "react-icons/fi";


export default function Header(){
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
                <form>
                    <input placeholder='Pesquisar...'/>
                    <button>
                        <FiSearch
                            color='var(--white)'
                            size={25}
                        />
                    </button>
                </form>
                <button>
                    <FiSettings
                        color='var(--white)'
                        size={25}
                    />
                </button>
            </header>
        </div>
    );
}