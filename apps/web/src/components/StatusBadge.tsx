
import React from 'react';

const map: Record<string, string> = {
  done: 'bg-green-600',
  in_progress: 'bg-blue-600',
  blocked: 'bg-red-600',
  todo: 'bg-gray-500',
};

export default function StatusBadge({ status }: { status: string }) {
  return <span className={`badge ${map[status] ?? 'bg-gray-500'}`}>{status}</span>;
}
