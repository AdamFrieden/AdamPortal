import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Container, Typography, CircularProgress, Alert } from '@mui/material';

// Adjust the path according to your project structure
const markdownModules = import.meta.glob('./generated_docs/*.md', { as: 'raw' });

const MarkdownDocPage: React.FC = () => {
  const { docId } = useParams<{ docId: string }>();
  const [markdown, setMarkdown] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
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
        const loadModule = markdownModules[filePath];
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
  }, [docId]);

  if (loading) {
    return <Container><CircularProgress /></Container>;
  }

  if (error) {
    return <Container><Alert severity="error">{error}</Alert></Container>;
  }

  // If we reach here, docId is guaranteed to be defined due to the early returns
  // Use non-null assertion (!) as docId existence is checked above.
  const title = decodeURIComponent(docId!).replace(/_/g, ' ').replace('.md', '');

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </Container>
  );
};

export default MarkdownDocPage; 