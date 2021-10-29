import type { GetServerSideProps } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import Header from '../../components/Header';
import { apiServerSide } from '../../services/apiServerSide';
import { bucketProps, folderFileTypes } from '../../protocols/protocols';
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

  let data: folderFileTypes[];

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
    if (ctx.query.name !== undefined) {
      data = await (await apiClient.get(`/bucket/?name=${ctx.query.name}`)).data
    } else {
      data = await (await apiClient.get('/bucket/')).data
    }
  } catch (error) {
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
      buckets: data,
    }
  }
}

export default Home