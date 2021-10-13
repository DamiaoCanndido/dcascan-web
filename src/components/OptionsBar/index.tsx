import styles from './styles.module.scss';
import { MdContentCut, MdDelete } from 'react-icons/md';


export function OptionsBar() {
    return (
        <div className={styles.optionsBar}>
            <div className={styles.list}>
                <button>
                    <MdContentCut size='2rem' color='var(--black)'/>
                </button>
                <button>
                    <MdDelete size='2rem' color='var(--black)'/>
                </button>
            </div>
            <div className={styles.general}>
                <button>
                    <MdContentCut size='2rem' color='var(--black)'/>
                </button>
            </div>
        </div>
    )
}