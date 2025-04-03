import React from 'react';
import styled from 'styled-components';
import { ClientGladiator } from '../domain/models';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import GladiatorAvatar from './GladiatorAvatar';

const GladiatorRowStyled = styled.div`
    padding: 1rem;
    background: #2a2a2a;
    border-radius: 6px;
    min-height: 80px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1rem;

    .nameContainer {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
        flex: 1;

        h3 {
            margin: 0;
            color: #fff;
        }

        .secondaryLabel {
            color: #888;
            font-size: 0.875rem;
        }
    }

    .projectedValue {
        font-weight: bold;
        font-size: 2rem;
        padding-right: 0rem;
    }
`;

interface GladiatorRowProps {
    gladiator: ClientGladiator;
    onRemove?: (id: string) => void;
}

const GladiatorRow: React.FC<GladiatorRowProps> = ({ gladiator, onRemove }) => {
    const projectedPower = Math.round(gladiator.estimatedPower * gladiator.stamina * 0.01);
    
    return (
        <GladiatorRowStyled>
            <GladiatorAvatar stamina={gladiator.stamina} size={72} gladiatorId={gladiator.id} />
            <div className="nameContainer">
                <h3>{gladiator.name}</h3>
                <span className="secondaryLabel">Power: {gladiator.estimatedPower}</span>
            </div>
            <span className="projectedValue">
                {projectedPower}
            </span>
            {onRemove && (
                <IconButton 
                    size="small" 
                    onClick={() => onRemove(gladiator.id)}
                    sx={{ color: '#666' }}
                >
                    <CloseIcon fontSize="small" />
                </IconButton>
            )}
        </GladiatorRowStyled>
    );
};

export default GladiatorRow; 