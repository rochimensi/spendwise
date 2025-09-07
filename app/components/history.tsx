'use client';

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import Transaction from '@/app/lib/models/Transaction';
import { TransactionList } from "@/app/components/transaction-list";
import { TransactionFilters } from "@/app/components/transaction-filters";

interface HistoryProps {
  transactions: Transaction[];
  summaryStats: {
    totalExpenses: number;
    totalIncome: number;
    savings: number;
    transactionCount: number;
  };
  queryParams?: {
    searchTerm?: string;
    category?: string;
    type?: string;
    limit?: number;
  };
  totalCount: number;
  hasMore: boolean;
}

export function History({ transactions: initialTransactions, summaryStats, queryParams, totalCount, hasMore }: HistoryProps) {
    const router = useRouter();
    const pathname = usePathname();

    const handleViewMore = () => {
      const currentLimit = queryParams?.limit || 8;
      const newLimit = currentLimit + 8;
      const currentScrollY = window.scrollY;
      
      const params = new URLSearchParams();
      if (queryParams?.searchTerm) params.append('searchTerm', queryParams.searchTerm);
      if (queryParams?.category && queryParams.category !== 'All') params.append('category', queryParams.category);
      if (queryParams?.type && queryParams.type !== 'All') params.append('type', queryParams.type);
      params.append('limit', newLimit.toString());
      
      const queryString = params.toString();
      
      router.replace(`${pathname}?${queryString}`, { scroll: false });
      
      setTimeout(() => {
        window.scrollTo(0, currentScrollY);
      }, 0);
    };

    return (
        <div className="pb-20">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/" className="flex flex-row items-center justify-center transition-all h-12 px-4 py-2 has-[>svg]:px-3 text-primary hover:bg-accent hover:text-accent-foreground size-10 rounded-md">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-xl font-semibold">Transaction History</h1>
            </div>


            <div className="grid grid-cols-2 gap-4 mb-6">
                <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Total Expenses</p>
                        <p className="text-xl font-bold text-red-600">$-{summaryStats.totalExpenses.toFixed(2)}</p>
                    </div>
                    </div>
                </CardContent>
                </Card>
                <Card>
                <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Total Income</p>
                        <p className="text-xl font-bold text-green-600">${summaryStats.totalIncome.toFixed(2)}</p>
                    </div>
                    </div>
                </CardContent>
                </Card>
            </div>


            <TransactionFilters 
              queryParams={queryParams}
            />

            <TransactionList
              transactions={initialTransactions}
            />

            {hasMore && (
              <div className="flex justify-center pt-4">
                <Button 
                  variant="default" 
                  onClick={handleViewMore}
                  className="w-full"
                >
                  View More ({totalCount - initialTransactions.length} remaining)
                </Button>
              </div>
            )}
        </div>
    );
}