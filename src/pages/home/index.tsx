import type { GetServerSideProps } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import Header from '../../components/Header';
import { apiServerSide } from '../../services/apiServerSide';
import { bucketProps } from '../../protocols/protocols';
import Bucket from '../../components/Bucket';


function Home({ buckets }: bucketProps) {
  return (
    <>
      <Header/>
      <Bucket buckets={buckets}/>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const apiClient = apiServerSide(ctx)

  const { ['access-token']: accessToken } = parseCookies(ctx)

  let data: any;

  // token inexistente
  if (!accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  // token inválido ou expirado
  try {
    data = await (await apiClient.get('/bucket/')).data
  } catch (error) {
    data = [];
    destroyCookie(undefined, 'access-token')
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }
  
  return {
    props: {
      buckets: data
    }
  }
}

export default Home