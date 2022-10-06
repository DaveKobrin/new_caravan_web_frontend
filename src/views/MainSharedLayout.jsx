import { Link, Outlet } from 'react-router-dom';
import './MainSharedLayout.css';
const MainSharedLayout = () => {
  return (
    <>
      <header>
        <nav>
          <Link to='/' className='link'>
            HOME
          </Link>
          <Link to='/user' className='link'>
            USER MANAGEMENT
          </Link>
          <Link to='/build' className='link'>
            BUILD YOUR DECK
          </Link>
          <Link to='/game' className='link'>
            PLAY A GAME
          </Link>
        </nav>
      </header>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default MainSharedLayout;
