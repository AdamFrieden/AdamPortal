import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grow,
} from '@mui/material';
import Grid from '@mui/material/Grid2'
import { ClientGladiator } from '../domain/models';
import { GladiatorCard } from './GladiatorCard';
import { TransitionProps } from '@mui/material/transitions';

interface RecruitGladiatorsDialogProps {
  open: boolean;
  onClose: () => void;
  gladiators: ClientGladiator[];
  onRecruit: () => void;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<unknown>;
  },
  ref: React.Ref<unknown>,
) {
  return <Grow in={props.in} ref={ref} {...props} />;
  // return <Slide direction="left" ref={ref} {...props} />;
  // return <Zoom in={props.in} ref={ref} {...props} />;
});

export const RecruitGladiatorsDialog: React.FC<RecruitGladiatorsDialogProps> = ({
  open,
  onClose,
  gladiators,
  onRecruit
}) => {
  return (
    <Dialog fullScreen open={open} onClose={onClose} maxWidth="md" fullWidth TransitionComponent={Transition}>
      <DialogTitle>Recruit Gladiators</DialogTitle>
      <DialogContent dividers>
        <Grid container spacing={2} justifyContent="center">
          {gladiators.map((glad) => (
            <GladiatorCard
              key={glad.id}
              gladiator={glad}
              onRecruitSelected={() => { onRecruit(); }}
            />
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="inherit">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};
