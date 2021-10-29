import Header from '../../components/Header';
import Bucket from '../../components/Bucket';
import { GetServerSideProps } from 'next';
import { apiServerSide } from '../../services/apiServerSide';
import { destroyCookie, parseCookies } from 'nookies';
import { bucketProps, folderFileTypes } from '../../protocols/protocols';


export default function folderContent({ buckets }: bucketProps){
    return (
        <>
            <Header />
            <Bucket buckets={buckets}/>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const apiClient = apiServerSide(ctx)

    const { uuid }  = ctx.params;
  
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
        data = await (await apiClient.get(`/bucket/${uuid}?name=${ctx.query.name}`)).data
      } else {
        data = await (await apiClient.get(`/bucket/${uuid}`)).data
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