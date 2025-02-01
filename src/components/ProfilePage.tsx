import { useState } from "react";
import { Typography, Avatar, Select, MenuItem, CircularProgress, Box, Stack, Paper } from "@mui/material";
// import { motion } from "framer-motion";

interface Gladiator {
  id: number;
  name: string;
  avatar: string;
  power: number;
  stamina: number;
  recentMatches: { arena: string, points: number }[];
}

const mockGladiators: Gladiator[] = [
  {
    id: 1,
    name: "Cyber Reaper",
    avatar: "https://via.placeholder.com/150",
    power: 11,
    stamina: 75,
    recentMatches: [
      { arena: "Iron Throne", points: 9 },
      { arena: "The Colossus", points: 4 },
      { arena: "Deck 17", points: 15 },
      { arena: "Deck 17", points: 16 },
      { arena: "Blood Gulch", points: 10 },
    ],
  },
  {
    id: 2,
    name: "Neon Phantom",
    avatar: "https://via.placeholder.com/150",
    power: 7,
    stamina: 60,
    recentMatches: [
      { arena: "The Colossus", points: 10 },
      { arena: "The Colossus", points: 11 },
      { arena: "Blood Gulch", points: 3 },
      { arena: "Blood Gulch", points: 1 },
      { arena: "Deck 17", points: 8 },
    ],
  },
];

function CircularProgressWithLabel({ value }: { value: number }) {
  return (
    <Box sx={{ position: "relative", display: "inline-flex" }}>
      <CircularProgress variant="determinate" value={value} size={60} thickness={5} />
      <Box
        sx={{
          top: 0,
          left: 0,
          bottom: 0,
          right: 0,
          position: "absolute",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography variant="caption" component="div" color="textSecondary">
          {`${Math.round(value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

export default function ProfilePage() {
  const [selectedGladiator, setSelectedGladiator] = useState(mockGladiators[0]);

  return (
    <Stack spacing={3} sx={{ maxWidth: 600, mx: "auto", mt: 4, p: 3 }}>
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Select
          value={selectedGladiator.id}
          onChange={(e) => setSelectedGladiator(mockGladiators.find(g => g.id === e.target.value) || mockGladiators[0])}
          fullWidth
        >
          {mockGladiators.map((g) => (
            <MenuItem key={g.id} value={g.id}>{g.name} ({g.power})</MenuItem>
          ))}
        </Select>

        <Avatar src={selectedGladiator.avatar} sx={{ width: 100, height: 100, mx: "auto", my: 2 }} />
        <Typography variant="h5" fontWeight="bold">{selectedGladiator.name}</Typography>
        <Typography variant="subtitle1" color="textSecondary">Power: {selectedGladiator.power}</Typography>

        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", mt: 2 }}>
          <CircularProgressWithLabel value={selectedGladiator.stamina} />
          <Typography variant="subtitle2" sx={{ ml: 2 }}>Stamina</Typography>
        </Box>
      </Paper>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" gutterBottom>Recent Matches</Typography>
        <Stack spacing={1}>
          {selectedGladiator.recentMatches.map((match, index) => (
            <Box key={index} sx={{ display: "flex", justifyContent: "space-between", bgcolor: match.points >= selectedGladiator.power ? "#d4edda" : "#f8d7da", p: 1, borderRadius: 1 }}>
              <Typography>{match.arena}</Typography>
              <Typography fontWeight="bold" color={match.points >= selectedGladiator.power ? "green" : "red"}>{match.points}</Typography>
              {/* <Typography>{match.score}</Typography> */}
            </Box>
          ))}
        </Stack>
      </Paper>
    </Stack>
  );
}
