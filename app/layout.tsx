import * as React from 'react';
import { AuthProvider } from '@/components/auth-provider';
import { CssBaseline, Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import Link from 'next/link';

export const metadata = {
  title: 'English Study Tracker',
  description: 'Track your daily English study with minutes, vocab, and notes.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body>
        <AuthProvider>
          <CssBaseline />
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" sx={{ flexGrow: 1 }}>
                English Study Tracker
              </Typography>
              <Button color="inherit" component={Link} href="/">Home</Button>
              <Button color="inherit" component={Link} href="/dashboard">Dashboard</Button>
            </Toolbar>
          </AppBar>
          <Container maxWidth="md">
            <Box sx={{ my: 4 }}>
              {children}
            </Box>
          </Container>
        </AuthProvider>
      </body>
    </html>
  );
}