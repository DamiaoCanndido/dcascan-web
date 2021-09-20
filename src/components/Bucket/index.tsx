import Link from 'next/link';
import styles from './styles.module.scss';
import { AiFillFolder } from "react-icons/ai";

export default function Bucket() {
    return (
        <div className={styles.homePage}>
            <section className={styles.myBucket}>
                <ul></ul>
            </section>
        </div>
    )
}