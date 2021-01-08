import React from 'react';
import { StyledPlayersData, StyledPlayer } from '../styles/StyledPlayersData';

const PlayersData = (props) => {
    const getSpectrum = (spectrum) => {
        let result = '';
        for (let key of spectrum.keys()) {
            if (key != 0) {
                result = result.concat('-' + spectrum[key]);
            } else {
                result = result.concat(spectrum[key]);
            }
        }
        console.log('spectrum', spectrum);
        console.log('result', result);
        return result;
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
                                </td>
                            </StyledPlayer>
                    )
                }
            </StyledPlayersData>
        </table>
    );
};

export default PlayersData;