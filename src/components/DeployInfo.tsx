import { Typography } from "@mui/material";

export default function DeployInfo() {
  const deployedAt = import.meta.env.VITE_DEPLOYED_AT || "N/A";
  const commitHash = import.meta.env.VITE_COMMIT_HASH || "N/A";

  return (
    <div style={{ textAlign: "center", marginTop: "20px", marginBottom: "20px" }}>
      <Typography variant="body2" color="textSecondary">
        Last Deployed: {new Date(deployedAt).toLocaleString()}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Commit Hash: {commitHash.slice(0, 7)}
      </Typography>
    </div>
  );
}
