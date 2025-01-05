'use client';

import { Cell } from '@telegram-apps/telegram-ui';
import { useBackend } from '@/core/backend/context';
import type { Booking } from '@/core/backend/types';
import { format } from 'date-fns';

interface BookingItemProps {
  booking: Booking;
}

export function BookingItem({ booking }: BookingItemProps) {
  const { deleteBooking } = useBackend();

  const handleDelete = async () => {
    try {
      await deleteBooking(booking.id);
    } catch (error) {
      console.error('Failed to delete booking:', error);
    }
  };

  return (
    <Cell
      subtitle={booking.Email}
      after={
        <button 
          onClick={handleDelete}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      }
    >
      {format(new Date(booking.start), 'PPP p')}
    </Cell>
  );
}