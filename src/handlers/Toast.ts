import { toast, Bounce } from 'react-toastify';

export function errorToast(message: string) {
    toast.error(message, {
        className: "Error",
        draggable: true,
        transition: Bounce,
    });
}

export function successToast(message: string) {
    toast.success(message, {
        className: "Sucesso",
        draggable: true,
        transition: Bounce,
    });
}