import { PiggyBank } from "lucide-react";

export function Header() {
    return (
        <div className="bg-background border-b border-border sticky top-0 z-10">
            <div className="max-w-md mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
                <div>
                <div className="flex items-center gap-2">
                    <PiggyBank className="h-6 w-6 text-primary" />
                    <h1 className="text-xl font-semibold">SpendWise</h1>
                </div>
                <p className="text-sm text-muted-foreground">Smart financial management</p>
                </div>
                <div className="w-10 h-10 text-blue-600 bg-sky-100 font-medium flex size-full items-center justify-center rounded-full">
                    JD
                </div>
            </div>
            </div>
      </div>
    );
}