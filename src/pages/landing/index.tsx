import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import { Button } from '../../components/Button';


export const Landing = () => {
  return (
    <div className={styles.landingContainer}>
      <aside>
        <img
            src="/badaman_paper_boat.svg"
            alt="DCAlogo"
        />
        <strong>Diga adeus aos papéis soltos.</strong>
        <p>Plataforma para armazenamento de documentos para a administração pública.</p>
      </aside>
      <main>
      <Link to='/register'>
          <Button>
            Cadastre-se
          </Button>
      </Link>
      <Link to='/login'>
          <Button>
            Entre já
          </Button>
      </Link>
      </main>
    </div>
  )
}