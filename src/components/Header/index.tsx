import styles from './styles.module.scss';
import Image from 'next/image';

export default function Header(){
    return (
        <header className={styles.headerContainer}>
            <Image
                src="/TomK32-Paperboat.svg"
                alt="DCAlogo"
                width={100}
                height={100}
            />
            <form>
                <input/>
                <button>Q</button>
            </form>
            <span>Qua, 15 set</span>
        </header>
    );
}