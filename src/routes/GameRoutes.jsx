import { Routes, Route } from "react-router-dom"
import { GameLayout, SelectGameType, MatchPlayer, LocalGame, WebSocketGame } from '../views'
import { GameContext } from "../App";
// import { useContext } from "react";
import { UserProtectedRoute } from './'
import { useState } from "react";

const GameRoutes = () => {

    const [gameData, setGameData] = useState();
    const [matched, setMatched] = useState(null)

    const handleMatch = (id) => {
        setMatched(id);
        const tmp = {...gameData};
        tmp.otherPlayerId = id;
        setGameData(tmp);
    }

    return (
        <GameContext.Provider value={{gameData, setGameData}}>
            <Routes>
                <Route element={<GameLayout />}>
                    {/* <Route index element={<SelectGameType />} /> */}
                    <Route index element={<MatchPlayer onMatch={handleMatch} />} />
                    <Route path='local' element={<LocalGame />} />
                    <Route path='web' element={<UserProtectedRoute user={matched}><WebSocketGame /></UserProtectedRoute>} />
                </Route>
            </Routes>
        </GameContext.Provider>
    );
};

export default GameRoutes;
