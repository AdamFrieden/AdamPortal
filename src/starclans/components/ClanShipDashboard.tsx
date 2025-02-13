import { Box, Stack, Typography } from "@mui/material";
import StatusComponent from "../../components/StatusComponent";
import DisplayData from "./DisplayData";
import UpdateDataForm from "./UpdateDataForm";

export default function ClanShipDashboard() {
  return (
    <Box sx={{ p: 2, maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h5" gutterBottom>
        Clan Ship Dashboard Component
      </Typography>
      <Stack spacing={2} my={5}>
        <StatusComponent name='Advanced Scanner'/>
        <StatusComponent name='Resource Module'/>
        <StatusComponent name='Medica Pod'/>
        <DisplayData />
        <UpdateDataForm />
      </Stack>
    </Box>
  );
}