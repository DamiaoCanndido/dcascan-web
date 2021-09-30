import type { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
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

  if (!accessToken) {
    return {
      redirect: {
        destination: '/login',
        permanent: false
      }
    }
  }

  // await apiClient.get('auth/user')
  const { data } = await apiClient.get('/bucket')
  
  return {
    props: {
      buckets: data
    }
  }
}

export default Home