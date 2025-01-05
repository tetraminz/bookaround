'use client';

import { useState } from 'react';
import { useBackend } from '@/core/backend/context';
import { Button } from '@telegram-apps/telegram-ui';
import { formatDateForAPI } from '@/lib/date';

export function CreateBooking() {
  const { createBooking } = useBackend();
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await createBooking({
        Email: email,
        start: formatDateForAPI(date),
      });
      // Reset form
      setEmail('');
      setDate('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create booking');
      console.error('Failed to create booking:', err);
    }
  };

  return (
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        {error && (
            <div className="text-red-500 text-sm">{error}</div>
        )}
        <div>
          <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-2 border rounded"
              required
          />
        </div>
        <div>
          <input
              type="datetime-local"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
          />
        </div>
        <Button type="submit">Create Booking</Button>
      </form>
  );
}