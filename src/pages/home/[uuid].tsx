import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Bucket from '../../components/Bucket';
import { GetServerSideProps } from 'next';
import { apiServerSide } from '../../services/apiServerSide';
import { parseCookies } from 'nookies';
import { bucketProps } from '../../protocols/protocols';


export default function folderContent({ buckets }: bucketProps){
    return (
        <>
            <Header />
            <Bucket buckets={buckets}/>
            <Footer/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apiClient = apiServerSide(ctx)

    const { uuid }  = ctx.params;
  
    const { ['access-token']: accessToken } = parseCookies(ctx)
  
    if (!accessToken) {
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }
  
    const { data } = await apiClient.get(`/bucket/${uuid}`)
    
    return {
      props: {
        buckets: data
      }
    }
  }