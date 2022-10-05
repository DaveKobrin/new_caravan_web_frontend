// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Build, Landing, MainSharedLayout, NotFound } from './views';
import { UserProtectedRoute, UserRoutes, GameRoutes } from './routes';
import GetAllCards from './BuildDeck/GetAllCards';
import React, { useState} from 'react';

// import UserContext from './contexts/UserContext';

export const ContextContainer = React.createContext();
export const UserContext = React.createContext();
export const GameContext = React.createContext();

const App = () => {
  const [allCards, setAllCards] = useState();
  const [user, setUser] = useState();
  const [usersDeck, setUsersDeck] = useState([]);

  // useEffect(() => {
  //   console.log(user);
  // }, [user]);

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <ContextContainer.Provider value={{ allCards, setAllCards, usersDeck, setUsersDeck }}>
          <Routes>
            <Route path='/' element={<MainSharedLayout />}>
              <Route index element={<Landing />} />
              <Route path='user/*' element={<UserRoutes />} />
              <Route path='build' element={
                <UserProtectedRoute user={user}>
                  <Build />
                </UserProtectedRoute>} />
              <Route path='game/*' element={
                <UserProtectedRoute user={user}>
                  <GameRoutes />
                </UserProtectedRoute>} />
              <Route path='buildold' element={<GetAllCards />} />
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </ContextContainer.Provider>
      </UserContext.Provider>
    </Router>
  );
};

export default App;
/* <div className='App'>
      <header className='App-header'>
        <GetAllCards />
      </header>
    </div> */
