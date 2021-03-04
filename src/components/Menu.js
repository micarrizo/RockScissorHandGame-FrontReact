import React from 'react';
import { Link } from 'react-router-dom'

const Menu = () => {
    return ( 
        <div className="row">
            <h1 className="text-center mt-4 mb-4 fancy-text text-white">Menu</h1>
            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                <Link className="btn-rotate mb-3 btn-large btn-block btn-white fancy-text" to={'/newGame'}> New Game </Link>
                <Link className="btn-rotate mb-3 btn-large btn-block btn-white fancy-text" to={'/edit'}> Edit Moves </Link>
                <Link className="btn-rotate mb-3 btn-large btn-block btn-white fancy-text" to={'/gamestats'}> Game Stats </Link>
            </div>
        </div>
        
     );
}

export default Menu;