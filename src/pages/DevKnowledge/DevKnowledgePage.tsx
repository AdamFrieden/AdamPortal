import React, { useEffect, useState, useMemo } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Typography, 
  Container, 
  CircularProgress, 
  Alert, 
  TextField, 
  Box, 
  Grid,
  Card,
  CardActionArea,
  CardContent
} from '@mui/material';

// Vite feature to import multiple modules
// Adjust the path according to your project structure
const markdownFiles = import.meta.glob('./generated_docs/*.md');

interface DocMeta {
  path: string;
  name: string;
}

const DevKnowledgePage: React.FC = () => {
  const [docs, setDocs] = useState<DocMeta[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      const loadedDocs = Object.keys(markdownFiles).map((path) => {
        const fileNameMatch = path.match(/([\w\s()&_+.-]+)\.md$/);
        const name = fileNameMatch ? fileNameMatch[1].replace(/_/g, ' ') : 'Unknown Document';
        return { path, name };
      });
      setDocs(loadedDocs);
    } catch (err) {
      console.error("Error loading markdown file list:", err);
      setError("Failed to load document list.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Filter docs based on search term (memoized for performance)
  const filteredDocs = useMemo(() => {
    if (!searchTerm) {
      return docs; // Return all docs if search term is empty
    }
    return docs.filter(doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [docs, searchTerm]);

  if (loading) {
    return <Container><CircularProgress /></Container>;
  }

  if (error) {
    return <Container><Alert severity="error">{error}</Alert></Container>;
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mt: 2, mb: 4 }}>
        Dev Knowledge Base
      </Typography>

      {/* Search Input */}
      <Box sx={{ mb: 4, maxWidth: '600px', mx: 'auto' }}>
        <TextField 
          fullWidth 
          label="Search Documents"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {/* Grid for Document Cards */}
      <Grid container spacing={3}>
        {filteredDocs.length > 0 ? (
          filteredDocs.map((doc) => (
            <Grid item key={doc.path} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardActionArea 
                  component={RouterLink} 
                  to={`/dev-knowledge/doc/${encodeURIComponent(doc.name.replace(/ /g, '_') + '.md')}`}
                  sx={{ flexGrow: 1 }}
                >
                  <CardContent>
                    <Typography gutterBottom variant="h6" component="div">
                      {doc.name}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography sx={{ textAlign: 'center', mt: 4, width: '100%' }}>
              No documents found.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default DevKnowledgePage; 