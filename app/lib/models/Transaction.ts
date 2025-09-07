import { DataTypes, Model, Op, Optional } from 'sequelize';
import sequelize from '@/app/lib/sequelize';

interface TransactionAttributes {
  id: number;
  amount: number;
  category: string;
  description: string;
  date: Date;
  type: 'expense' | 'income';
}

interface TransactionCreationAttributes extends Optional<TransactionAttributes, 'id'> {}

class Transaction extends Model<TransactionAttributes, TransactionCreationAttributes> implements TransactionAttributes {
  public id!: number;
  public amount!: number;
  public category!: string;
  public description!: string;
  public date!: Date;
  public type!: 'expense' | 'income';

  public getFormattedAmount(): string {
    return Math.abs(this.amount).toFixed(2);
  }

  public getSign(): string {
    return this.type === 'income' ? '+' : '-';
  }

  public getDisplayAmount(): string {
    return `${this.getSign()}$${this.getFormattedAmount()}`;
  }

  public isExpense(): boolean {
    return this.type === 'expense';
  }

  public isIncome(): boolean {
    return this.type === 'income';
  }

  static async getAllTransactions(limit?: number): Promise<Transaction[]> {
    const data = await Transaction.findAll({
      order: [['date', 'DESC']],
      limit: limit || undefined,
    });
    return data.map((item) => item.toJSON());
  }

  static async getTransactionsByType(type: 'expense' | 'income'): Promise<Transaction[]> {
    const data = await Transaction.findAll({
      where: { type },
      order: [['date', 'DESC']],
    });
    return data.map((item) => item.toJSON());
  }

