"use client";

import { Page } from "@/components/Page";
import { Modal } from "@telegram-apps/telegram-ui";
import { Button } from "@/components/ui/button";
import { DatePickerDemo } from "@/components/Calendar/Calendar";

export default function CalendarPage() {
    return (
        <Page>
            <div>
                <DatePickerDemo />
            </div>
        </Page>
    );
}