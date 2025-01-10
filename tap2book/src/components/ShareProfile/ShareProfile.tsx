"use client";

import { useState } from 'react';
import { Card, Button } from '@telegram-apps/telegram-ui';
import { Check, Copy } from 'lucide-react';

interface ShareProfileProps {
    username: string;
}

export function ShareProfile({ username }: ShareProfileProps) {
    const [copied, setCopied] = useState(false);
    //TODO ENV
    const botUrl = process.env.NEXT_PUBLIC_BOT_USERNAME + '/' + username;

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(`https://t.me/${botUrl}/app?startapp=${username}`);
            setCopied(true);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <Card className="flex p-4 bg-[var(--tg-theme-bg-color)]">
            <div className="flex items-center w-full max-w-md">
                <div className="text-right flex-1 mr-4 truncate">
                    <p className="text-[var(--tg-theme-hint-color)] text-sm mb-1">
                        Ссылка на профиль
                    </p>
                    <p className="text-[var(--tg-theme-text-color)] truncate">
                        {botUrl}
                    </p>
                </div>
                <Button
                    onClick={copyToClipboard}
                    className="w-11 h-11 flex items-center justify-center rounded-md"
                    style={{
                        backgroundColor: "var(--tg-theme-button-color)",
                        color: "var(--tg-theme-button-text-color)",
                        minWidth: "unset",
                    }}
                >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                </Button>
            </div>
        </Card>
    );
}

