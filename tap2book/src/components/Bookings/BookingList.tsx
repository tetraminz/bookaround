'use client';

import { useEffect } from 'react';
import { useBackend } from '@/core/backend/context';
import { BookingItem } from './BookingItem';
import { List, Section } from '@telegram-apps/telegram-ui';

export function BookingList() {
  const { bookings, loading, error, fetchBookings } = useBackend();

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <List>
      <Section header="Your Bookings">
        {bookings.map((booking) => (
          <BookingItem key={booking.id} booking={booking} />
        ))}
      </Section>
    </List>
  );
}