import Image from 'next/image';

export default function Header(){
    return (
        <header>
            <Image
                src="/TomK32-Paperboat.svg"
                alt="DCAlogo"
                width={100}
                height={100}
            />
            <input/>
            <span>Qua, 15 set</span>
        </header>
    );
}