  static async getTransactionsByDateRange(startDate: string, endDate: string): Promise<Transaction[]> {
    const data = await Transaction.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      order: [['date', 'DESC']],
    });
    return data.map((item) => item.toJSON());
  }

  static async insertTransaction(transaction: TransactionCreationAttributes): Promise<Transaction> {
    return await Transaction.create(transaction);
  }

  static async getSpendingByCategory(month: string, year: string): Promise<Array<{name: string, value: number}>> {
    const result = await Transaction.findAll({
      attributes: [
        'category',
        [sequelize.fn('SUM', sequelize.fn('ABS', sequelize.col('amount'))), 'value']
      ],
      where: {
        type: 'expense',
        [Op.and]: [
          sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date')), month),
          sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date')), year),
        ],
      },
      group: ['category'],
      order: [[sequelize.literal('value'), 'DESC']],
      raw: true,
    });
    
    return result.map((item: any) => ({
      name: item.category,
      value: parseFloat(item.value),
    }));
  }

  static async getWeeklySpending(startDate: string, endDate: string): Promise<Array<{day: string, amount: number}>> {
    const result = await Transaction.findAll({
      attributes: [
        [sequelize.fn('TO_CHAR', sequelize.col('date'), 'Dy'), 'day'],
        [sequelize.fn('SUM', sequelize.fn('ABS', sequelize.col('amount'))), 'amount']
      ],
      where: {
        type: 'expense',
        date: {
          [Op.between]: [startDate, endDate],
        },
      },
      group: ['date', sequelize.fn('TO_CHAR', sequelize.col('date'), 'Dy')],
      order: [['date', 'ASC']],
      raw: true,
    });
    
    return result.map((item: any) => ({
      day: item.day,
      amount: parseFloat(item.amount),
    }));
  }

  static async getMonthlyTrends(months: number = 10): Promise<Array<{month: string, income: number, expenses: number, savings: number}>> {
    // For demo purposes. In a real app, calculate this dynamically based on current date
    const startDateString = '2024-01-01';
    const transactions = await Transaction.findAll({
      attributes: ['date', 'amount', 'type'],
      where: {
        date: {
          [Op.gte]: startDateString,
        },
      },
      order: [['date', 'ASC']],
      raw: true,
    });

    const monthlyData = new Map<string, { income: number, expenses: number, savings: number, monthName: string }>();
    
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const startYear = 2024;
    const startMonth = 0;
    const endMonth = 9;

    for (let month = startMonth; month <= endMonth; month++) {
      const monthKey = `${startYear}-${String(month + 1).padStart(2, '0')}`;
      const monthName = monthNames[month];
      
      monthlyData.set(monthKey, {
        income: 0,
        expenses: 0,
        savings: 0,
        monthName: monthName
      });
    }

    transactions.forEach((transaction: any) => {
      const date = new Date(transaction.date);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      
      if (monthlyData.has(monthKey)) {
        const monthData = monthlyData.get(monthKey)!;
        const amount = parseFloat(transaction.amount);
        
        if (transaction.type === 'income') {
          monthData.income += amount;
        } else if (transaction.type === 'expense') {
          monthData.expenses += Math.abs(amount);
        }
        
        monthData.savings = monthData.income - monthData.expenses;
      }
    });

    // Convert to array and sort by date
    return Array.from(monthlyData.entries())
      .map(([monthKey, data]) => ({
        month: data.monthName,
        income: data.income,
        expenses: data.expenses,
        savings: data.savings,
      }))
      .sort((a, b) => {
        // Sort by month order
        const monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        return monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month);
      });
  }

  static async getSummaryStats(month?: string, year?: string): Promise<{
    totalExpenses: number;
    totalIncome: number;
    savings: number;
    transactionCount: number;
  }> {
    const whereClause: any = {};
    
    if (month && year) {
      whereClause[Op.and] = [
        sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM date')), month),
        sequelize.where(sequelize.fn('EXTRACT', sequelize.literal('YEAR FROM date')), year),
      ];
    }

    const result = await Transaction.findAll({
      attributes: [
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN type = 'expense' THEN ABS(amount) ELSE 0 END")), 'total_expenses'],
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN type = 'income' THEN amount ELSE 0 END")), 'total_income'],
        [sequelize.fn('COUNT', sequelize.col('id')), 'transaction_count']
      ],
      where: whereClause,
      raw: true,
    });

    const row = result[0] as any;
    const totalExpenses = parseFloat(row.total_expenses || '0');
    const totalIncome = parseFloat(row.total_income || '0');
    
    return {
      totalExpenses,
      totalIncome,
      savings: totalIncome - totalExpenses,
      transactionCount: parseInt(row.transaction_count || '0')
    };
  }

  static async searchTransactions(searchParams: {
    searchTerm?: string;
    category?: string;
    type?: string;
    limit?: number;
  }): Promise<{
    transactions: Transaction[];
    summaryStats: {
      totalExpenses: number;
      totalIncome: number;
      savings: number;
      transactionCount: number;
    };
    totalCount: number;
    hasMore: boolean;
  }> {
    const whereClause: any = {};

    if (searchParams.searchTerm) {
      whereClause[Op.or] = [
        {
          description: {
            [Op.iLike]: `%${searchParams.searchTerm}%`
          }
        },
        {
          category: {
            [Op.iLike]: `%${searchParams.searchTerm}%`
          }
        }
      ];
    }

    if (searchParams.category && searchParams.category !== 'All') {
      whereClause.category = searchParams.category;
    }

    if (searchParams.type && searchParams.type !== 'All') {
      whereClause.type = searchParams.type.toLowerCase();
    }

    const limit = searchParams.limit || 8;

    const [transactions, statsResult, totalCountResult] = await Promise.all([
      Transaction.findAll({
        where: whereClause,
        order: [['date', 'DESC']],
        limit,
      }),
      Transaction.findAll({
        attributes: [
          [sequelize.fn('SUM', sequelize.literal("CASE WHEN type = 'expense' THEN ABS(amount) ELSE 0 END")), 'total_expenses'],
          [sequelize.fn('SUM', sequelize.literal("CASE WHEN type = 'income' THEN amount ELSE 0 END")), 'total_income'],
          [sequelize.fn('COUNT', sequelize.col('id')), 'transaction_count']
        ],
        where: whereClause,
        raw: true,
      }),
      Transaction.count({
        where: whereClause,
      })
    ]);

    const row = statsResult[0] as any;
    const totalExpenses = parseFloat(row.total_expenses || '0');
    const totalIncome = parseFloat(row.total_income || '0');
    const totalCount = totalCountResult;
    const hasMore = limit < totalCount;
    
    return {
      transactions: transactions.map((item) => item.toJSON()),
      summaryStats: {
        totalExpenses,
        totalIncome,
        savings: totalIncome - totalExpenses,
        transactionCount: parseInt(row.transaction_count || '0')
      },
      totalCount,
      hasMore
    };
  }


}

Transaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('expense', 'income'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Transaction',
    tableName: 'transactions',
    timestamps: false,
  }
);

export default Transaction;
export type { TransactionAttributes, TransactionCreationAttributes };


