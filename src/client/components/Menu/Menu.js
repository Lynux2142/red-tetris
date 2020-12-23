import React from 'react';
import MenuButton from './MenuButton';
import StartButton from './StartButton';

const Menu = (props) => {
    return (
        <aside>
            {props.gameOver ? (
                <MenuButton gameOver={props.gameOver} text="Game Over" />
            ) : (
                    <div>
                        <MenuButton text={`Score: ${props.score}`} />
                    </div>
                )}
            <StartButton callback={props.startGame} />
        </aside>
    );
};

export default Menu;