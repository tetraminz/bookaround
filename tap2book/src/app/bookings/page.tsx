'use client';

import { Page } from '@/components/Page';
import { BookingList } from '@/components/Bookings/BookingList';
import { CreateBooking } from '@/components/Bookings/CreateBooking';

export default function BookingsPage() {
  return (
    <Page>
        <CreateBooking />
        <BookingList />
    </Page>
  );
}