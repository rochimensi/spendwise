export const TRANSACTION_CATEGORIES = [
  'groceries',
  'rent',
  'utilities',
  'dining',
  'transportation',
  'entertainment',
  'shopping',
  'healthcare',
  'salary',
  'freelance',
  'investments',
  'other'
] as const;

export const TRANSACTION_TYPES = ['expense', 'income'] as const;

export type TransactionCategory = typeof TRANSACTION_CATEGORIES[number];
export type TransactionType = typeof TRANSACTION_TYPES[number];
