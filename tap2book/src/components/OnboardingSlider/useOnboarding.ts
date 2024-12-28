import { useState, useEffect } from 'react';

const ONBOARDING_SHOWN_KEY = 'onboarding_shown';

export function useOnboarding() {
    localStorage.removeItem(ONBOARDING_SHOWN_KEY);

    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const hasShownOnboarding = localStorage.getItem(ONBOARDING_SHOWN_KEY);
        if (!hasShownOnboarding) {
            setIsOpen(true);
        }
    }, []);

    const closeOnboarding = () => {
        setIsOpen(false);
        localStorage.setItem(ONBOARDING_SHOWN_KEY, 'true');
    };

    return {
        isOpen,
        closeOnboarding,
    };
}