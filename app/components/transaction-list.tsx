import { Badge } from "@/app/components/ui/badge";
import { Card, CardContent } from "@/app/components/ui/card";
import { BackToTop } from "@/app/components/back-to-top";
import Transaction from '@/app/lib/models/Transaction';

interface TransactionListProps {
  transactions: Transaction[];
}

export function TransactionList({ 
  transactions
}: TransactionListProps) {
  

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <Card key={transaction.id}>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="font-medium">{transaction.description}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {transaction.category}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {transaction.type}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(transaction.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <div className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                ${transaction.amount}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      
      {transactions.length === 0 && (
        <Card>
          <CardContent className="pt-6 text-center">
            <p className="text-muted-foreground">No transactions found matching your criteria.</p>
          </CardContent>
        </Card>
      )}

      <BackToTop />
    </div>
  );
}
