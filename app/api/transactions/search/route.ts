import { NextRequest, NextResponse } from 'next/server';
import Transaction from '@/app/lib/models/Transaction';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const searchTerm = searchParams.get('searchTerm') || undefined;
    const category = searchParams.get('category') || undefined;
    const type = searchParams.get('type') || undefined;

    const searchFilters = { searchTerm, category, type };
    
    const result = await Transaction.searchTransactions(searchFilters);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error searching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to search transactions' },
      { status: 500 }
    );
  }
}
