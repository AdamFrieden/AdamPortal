import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';

interface GladiatorAvatarProps {
  stamina?: number;
  size?: number;
  gladiatorId?: string;  // Add gladiatorId prop
}

function GladiatorAvatar({ stamina, size = 64, gladiatorId = '1' }: GladiatorAvatarProps) {
  // Extract numeric part from ID and use modulo to select avatar
  const numericId = parseInt(gladiatorId.replace(/\D/g, '')) || 0;
  const avatarIndex = numericId % 20; // Assuming we have 4 avatars (0-3)
  
  const avatarImage = `/assets/starclans/avatars/avatar_${avatarIndex}.png`;
  

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      {stamina !== undefined && (
        <CircularProgress
          variant="determinate"
          value={stamina}
          size={size}
          thickness={2}
          sx={{
            position: 'absolute',
            color: '#4a5568',
            top: 0,
            left: 0
          }}
        />
      )}
      <Avatar 
        src={avatarImage} 
        alt="Gladiator"
        sx={{ 
          width: size - 8, 
          height: size - 8,
          position: 'absolute',
          top: 4,
          left: 4
        }}
      />
    </div>
  );
}

export default GladiatorAvatar;
