"use client";

import { Page } from "@/components/Page";
import { Modal } from "@telegram-apps/telegram-ui";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/Calendar/Calendar";
import {BookingWizard} from "@/components/BookingWizard/BookingWizard";

export default function BookingWizardPage() {
    return (
        <Page>
                <BookingWizard/>
        </Page>
    );
}