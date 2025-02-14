import { useState, useEffect, useRef } from 'react';
import { Box, Button, Typography, LinearProgress, Stack } from '@mui/material';
import StatusComponent from './StatusComponent';
import ProfilePage from '../../components/ProfilePage';

// ------------------ Types ------------------ //
interface Gladiator {
  id: number;
  name: string;
  basePower: number; // e.g. true power
  stamina: number;   // 0 to 100
}

interface PartialResult {
  gladiatorId: number;
  tickValues: number[];    // Partition of the final roll into ticks
  staminaDrainPerTick: number;
  currentTick: number;     // How many ticks have been applied
  totalRoll: number;       // Sum of tickValues (final roll)
}

// ------------------ Initial Data ------------------ //
const initialPlayerGladiators: Gladiator[] = [
  { id: 1, name: 'Korvin the Scarred',     basePower: 12, stamina: 100 },
  { id: 2, name: 'Xia of the Glasslane',   basePower: 8,  stamina: 100 },
  { id: 3, name: 'Morgash the Unyielding', basePower: 15, stamina: 100 },
];

const initialEnemyGladiators: Gladiator[] = [
  { id: 101, name: 'Orc Commander',      basePower: 10, stamina: 100 },
  { id: 102, name: 'Brutal Marauder',    basePower: 13, stamina: 100 },
  { id: 103, name: 'Savage Berserker',    basePower: 11, stamina: 100 },
];

const TICKS = 4;
const PLAYER_TOTAL_STAMINA_COST = 20;
const ENEMY_TOTAL_STAMINA_COST = 20;

// ------------------ Helper Functions ------------------ //
function splitIntoRandomChunks(value: number, chunks: number): number[] {
  if (chunks <= 1) return [value];
  let remaining = value;
  const result: number[] = [];
  for (let i = 0; i < chunks - 1; i++) {
    const portion = Math.floor(Math.random() * (remaining / 2) + 1);
    result.push(portion);
    remaining -= portion;
  }
  result.push(remaining);
  return result;
}

function getRandomStaminaDrain(baseDrain: number): number {
  // Return a randomized drain between 0.8x and 1.2x the base value
  const factor = 0.8 + Math.random() * 0.4;
  return baseDrain * factor;
}

function createPartialResults(glads: Gladiator[], totalStaminaCost: number): PartialResult[] {
  return glads.map((glad) => {
    // Compute a final roll based on base power, current stamina, and a small random offset
    const staminaFactor = glad.stamina / 100;
    const randomOffset = Math.floor(Math.random() * 5) - 2; // Range: -2 ... +2
    const finalRoll = Math.max(0, Math.round(glad.basePower * staminaFactor + randomOffset));
    // Split the roll into TICKS parts
    const increments = splitIntoRandomChunks(finalRoll, TICKS);
    // Use a base drain value (totalCost/TICKS) and randomize it
    const baseDrain = totalStaminaCost / TICKS;
    const staminaDrainPerTick = getRandomStaminaDrain(baseDrain);
    return {
      gladiatorId: glad.id,
      tickValues: increments,
      staminaDrainPerTick,
      currentTick: 0,
      totalRoll: finalRoll,
    };
  });
}

