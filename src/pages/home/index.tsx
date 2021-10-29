import type { GetServerSideProps } from 'next';
import { destroyCookie, parseCookies } from 'nookies';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { convertNumbertoBytes } from '../../utils/convertNumbertoBytes';
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

  const buckets = data.map(bucket => {
    return {
        id: bucket.id,
        owner: bucket.owner,
        created_at: format(parseISO(bucket.created_at), 'dd MMM yyyy H:mm', {locale: ptBR}),
        updated_at: format(parseISO(bucket.updated_at), 'dd MMM yyyy H:mm', {locale: ptBR}),
        name: bucket.name,
        root: !bucket.root ? null : bucket.root,
        file: !bucket.file ? null : bucket.file,
        key: !bucket.key ? null : bucket.key,
        size: !bucket.size ? null : convertNumbertoBytes(bucket.size),
        folder: !bucket.folder ? null : bucket.folder,
      }
  })

  console.log(buckets)
  
  return {
    props: {
      buckets
    }
  }
}

export default Home