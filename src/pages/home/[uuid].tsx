import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { useRouter as nextRouter } from 'next/router';


export default function folderContent(){
    const router = nextRouter();

    return (
        <>
            <Header />
            <h1>{router.query.uuid}</h1> 
            <Footer/>
        </>
    )
}