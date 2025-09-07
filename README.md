
# spendwise
Mobile-friendly web application that helps users track their expenses and get AI-powered financial advice.

# Setup Guide

## Install Dependencies

Install dependencies from `package.json` locally.

```bash
npm install
```

## Database setup 

**Database setup must be done manually on your local environment.**

This guide will help you set up PostgreSQL for your SpendWise application. 

### Prerequisites

- **PostgreSQL server** installed and running locally
- **Node.js 18+** installed
- Next.js app dependencies installed (`npm install`)

### 1. Start PostgreSQL Server

Make sure PostgreSQL is running on your local machine.

### 2. Create the Database

Connect to PostgreSQL and create the `spendwise` database:

```bash
# Connect to PostgreSQL as superuser
psql -U postgres

# Create the spendwise database
CREATE DATABASE spendwise;

# Connect to the new database
\c spendwise

# Exit psql
\q
```

### 3. Run the SQL Script

Execute the provided SQL script to create the transactions table and insert seed data:

```bash
# Run the SQL script
psql -U postgres -d spendwise -f app/lib/schema.sql
```

**What this script does:**
- Creates the `transactions` table with proper schema
- Inserts sample transaction data (2024 data from January to October)
- Sets up proper data types and constraints

### 4. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```bash
# Database Configuration (REQUIRED)
DATABASE_URL="postgresql://username:password@localhost:5432/spendwise"

# Optional: Database connection pool settings
DB_POOL_MIN=2
DB_POOL_MAX=10

# App Configuration
NODE_ENV=development

#OpenAI API Key
OPENAI_API_KEY=your_api_key_here

```

**Replace the values:**
- `username`: Your PostgreSQL username (usually `postgres`)
- `password`: Your PostgreSQL password
- `localhost:5432`: Your PostgreSQL host and port (default)
- `spendwise`: Your database name

### 5. Test the Connection

Start your application to test the database connection:

```bash
npm run dev
```

Visit `http://localhost:3000` to see your dashboard with seed Data.

## Features Enabled

With this setup, you now have:

- **Sequelize ORM** - Type-safe database operations
- **Real-time Calculations** - Charts update with database data
- **Transaction Management** - Add, view, and filter transactions
- **Performance Optimized** - Server-side rendering with fresh data
- **Scalable Architecture** - Easy to add more features

## Future Enhancements

1. **Customize Categories** - Modify the seed data in `./schema.sql`
2. **Add More Charts** - Create new database queries in the Transaction model
3. **User Authentication** - Add user_id to transactions table
4. **Data Export** - Add CSV/PDF export functionality
5. **AI for Transaction creation** - Add transactions through voice, text or images.