'use client';

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search } from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { SelectInput } from "@/app/components/ui/select";
import { TRANSACTION_CATEGORIES } from "@/app/lib/constants";

interface TransactionFiltersProps {
  queryParams?: {
    searchTerm?: string;
    category?: string;
    type?: string;
    limit?: number;
  };
}

export function TransactionFilters({ 
  queryParams
}: TransactionFiltersProps) {
  const [searchTerm, setSearchTerm] = useState(queryParams?.searchTerm || '');
  const [selectedCategory, setSelectedCategory] = useState(queryParams?.category || 'All');
  const [selectedType, setSelectedType] = useState(queryParams?.type || 'All');
  const [loading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const updateURL = (newLimit?: number) => {
    const params = new URLSearchParams();
    if (searchTerm) params.append('searchTerm', searchTerm);
    if (selectedCategory !== 'All') params.append('category', selectedCategory);
    if (selectedType !== 'All') params.append('type', selectedType);
    
    if (newLimit === undefined) {
      params.append('limit', '8');
    } else {
      params.append('limit', newLimit.toString());
    }
    
    const queryString = params.toString();
    router.push(`${pathname}?${queryString}`);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      updateURL();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, selectedCategory, selectedType]);

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              disabled={loading}
            />
            {loading && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <SelectInput 
              value={selectedCategory} 
              onChange={(e: any) => setSelectedCategory(e.target.value)} 
              options={['All', ...TRANSACTION_CATEGORIES].map((category) => ({ value: category, label: category }))}
            >
              <option value="">All Categories</option>
            </SelectInput>

            <SelectInput 
              value={selectedType} 
              onChange={(e: any) => setSelectedType(e.target.value)} 
              options={['All', 'Expense', 'Income'].map((type) => ({ value: type, label: type }))}
            >
              <option value="">All Types</option>
            </SelectInput>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
