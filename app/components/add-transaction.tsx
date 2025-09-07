'use client';

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import { Badge } from "@/app/components/ui/badge";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { SelectInput } from "@/app/components/ui/select";
import { Textarea } from "@/app/components/ui/textarea";
import { TRANSACTION_CATEGORIES } from "@/app/lib/constants";

export function AddTransaction() {
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<'expense' | 'income'>('expense');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !description) return;
    
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    
    try {
      const formData = new FormData();
      formData.append('amount', amount);
      formData.append('category', category);
      formData.append('description', description);
      formData.append('type', type);
      formData.append('date', new Date().toISOString().split('T')[0]);
      
      const response = await fetch('/api/transactions', {
        method: 'POST',
        body: formData,
      });
      
      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Failed to save transaction');
      }
      
      setSuccess(true);
      
      // Reset form
      setAmount('');
      setCategory('');
      setDescription('');
      setType('expense');
      
      // Show success message briefly
      setTimeout(() => setSuccess(false), 3000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pb-20">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/" className="flex flex-row items-center justify-center transition-all h-12 px-4 py-2 has-[>svg]:px-3 text-primary hover:bg-accent hover:text-accent-foreground size-10 rounded-md">
          <ArrowLeft size={24} />
        </Link>
        <h4 className="text-xl font-semibold">Add Transaction</h4>
      </div>

      <div className="bg-white text-card-foreground flex flex-col gap-6 border rounded-md p-4 md:p-6">
        <div className="@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 pt-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6">
          <h4 className="leading-none">
            New Transaction
          </h4>
          <p className="text-muted-foreground">
            Track your income and expenses
          </p>
        </div>
        <div className="px-6 [&:last-child]:pb-6">
          <form onSubmit={handleSubmit} className="space-y-6">

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50">Transaction Type</label>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant={type === 'expense' ? 'default' : 'outline'}
                  onClick={() => setType('expense')}
                  className="flex-1"
                >
                  Expense
                </Button> 
                <Button
                  type="button"
                  variant={type === 'income' ? 'default' : 'outline'}
                  onClick={() => setType('income')}
                  className="flex-1"
                >
                  Income
                </Button> 
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Amount ($)</Label>
              <Input
                id="amount"
                type="number"
                step="0.01"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <SelectInput 
                value={category} 
                onChange={(e) => setCategory(e.target.value)} 
                options={[
                  { value: '', label: 'Select a category' },
                  ...TRANSACTION_CATEGORIES.map((category) => ({ value: category, label: category }))
                ]} 
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="What was this transaction for?"
                value={description}
                onChange={(e: any) => setDescription(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="p-4 bg-red-100 border border-red-200 rounded-lg">
                <p className="text-sm text-red-800 font-medium">Error</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-100 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 font-medium">Success!</p>
                <p className="text-sm text-green-700">Transaction saved successfully.</p>
              </div>
            )}

            {amount && category && description && (
              <div className="p-4 bg-sky-100 rounded-lg">
                <p className="text-sm font-medium mb-2">Preview:</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{description}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="default" className="text-xs">
                        {category}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  <span className={`font-semibold ${type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                    {type === 'income' ? '+' : '-'}${parseFloat(amount || '0').toFixed(2)}
                  </span>
                </div>
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={!amount || !category || !description || isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Transaction
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}