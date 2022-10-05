import { Link, Outlet } from "react-router-dom";

const GameLayout = () => {
    return (
        <>
            <header>
                {/* <Link to='/game'> Game Type </Link>
                | */}
                <Link to='/game'> Find A Match </Link>
                |
                <Link to='/game/local'> Local Game </Link>
                |
                <Link to='/game/web'> Web Game</Link>
            </header>
            <hr />
            <section>
                <Outlet />
            </section>
        </>
    );
}

export default GameLayout;