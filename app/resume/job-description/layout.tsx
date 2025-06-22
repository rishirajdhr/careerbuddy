export default function JobDescriptionLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <div className="flex-1 overflow-hidden">{children}</div>;
}
