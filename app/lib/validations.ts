import { z } from 'zod';

export const TransactionTypeEnum = z.enum(['expense', 'income']);

export const CategoryEnum = z.enum([
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
]);

export const TransactionSchema = z.object({
  amount: z.coerce
    .number()
    .positive('Amount must be positive'),
  
  category: CategoryEnum,
  
  description: z
    .string()
    .min(1, 'Description is required'),
  
  type: TransactionTypeEnum,
  
  date: z
    .string()
    .min(1, 'Date is required')
    .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
});

export const TransactionFormSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, 'Amount must be a positive number'),
  
  category: z
    .string()
    .min(1, 'Category is required')
    .refine((val) => CategoryEnum.safeParse(val.toLowerCase()).success, 'Invalid category'),
  
  description: z
    .string()
    .min(1, 'Description is required')
    .trim(),
  
  type: z
    .string()
    .refine((val) => TransactionTypeEnum.safeParse(val).success, 'Invalid transaction type'),
  
  date: z
    .string()
    .min(1, 'Date is required')
    .refine((val) => !isNaN(Date.parse(val)), 'Invalid date format')
});

export const TransactionInsertSchema = z.object({
  amount: z.number(),
  category: z.string().toLowerCase(),
  description: z.string().trim(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date format'),
  type: TransactionTypeEnum,
});

export type TransactionType = z.infer<typeof TransactionTypeEnum>;
export type CategoryType = z.infer<typeof CategoryEnum>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionFormData = z.infer<typeof TransactionFormSchema>;
export type TransactionInsert = z.infer<typeof TransactionInsertSchema>;

export const validateTransactionForm = (data: unknown) => {
  return TransactionFormSchema.safeParse(data);
};

export const validateTransactionInsert = (data: unknown) => {
  return TransactionInsertSchema.safeParse(data);
};

export const formatValidationErrors = (errors: z.ZodError) => {
  return errors.issues.map((error: any) => ({
    field: error.path.join('.'),
    message: error.message
  }));
};


