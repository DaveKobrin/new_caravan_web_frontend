import { Link, Outlet } from 'react-router-dom';
import './MainSharedLayout.css';
const UserLayout = () => {
  return (
    <>
      <header>
        <nav>
          <Link to='/user/login' className='link'>
            LOGIN
          </Link>
          <Link to='/user/register' className='link'>
            REGISTER
          </Link>
          <Link to='/user/logout' className='link'>
            LOGOUT
          </Link>
          <Link to='/user/delete' className='link'>
            DELETE
          </Link>
        </nav>
      </header>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default UserLayout;
