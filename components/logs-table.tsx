'use client';
import * as React from 'react';
import { Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';

type Log = {
  id: string;
  date: string;
  minutes: number;
  vocabularyCount: number;
  activity: string;
  notes: string | null;
};

export default function LogsTable({ initialLogs }: { initialLogs: Log[] }) {
  return (
    <Paper>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>日付</TableCell>
            <TableCell>活動</TableCell>
            <TableCell>分</TableCell>
            <TableCell>語彙</TableCell>
            <TableCell>メモ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {initialLogs.map(l => (
            <TableRow key={l.id}>
              <TableCell>{new Date(l.date).toLocaleDateString('ja-JP')}</TableCell>
              <TableCell>{l.activity}</TableCell>
              <TableCell>{l.minutes}</TableCell>
              <TableCell>{l.vocabularyCount}</TableCell>
              <TableCell>{l.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}