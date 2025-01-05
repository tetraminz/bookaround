import { format, parseISO } from 'date-fns';

/**
 * Formats a date string to the API expected format
 * Converts from "2025-01-06T12:56" to "2025-01-06T12:56:00Z"
 */
export function formatDateForAPI(dateString: string): string {
    const date = parseISO(dateString);
    return format(date, "yyyy-MM-dd'T'HH:mm:ss'Z'");
}