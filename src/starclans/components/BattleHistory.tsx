import React from 'react';
import styled from 'styled-components';
import { BattleResult } from '../domain/models';
import { formatDistanceToNow } from 'date-fns';

type BattleOutcome = 'VICTORY' | 'DEFEAT' | 'DRAW';

// Styled Components
const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background: #1a1a1a;
    border-radius: 8px;
`;

const Header = styled.div`
    background: #2a2a2a;
    padding: 1rem;
    border-radius: 6px;
    
    h2 {
        margin: 0;
        color: #fff;
    }
`;

const BattleList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const BattleCard = styled.div<{ outcome: BattleOutcome }>`
    background: #2a2a2a;
    border-radius: 6px;
    padding: 1rem;
    border-left: 4px solid ${props => {
        switch (props.outcome) {
            case 'VICTORY': return '#4caf50';
            case 'DEFEAT': return '#f44336';
            case 'DRAW': return '#ff9800';
            default: return '#2196f3';
        }
    }};
`;

const BattleHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
    
    h3 {
        margin: 0;
        color: #fff;
    }
    
    .time {
        color: #888;
        font-size: 0.875rem;
    }
`;

const BattleDetails = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
`;

const GladiatorList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

const GladiatorItem = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0.5rem;
    background: #333;
    border-radius: 4px;
    
    .name {
        color: #fff;
    }
    
    .power {
        color: #888;
    }
`;

const Rewards = styled.div`
    margin-top: 1rem;
    padding: 0.5rem;
    background: #333;
    border-radius: 4px;
    
    h4 {
        margin: 0 0 0.5rem 0;
        color: #fff;
    }
    
    .reward {
        display: flex;
        justify-content: space-between;
        color: #4caf50;
    }
`;

interface BattleHistoryProps {
    battles: BattleResult[];
}

const BattleHistory: React.FC<BattleHistoryProps> = ({ battles }) => {
    if (!battles || battles.length === 0) {
        return (
            <Container>
                <Header>
                    <h2>Battle History</h2>
                </Header>
                <p>No battles have been fought yet.</p>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <h2>Battle History</h2>
            </Header>
            <BattleList>
                {battles.map(battle => (
                    <BattleCard key={battle.id} outcome={battle.outcome}>
                        <BattleHeader>
                            <h3>Battle {battle.id.substring(0, 8)}</h3>
                            <span className="time">
                                {formatDistanceToNow(battle.startTime, { addSuffix: true })}
                            </span>
                        </BattleHeader>
                        <BattleDetails>
                            <div>
                                <h4>Your Gladiators</h4>
                                <GladiatorList>
                                    {battle.playerGladiators.map(gladiator => (
                                        <GladiatorItem key={gladiator.id}>
                                            <span className="name">{gladiator.name}</span>
                                            <span className="power">
                                                {Math.round(gladiator.estimatedPower * gladiator.stamina * 0.01)}
                                            </span>
                                        </GladiatorItem>
                                    ))}
                                </GladiatorList>
                            </div>
                            <div>
                                <h4>Opponents</h4>
                                <GladiatorList>
                                    {battle.opponentGladiators.map(gladiator => (
                                        <GladiatorItem key={gladiator.id}>
                                            <span className="name">{gladiator.name}</span>
                                            <span className="power">
                                                {Math.round(gladiator.estimatedPower * gladiator.stamina * 0.01)}
                                            </span>
                                        </GladiatorItem>
                                    ))}
                                </GladiatorList>
                            </div>
                        </BattleDetails>
                        {battle.rewards && Object.entries(battle.rewards).length > 0 && (
                            <Rewards>
                                <h4>Rewards</h4>
                                {Object.entries(battle.rewards).map(([type, amount]) => (
                                    <div key={type} className="reward">
                                        <span>{type}</span>
                                        <span>{amount}</span>
                                    </div>
                                ))}
                            </Rewards>
                        )}
                    </BattleCard>
                ))}
            </BattleList>
        </Container>
    );
};

export default BattleHistory; 