'use client';

import { useEffect } from 'react';
import { classNames } from '@telegram-apps/sdk-react';

import './styles.css';

interface ModalProps {
    children: React.ReactNode;
    isOpen: boolean;
    onClose?: () => void;
    className?: string;
}

export function Modal({ children, isOpen, onClose, className }: ModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div
                className={classNames('modal-content', className)}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
        </div>
    );
}