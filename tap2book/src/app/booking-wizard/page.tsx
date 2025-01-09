"use client";

import { Page } from "@/components/Page";
import { Modal } from "@telegram-apps/telegram-ui";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/Calendar/Calendar";
import {BookingWizard} from "@/components/BookingWizard/BookingWizard";

export default function BookingWizardPage() {
    return (
        <Page>
            <div className="flex min-h-screen flex-col items-center justify-between p-24">
                <BookingWizard/>
            </div>
        </Page>
    );
}