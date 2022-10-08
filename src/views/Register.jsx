import { useContext, useState } from 'react';
import { UserContext } from '../App';

const Login = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState('');
  const [gTag, setGtag] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleSubmit = async (e) => {
    // console.log(setUser);
    e.preventDefault();

    fetch(process.env.REACT_APP_CARAVAN_API + '/user/register', {
      method: 'POST',
      body: JSON.stringify({
        name: name,
        gamertag: gTag,
        email: email,
        password: pass,
      }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUser(data.user);
        console.log(user);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <section className='login-screen'>
      <h1>Register</h1>
      <br />
      <form onSubmit={handleSubmit} className='login-form'>
        <label htmlFor='name'>Name</label>
        <input type='text' id='name' value={name} onChange={(e) => setName(e.target.value)} placeholder='your name' />
        <label htmlFor='gamertag'>Gamer Tag</label>
        <input type='text' id='gamertag' value={gTag} onChange={(e) => setGtag(e.target.value)} placeholder='your gamer tag' />
        <label htmlFor='email'>Email</label>
        <input type='text' id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder='your email' />
        <label htmlFor='password'>Gamer Tag</label>
        <input type='password' id='password' value={pass} onChange={(e) => setPass(e.target.value)} placeholder='your password' />
        <input type='submit' value='register' className='login-button' style={{ marginBottom: '20px' }} />
      </form>
    </section>
  );
};

export default Login;
