import type { GetServerSideProps } from 'next';
import { parseCookies } from 'nookies';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { apiServerSide } from '../../services/apiServerSide';
import { bucketProps } from '../../protocols/protocols';
import Folder from '../../components/Folder';


function Bucket({ buckets }: bucketProps) {
  return (
    <>
      <Header buckets={buckets}/>
      <Folder/>
      <Footer />
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

export default Bucket