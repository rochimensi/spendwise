import { NextRequest, NextResponse } from 'next/server';
import Transaction from '@/app/lib/models/Transaction';
import { 
  formatValidationErrors,
  validateTransactionForm, 
  validateTransactionInsert
} from '@/app/lib/validations';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const rawData = {
      amount: formData.get('amount'),
      category: formData.get('category'),
      description: formData.get('description'),
      type: formData.get('type') as string,
      date: formData.get('date') as string,
    };

    const validationResult = validateTransactionForm(rawData);    
    if (!validationResult.success) {
      const errors = formatValidationErrors(validationResult.error);
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: errors,
          message: 'Please check your input and try again.'
        },
        { status: 400 }
      );
    }

    const { amount, category, description, type, date } = validationResult.data;

    const amountNum = parseFloat(amount);
    const finalAmount = type === 'expense' ? -amountNum : amountNum;

    const transactionData = {
      amount: finalAmount,
      category: category.toLowerCase(),
      description: description.trim(),
      date,
      type: type as 'expense' | 'income'
    };

    const insertValidation = validateTransactionInsert(transactionData);
    
    if (!insertValidation.success) {
      const errors = formatValidationErrors(insertValidation.error);
      return NextResponse.json(
        { 
          error: 'Data validation failed',
          details: errors,
          message: 'Invalid transaction data.'
        },
        { status: 400 }
      );
    }

    const transaction = await Transaction.insertTransaction(transactionData);

    return NextResponse.json(
      { 
        message: 'Transaction saved successfully',
        transaction,
        summary: {
          type: transaction.type,
          amount: Math.abs(transaction.amount),
          category: transaction.category,
          date: transaction.date
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error saving transaction:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('duplicate key')) {
        return NextResponse.json(
          { error: 'Transaction already exists' },
          { status: 409 }
        );
      }
      
      if (error.message.includes('foreign key')) {
        return NextResponse.json(
          { error: 'Invalid reference data' },
          { status: 400 }
        );
      }
    }

    return NextResponse.json(
      { 
        error: 'Failed to save transaction',
        message: 'An unexpected error occurred. Please try again.'
      },
      { status: 500 }
    );
  }
}
