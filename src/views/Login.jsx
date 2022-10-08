// import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
// import UserContext from "../contexts/UserContext";
import { UserContext } from '../App';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const  setUser  = useContext(UserContext).setUser;
  const [gTag, setGtag] = useState('');
  const [pass, setPass] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // console.log(setUser);
    e.preventDefault();
    fetch(process.env.REACT_APP_CARAVAN_API + '/user/login', {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        gamertag: gTag,
        password: pass,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        setUser(data.user);
        // console.log(user);
        navigate('/');
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <section className='login-screen'>
      <br />
      <form onSubmit={handleSubmit} className='login-form'>
        <label htmlFor='gamertag'>Gamer Tag</label>
        <input type='text' id='gamertag' value={gTag} onChange={(e) => setGtag(e.target.value)} placeholder='your gamer tag' />
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' value={pass} onChange={(e) => setPass(e.target.value)} placeholder='your password' />
        <input type='submit' value='Login' className='login-button' />
      </form>
    </section>
  );
};

export default Login;