// ------------------ Component ------------------ //
export default function ConflictMockup() {
  // State for player and enemy gladiators
  const [playerGladiators, setPlayerGladiators] = useState<Gladiator[]>(initialPlayerGladiators);
  const [enemyGladiators, setEnemyGladiators] = useState<Gladiator[]>(initialEnemyGladiators);
  // State for partial results
  const [playerPartialResults, setPlayerPartialResults] = useState<PartialResult[]>([]);
  const [enemyPartialResults, setEnemyPartialResults] = useState<PartialResult[]>([]);
  // State for scores and conflict progress
  const [playerScore, setPlayerScore] = useState<number>(0);
  const [enemyScore, setEnemyScore] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('');

  // Refs to store the latest partial results and scores synchronously
  const playerPartialsRef = useRef<PartialResult[]>([]);
  const enemyPartialsRef = useRef<PartialResult[]>([]);
  const playerScoreRef = useRef<number>(0);
  const enemyScoreRef = useRef<number>(0);
  const intervalRef = useRef<number | null>(null);



  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // ------------------ Conflict Start ------------------ //
  const handleStartConflict = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setPlayerScore(0);
    setEnemyScore(0);
    playerScoreRef.current = 0;
    enemyScoreRef.current = 0;
    setResultMessage('');

    // Create partial results for both sides
    const pResults = createPartialResults(playerGladiators, PLAYER_TOTAL_STAMINA_COST);
    const eResults = createPartialResults(enemyGladiators, ENEMY_TOTAL_STAMINA_COST);

    setPlayerPartialResults(pResults);
    setEnemyPartialResults(eResults);
    playerPartialsRef.current = pResults;
    enemyPartialsRef.current = eResults;

    intervalRef.current = window.setInterval(() => runTick(), 1000);
  };

  // ------------------ Tick Logic ------------------ //
  const runTick = () => {
    let playerTickIncrement = 0;
    let enemyTickIncrement = 0;

    // Update player's partial results
    const updatedPlayerPartials = playerPartialsRef.current.map((pr) => {
      if (pr.currentTick < pr.tickValues.length) {
        playerTickIncrement += pr.tickValues[pr.currentTick];
        return { ...pr, currentTick: pr.currentTick + 1 };
      }
      return pr;
    });
    playerPartialsRef.current = updatedPlayerPartials;
    setPlayerPartialResults(updatedPlayerPartials);

    // Update enemy's partial results
    const updatedEnemyPartials = enemyPartialsRef.current.map((pr) => {
      if (pr.currentTick < pr.tickValues.length) {
        enemyTickIncrement += pr.tickValues[pr.currentTick];
        return { ...pr, currentTick: pr.currentTick + 1 };
      }
      return pr;
    });
    enemyPartialsRef.current = updatedEnemyPartials;
    setEnemyPartialResults(updatedEnemyPartials);

    // Update scores using refs for synchronous accumulation
    playerScoreRef.current += playerTickIncrement;
    enemyScoreRef.current += enemyTickIncrement;
    setPlayerScore(playerScoreRef.current);
    setEnemyScore(enemyScoreRef.current);

    // Update stamina for player's gladiators (each tick drains a randomized amount)
    setPlayerGladiators((prevGlads) =>
      prevGlads.map((g) => {
        const pr = updatedPlayerPartials.find((p) => p.gladiatorId === g.id);
        if (pr) {
          return { ...g, stamina: Math.max(0, g.stamina - pr.staminaDrainPerTick) };
        }
        return g;
      })
    );
    // Update stamina for enemy gladiators
    setEnemyGladiators((prevGlads) =>
      prevGlads.map((g) => {
        const pr = updatedEnemyPartials.find((p) => p.gladiatorId === g.id);
        if (pr) {
          return { ...g, stamina: Math.max(0, g.stamina - pr.staminaDrainPerTick) };
        }
        return g;
      })
    );

    // Check if any partial ticks remain on either side
    const playerStillGoing = updatedPlayerPartials.some((pr) => pr.currentTick < pr.tickValues.length);
    const enemyStillGoing = updatedEnemyPartials.some((pr) => pr.currentTick < pr.tickValues.length);

    if (!playerStillGoing && !enemyStillGoing) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // Finalize conflict after state updates have propagated
      setTimeout(() => finalizeConflict(), 0);
    }
  };

  // ------------------ Finalize Conflict ------------------ //
  const finalizeConflict = () => {
    setIsPlaying(false);
    const pScore = playerScoreRef.current;
    const eScore = enemyScoreRef.current;
    if (pScore > eScore) {
      setResultMessage(`Victory! Player ${pScore} vs Enemy ${eScore}.`);
    } else if (pScore < eScore) {
      setResultMessage(`Defeat! Player ${pScore} vs Enemy ${eScore}.`);
    } else {
      setResultMessage(`Tie! Both scored ${pScore}.`);
    }
  };

  const renderGladiator = (
    g: Gladiator,
    partialResults: PartialResult[]
  ): JSX.Element => {
    const pr = partialResults.find((p) => p.gladiatorId === g.id);
    const partialTotal = pr
      ? pr.tickValues.slice(0, pr.currentTick).reduce((a, b) => a + b, 0)
      : 0;
    return (
      <Box
        key={g.id}
        display={'flex'}
        flexDirection={'column'}
        sx={{ mb: 2, p: 1, border: '1px solid #ccc', borderRadius: 1 }}
      >
        <Box flexDirection={'row'} display={'flex'} >
          <Box flexDirection={'column'}>
            <Typography variant="body1">{g.name}</Typography>
            <Typography variant="body2">
              Power: {g.basePower}
              {/* , Stamina: {Math.round(g.stamina)} */}
            </Typography>
          </Box>
          <Box justifyContent={'flex-end'} flexGrow={1} alignItems={'center'}>
            <Typography variant="h4" align='right'>
              {partialTotal}
            </Typography>
          </Box>
        </Box>
        <LinearProgress
          variant="determinate"
          value={(g.stamina / 100) * 100}
          sx={{ mt: 1 }}
        />
      </Box>
    );
  };

  // ------------------ Render UI ------------------ //
  return (
    <Box sx={{ p: 2, maxWidth: 800, margin: '0 auto' }}>
      <ProfilePage />
      <Stack spacing={2} my={5}>
        <StatusComponent name='Advanced Scanner'/>
        <StatusComponent name='Resource Module'/>
        <StatusComponent name='Medica Pod'/>
      </Stack>
      <Typography variant="h5" gutterBottom mt={8} mb={4}>
        Conflict Mockup
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        {/* Player Side */}
        <Box sx={{ width: '48%' }}>
          <Typography variant="h6">Player Gladiators</Typography>
          {playerGladiators.map((g) => renderGladiator(g, playerPartialResults))}
          <Typography variant="h6">Player Score: {playerScore}</Typography>
        </Box>

        {/* Enemy Side */}
        <Box sx={{ width: '48%' }}>
          <Typography variant="h6">Enemy Gladiators</Typography>
          {enemyGladiators.map((g) => renderGladiator(g, enemyPartialResults))}
          <Typography variant="h6">Enemy Score: {enemyScore}</Typography>
        </Box>
      </Box>

      {resultMessage && (
        <Typography
          variant="h6"
          color={
            resultMessage.includes('Victory')
              ? 'green'
              : resultMessage.includes('Defeat')
              ? 'red'
              : 'orange'
          }
        >
          {resultMessage}
        </Typography>
      )}

      <Button variant="contained" onClick={handleStartConflict} disabled={isPlaying}>
        {isPlaying ? 'Conflict in Progress...' : 'Start Conflict'}
      </Button>
    </Box>
  );
}
