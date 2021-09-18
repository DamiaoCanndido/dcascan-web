import type { NextPage } from 'next'
import Landing from './landing'


const Main: NextPage = () => {
  return (
    /*

    landing não é afetado pela getServerSideProps
    talvez veja necessário coloca-la na raiz de pages.
    
    */
    <Landing />
  )
}

export default Main

