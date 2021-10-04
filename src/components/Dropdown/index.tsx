import styles from './styles.module.scss';

type dropDownOptions = {
    dropDownOptions: string[]
}

export function Dropdown({ dropDownOptions }: dropDownOptions) {
    return (
        <ul className={styles.dropDownMenu}>
            {dropDownOptions.map((dropItem, index) => {
                return (
                    <li key={index}>
                        <div onClick={()=>{console.log("Example 1")}}>
                            {dropItem}
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}