import type { NextPage } from 'next'
import Link from 'next/link';
import styles from './styles.module.scss';
import Image from 'next/image';
import { Button } from '../../components/Button';


const Landing: NextPage = () => {
  return (
    <div className={styles.landingContainer}>
      <aside>
        <Image
            src="/badaman_paper_boat.svg"
            alt="DCAlogo"
            height={100}
            width={100}
            layout='responsive'
        />
        <strong>Diga adeus aos papéis soltos.</strong>
        <p>Plataforma para armazenamento de documentos para a administração pública.</p>
      </aside>
      <main>
      <Link href='/register'>
        <a>
          <Button>
            Cadastre-se
          </Button>
        </a>
      </Link>
      <Link href='/login'>
        <a>
          <Button>
            Entre já
          </Button>
        </a>
      </Link>
      </main>
    </div>
  )
}

export default Landing