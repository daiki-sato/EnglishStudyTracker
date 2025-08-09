'use client';
import * as React from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function HomePage() {
  const { data: session } = useSession();
  return (
    <Stack spacing={2}>
      <Typography variant="h4">英語学習記録アプリ</Typography>
      <Typography>学習時間・語彙数・メモを毎日記録し、ダッシュボードで一覧や集計を確認できます。</Typography>
      {!session ? (
        <Button variant="contained" onClick={() => signIn('github')}>GitHubでログイン</Button>
      ) : (
        <Button variant="outlined" onClick={() => signOut()}>ログアウト</Button>
      )}
    </Stack>
  );
}