import { History } from "@/app/components/history";
import Transaction from "@/app/lib/models/Transaction";

interface HistoryPageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

export default async function HistoryPage({ searchParams }: HistoryPageProps) {
  try {
    const params = await searchParams;
    const searchTerm = typeof params.searchTerm === 'string' ? params.searchTerm : undefined;
    const category = typeof params.category === 'string' ? params.category : undefined;
    const type = typeof params.type === 'string' ? params.type : undefined;
    const limit = typeof params.limit === 'string' ? parseInt(params.limit) : 8;

    const searchFilters = { searchTerm, category, type, limit };
    const result = await Transaction.searchTransactions(searchFilters);

    return (
      <main className="flex h-screen flex-col p-6">
        <History 
          transactions={result.transactions} 
          summaryStats={result.summaryStats}
          queryParams={searchFilters}
          totalCount={result.totalCount}
          hasMore={result.hasMore}
        />
      </main>
    );
  } catch (error) {
    console.error('Error fetching history data:', error);
    return (
      <main className="flex h-screen flex-col p-6">
        <div className="text-center py-4">
          <h2 className="text-2xl font-bold text-red-600">Error Loading History</h2>
          <p className="text-muted-foreground">There was an error loading your transaction history. Please try again.</p>
        </div>
      </main>
    );
  }
}
  