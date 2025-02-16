import { useState } from "react";
import { CircularProgress, Button, Typography, Card, CardContent } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";

interface StatusComponentProps {
  name: string;
}

export default function StatusComponent({ name }: StatusComponentProps) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleAction = () => {
    setStatus("loading");
    setTimeout(() => {
      const isSuccess = Math.random() > 0.2; // 80% chance of success
      setStatus(isSuccess ? "success" : "error");
    }, 2000);
  };

  return (
    <Card sx={{ maxWidth: 600, padding: 2, display: "flex", alignItems: "center", gap: 2 }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6">{name}</Typography>
        <Typography color="textSecondary">Status: {status}</Typography>
      </CardContent>
      <div>
        {status === "loading" && <CircularProgress size={24} color="primary" />}
        {status === "success" && <CheckCircleIcon color="success" />}
        {status === "error" && <ErrorIcon color="error" />}
      </div>
      <Button variant="contained" onClick={handleAction} disabled={status === "loading"}>
        {status === "loading" ? "Processing..." : "Interact"}
      </Button>
    </Card>
  );
}
