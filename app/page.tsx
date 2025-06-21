import Link from "next/link";

export default function Home() {
    return (
        <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
            <div className="space-y-4 text-center">
                <h1 className="text-2xl font-bold">Nothing to see here!</h1>
                <p className="text-lg text-muted-foreground">
                    Go check out the{" "}
                    <Link
                        href="/resume"
                        className="font-medium text-blue-600 underline hover:text-blue-800"
                    >
                        resume generator
                    </Link>
                </p>
            </div>
        </div>
    );
}
