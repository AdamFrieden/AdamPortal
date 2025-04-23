import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Container, CircularProgress, Alert, Button, Box } from '@mui/material';

// Get the list of all document keys/paths for the random feature
const allMarkdownFiles = import.meta.glob('./generated_docs/*.md');
// Get the modules for content loading
const markdownContentModules = import.meta.glob('./generated_docs/*.md', { as: 'raw' });

// Helper to get document name from path
const getDocNameFromPath = (path: string): string => {
  const fileNameMatch = path.match(/([\w\s()&_+.-]+)\.md$/);
  return fileNameMatch ? fileNameMatch[1].replace(/_/g, ' ') : 'Unknown Document';
};

const MarkdownDocPage: React.FC = () => {
  const { docId } = useParams<{ docId: string }>();
  const navigate = useNavigate();
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Memoize the list of all document names (excluding the current one)
  const availableDocs = useMemo(() => {
    return Object.keys(allMarkdownFiles)
      .map(path => ({ name: getDocNameFromPath(path) }))
      .filter(doc => doc.name.replace(/ /g, '_') + '.md' !== docId); // Filter out current doc
  }, [docId]); // Recalculate if docId changes

  useEffect(() => {
    setLoading(true); // Reset loading state on docId change
    setError(null);  // Reset error state on docId change
    // Ensure docId exists before proceeding
    if (!docId) {
      setError('Document ID is missing.');
      setLoading(false);
      return;
    }

    const decodedDocId = decodeURIComponent(docId);

    const loadMarkdown = async () => {
      // Construct the expected key for the glob import
      const filePath = `./generated_docs/${decodedDocId}`;
      try {
        const loadModule = markdownContentModules[filePath];
        if (loadModule) {
          const content = await loadModule();
          setMarkdown(content);
        } else {
          throw new Error(`Document not found: ${filePath}`);
        }
      } catch (err) {
        console.error("Error loading markdown file:", err);
        setError(`Failed to load document: ${decodedDocId}`);
      } finally {
        setLoading(false);
      }
    };

    loadMarkdown();
    // Scroll to top when document changes
    window.scrollTo(0, 0);
  }, [docId]);

  // Handler for the random button click
  const handleRandomClick = () => {
    if (availableDocs.length > 0) {
      const randomIndex = Math.floor(Math.random() * availableDocs.length);
      const randomDoc = availableDocs[randomIndex];
      const randomDocUrl = `/dev-knowledge/doc/${encodeURIComponent(randomDoc.name.replace(/ /g, '_') + '.md')}`;
      navigate(randomDocUrl);
    }
  };

  if (loading) {
    return <Container><CircularProgress /></Container>;
  }

  if (error) {
    return <Container><Alert severity="error">{error}</Alert></Container>;
  }

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2, flexWrap: 'wrap' }}>
        <Button 
          variant="outlined"
          onClick={handleRandomClick}
          disabled={availableDocs.length === 0}
          size="small"
        >
          Next Random
        </Button>
      </Box>
      <Box sx={{
        '& img': {
          maxWidth: '100%',
          height: 'auto',
          display: 'block',
        },
        '& pre': {
          overflowX: 'auto',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all',
          backgroundColor: (theme) => theme.palette.grey[100],
          padding: (theme) => theme.spacing(2),
          borderRadius: (theme) => theme.shape.borderRadius,
        },
        '& code': {
           wordBreak: 'break-word',
        },
        '& table': {
            display: 'block',
            width: '100%',
            overflowX: 'auto',
            borderCollapse: 'collapse',
            '& th, & td': {
                padding: '8px',
                border: (theme) => `1px solid ${theme.palette.divider}`,
            },
            '& th': {
                backgroundColor: (theme) => theme.palette.grey[50],
                textAlign: 'left',
            },
        },
         '& p, & li, & blockquote, & td, & th': {
            overflowWrap: 'break-word',
            wordWrap: 'break-word',
         }
      }}>
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </Box>
    </Container>
  );
};

export default MarkdownDocPage; 