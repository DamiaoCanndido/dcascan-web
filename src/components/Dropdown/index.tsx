import styles from './styles.module.scss';


export function Dropdown() {
    return (
        <ul className={styles.dropDownMenu}>
            <li>
                <div onClick={()=>{console.log("Example 1")}}>
                    Example 1
                </div>
            </li>
            <li>
                <div onClick={()=>{console.log("Example 2")}}>
                    Example 2
                </div>  
            </li>
            <li>
                <div onClick={()=>{console.log("Example 3")}}>
                    Example 3
                </div> 
            </li>
        </ul>
    )
}