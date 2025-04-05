import React from 'react';
import styled from 'styled-components';
import { BattleResult } from '../domain/models';
import { formatDistanceToNow } from 'date-fns';

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

const BattleCard = styled.div`
    background: #2a2a2a;
    border-radius: 6px;
    padding: 1rem;
    border-left: 4px solid #2196f3;
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

const ProgressBar = styled.div`
    height: 8px;
    background: #333;
    border-radius: 4px;
    margin-top: 1rem;
    overflow: hidden;
`;

const Progress = styled.div<{ progress: number }>`
    height: 100%;
    background: #2196f3;
    width: ${props => props.progress}%;
    transition: width 0.5s ease;
`;

interface ActiveBattlesProps {
    battles: BattleResult[];
}

const ActiveBattles: React.FC<ActiveBattlesProps> = ({ battles }) => {
    if (!battles || battles.length === 0) {
        return (
            <Container>
                <Header>
                    <h2>Active Battles</h2>
                </Header>
                <p>No battles are currently in progress.</p>
            </Container>
        );
    }

    return (
        <Container>
            <Header>
                <h2>Active Battles</h2>
            </Header>
            <BattleList>
                {battles.map(battle => {
                    // Calculate progress percentage
                    const now = Date.now();
                    const endTime = battle.startTime + battle.durationMs;
                    const progress = Math.min(100, Math.max(0, ((now - battle.startTime) / battle.durationMs) * 100));
                    
                    return (
                        <BattleCard key={battle.id}>
                            <BattleHeader>
                                <h3>Battle {battle.id.substring(0, 8)}</h3>
                                <span className="time">
                                    Started {formatDistanceToNow(battle.startTime, { addSuffix: true })}
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
                            <ProgressBar>
                                <Progress progress={progress} />
                            </ProgressBar>
                        </BattleCard>
                    );
                })}
            </BattleList>
        </Container>
    );
};

export default ActiveBattles; 