export function convertNumbertoBytes(size: number) {
    if (Number(size)/1000 < 1) {
        return size.toString()+' '+'B'
    } else if (Number(size)/1024 > 1 && Number(size)/1024 < 1024) {
        return ((Number(size)/1024).toFixed(2).toString())+' '+'KB'
    } else if (Number(size)/1024 > 1024 && Number(size)/1024 < 1048576) {
        return ((Number(size)/1048576).toFixed(2).toString())+' '+'MB'
    }
}