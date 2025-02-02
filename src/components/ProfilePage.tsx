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
    name: "Rico Kordell",
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
    name: "Dante Holt",
    avatar: "https://via.placeholder.com/150",
    power: 7,
    stamina: 90,
    recentMatches: [
      { arena: "The Colossus", points: 10 },
      { arena: "The Colossus", points: 11 },
      { arena: "The Pit", points: 3 },
      { arena: "Blood Gulch", points: 1 },
      { arena: "Deck 17", points: 8 },
    ],
  },
  {
    id: 3,
    name: "Jace Zayne",
    avatar: "https://via.placeholder.com/150",
    power: 9,
    stamina: 60,
    recentMatches: [
      { arena: "Exile's Run", points: 10 },
      { arena: "The Colossus", points: 7 },
      { arena: "The Pit", points: 7 },
      { arena: "Blood Gulch", points: 11 },
      { arena: "Deck 17", points: 6 },
    ],
  },
  {
    id: 4,
    name: "Orion Graves",
    avatar: "https://via.placeholder.com/150",
    power: 10,
    stamina: 55,
    recentMatches: [
      { arena: "Exile's Run", points: 10 },
      { arena: "The Colossus", points: 11 },
      { arena: "Deck 17", points: 7 },
      { arena: "Blood Gulch", points: 9 },
      { arena: "Deck 17", points: 16 },
    ],
  },
  {
    id: 5,
    name: "Zephyr Kain",
    avatar: "https://via.placeholder.com/150",
    power: 19,
    stamina: 88,
    recentMatches: [
      { arena: "The Pit", points: 10 },
      { arena: "The Pit", points: 17 },
      { arena: "Iron Throne", points: 22 },
      { arena: "Blood Gulch", points: 25 },
      { arena: "Deck 17", points: 8 },
    ],
  },
  {
    id: 6,
    name: "Stellan Rex",
    avatar: "https://via.placeholder.com/150",
    power: 14,
    stamina: 15,
    recentMatches: [
      { arena: "The Colossus", points: 11 },
      { arena: "Neon Wastes", points: 24 },
      { arena: "Blood Gulch", points: 0 },
      { arena: "Iron Throne", points: 5 },
      { arena: "Deck 17", points: 12 },
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
            <MenuItem key={g.id} value={g.id}>{g.name}</MenuItem>
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
