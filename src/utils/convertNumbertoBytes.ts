export function convertNumbertoBytes(size: string) {
    if (Number(size)/1024 < 1) {
        return size.toString()+' '+'B'
    } else if (Number(size)/1024 > 1 && Number(size)/1024 < 1024) {
        return ((Number(size)/1024).toString())+' '+'KB'
    } else if (Number(size)/1024 > 1024 && Number(size)/1024 > 1048576) {
        return ((Number(size)/1024).toString())+' '+'MB'
    }
}