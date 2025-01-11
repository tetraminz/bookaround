export default function UserLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-[var(--tg-theme-bg-color)]">
            {children}
        </div>
    );
}