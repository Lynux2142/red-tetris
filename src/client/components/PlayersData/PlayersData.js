import React, {useState} from 'react';
import { StyledPlayersData, StyledPlayer } from '../styles/StyledPlayersData';
import {StyledRow} from '../styles/StyledCell';
import Tetris from '../Game/Tetris/Tetris';
import Cell from '../Game/Cell';
import {BLACK_RGB, WHITE_RGB} from '../../gameHelpers';

const PlayersData = (props) => {
    const WIDTH = 10;
    const HEIGHT = 20;
    const [HTMLgrid, setHTMLgrid] = useState([]);

    const getSpectrum = (spectrum) => {
        let result = '';
        for (let key of spectrum.keys()) {
            if (key !== 0) {
                result = result.concat('-' + spectrum[key]);
            } else {
                result = result.concat(spectrum[key]);
            }
        }
        return result;
    };

    const getGridSpectrum = (spectrum) => {
        new Array(HEIGHT).fill().map((row) => new Array(WIDTH).fill(WHITE_RGB));
        let HTMLgrid = [];
        for (let y = 0; y < HEIGHT; ++y) {
            let row = [];
            for (let x = 0; x < WIDTH; ++x) {
                row.push(
                  <Cell className='cell'
                              color={spectrum[y] > x ? WHITE_RGB : BLACK_RGB}
                              key={`${y * WIDTH + x}`}
                  />
                );
            }
            HTMLgrid.push(<StyledRow key={`${y}`}>{row}</StyledRow>);
        }
        setHTMLgrid(HTMLgrid);
        return (HTMLgrid);
    };

    return (
        <table>
            <StyledPlayersData>
                <StyledPlayer>
                    <th>Player</th>
                    <th>Score</th>
                    <th>Spectrum</th>
                </StyledPlayer>
                {
                    Object.keys(props.players).map(
                        (key, i) =>
                            <StyledPlayer key={i}>
                                <td>{props.players[key].name}</td>
                                <td>{props.players[key].score}</td>
                                <td>
                                    {getSpectrum(props.players[key].spectrum)}
                                    {/*<Tetris HTMLgrid={getGridSpectrum(props.players[key].spectrum)}/>*/}
                                </td>
                            </StyledPlayer>
                    )
                }
            </StyledPlayersData>
        </table>
    );
};

export default PlayersData;
