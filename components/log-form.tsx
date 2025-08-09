'use client';
import * as React from 'react';
import { Stack, TextField, Button, MenuItem } from '@mui/material';

export default function LogForm() {
  const [date, setDate] = React.useState(() => new Date().toISOString().slice(0,10));
  const [minutes, setMinutes] = React.useState<number>(30);
  const [vocab, setVocab] = React.useState<number>(0);
  const [activity, setActivity] = React.useState<string>('Reading');
  const [notes, setNotes] = React.useState<string>('');
  const [pending, setPending] = React.useState(false);

  async function submit() {
    setPending(true);
    try {
      const res = await fetch('/api/logs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: new Date(date).toISOString(),
          minutes: Number(minutes),
          vocab: Number(vocab),
          activity,
          notes
        })
      });
      if (!res.ok) throw new Error(await res.text());
      window.location.reload();
    } catch (e) {
      alert('保存に失敗しました: ' + String(e));
    } finally {
      setPending(false);
    }
  }

  return (
    <Stack spacing={2} sx={{ mb: 3 }}>
      <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap' }}>
        <TextField
          label="日付"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          label="学習時間（分）"
          type="number"
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          inputProps={{ min:1, max:1440 }}
        />
        <TextField
          label="語彙数（覚えた/確認）"
          type="number"
          value={vocab}
          onChange={(e) => setVocab(Number(e.target.value))}
          inputProps={{ min:0, max:10000 }}
        />
        <TextField
          label="活動"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
          select
          sx={{ minWidth: 160 }}
        >
          {['Reading','Listening','Speaking','Writing','Grammar','Vocabulary','Test Prep','Other'].map(x =>
            <MenuItem key={x} value={x}>{x}</MenuItem>
          )}
        </TextField>
      </Stack>
      <TextField
        label="メモ"
        value={notes}
        onChange={(e)=>setNotes(e.target.value)}
        multiline
        minRows={2}
      />
      <Button variant="contained" onClick={submit} disabled={pending}>
        {pending ? '保存中...' : '保存'}
      </Button>
    </Stack>
  );
}