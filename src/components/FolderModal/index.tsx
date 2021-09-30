import { NextPage } from "next";
import styles from './styles.module.scss';


export const FolderModal: NextPage = () => {
    return (
        <div className={styles.shadowZone}>
            <div className={styles.modalContainer}>
                <form onSubmit={()=>{}}>
                    <input 
                        type="text" 
                        placeholder="Nova pasta..."
                        onChange={(e) => {}}
                        value={''}
                    />
                    <div className={styles.modalButtons}>
                        <button type="submit">
                            Criar
                        </button>
                        <button>
                            Fechar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}