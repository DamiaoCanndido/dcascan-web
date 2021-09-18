import type { GetServerSideProps, NextPage } from 'next';
import { parseCookies } from 'nookies';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { apiServerSide } from '../../services/apiServerSide';


const Bucket: NextPage = () => {
  return (
    <>
      <Header />
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

  await apiClient.get('auth/user')
  
  return {
    props: {}
  }
}

export default Bucket