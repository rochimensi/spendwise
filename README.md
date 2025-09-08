# SpendWise - Personal Finance Management Application

## Overview

**SpendWise** is a modern, mobile-friendly web application designed to help users track their expenses, analyze spending patterns, and receive AI-powered financial advice. Built with Next.js 14 and TypeScript, it provides a comprehensive solution for personal finance management with an intuitive user interface and powerful analytics.

## Table of Contents

- [Core Features](#core-features)
- [Technical Architecture](#technical-architecture)
- [Key Features](#key-features)
- [API Endpoints](#api-endpoints)
- [Setup Guide](#setup-guide---prerequisites)
- [Future Enhancements](#future-enhancements)
- [AWS Deployment Architecture](#aws-deployment-architecture)

## Core Features

### 1. **Transaction Management**
- **Add Transactions**: Simple form to record income and expenses
- **Categorization**: 12 predefined categories (groceries, rent, utilities, dining, transportation, entertainment, shopping, healthcare, salary, freelance, investments, other)
- **Real-time Validation**: Zod-based validation for data integrity

### 2. **Financial Analytics Dashboard**
- **Spending Overview**: Real-time financial summary with income, expenses, and savings
- **Visual Analytics**: Three interactive chart types:
  - **Pie Chart**: Category-based spending breakdown
  - **Bar Chart**: Weekly spending trends
  - **Area Chart**: Monthly financial trends (income vs expenses vs savings)
- **Summary Statistics**: Total transactions, savings rate, and financial health indicators

### 3. **AI Financial Advisor**
- **Conversational Interface**: Chat-based AI advisor powered by OpenAI GPT-4o-mini
- **Context-Aware Advice**: Tailored financial guidance based on spending categories
- **Professional Guidance**: Expert-level financial advice in accessible language

### 4. **Transaction History & Search**
- **Advanced Search**: Search by description, category, or transaction type
- **Filtering Options**: Filter by category or type (income/expense)
- **Pagination**: Efficient handling of large transaction datasets
- **Summary Statistics**: Filtered results with financial summaries


## Technical Architecture

### **Frontend Stack**
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom components with Lucide React icons
- **Charts**: Recharts library for data visualization
- **State Management**: React hooks (useState, useEffect)

### **Backend Stack**
- **Runtime**: Node.js 18.18.0
- **API**: Next.js API Routes
- **ORM**: Sequelize with PostgreSQL
- **Validation**: Zod schemas for type-safe validation
- **AI Integration**: OpenAI API (GPT-4o-mini)

### **Database**
- **Primary Database**: PostgreSQL
- **Schema**: Single `transactions` table
- **Connection Pooling**: Sequelize built-in connection management
- **Seed Data**: Pre-populated with realistic 2024 transaction data



## Key Features

### **Dashboard Analytics**
The dashboard provides comprehensive financial insights through multiple visualization types:

1. **Financial Summary Cards**:
   - Total Income (current month)
   - Total Expenses (current month)
   - Net Savings (calculated)

2. **Category Spending (Pie Chart)**:
   - Visual breakdown of expenses by category
   - Color-coded segments for easy identification
   - Percentage and absolute value display

3. **Weekly Trends (Bar Chart)**:
   - Day-by-day spending patterns
   - Identifies high-spending days
   - Helps with weekly budget planning

4. **Monthly Trends (Area Chart)**:
   - Income vs expenses over time
   - Savings trend visualization
   - Long-term financial health tracking

### **AI Advisor Capabilities**
The AI advisor is specifically trained for financial guidance:

- **Spending Pattern Analysis**: Understands the 12 transaction categories
- **Budgeting Advice**: Provides actionable saving strategies
- **Financial Education**: Explains concepts in beginner-friendly terms
- **Goal Setting**: Helps establish and track financial objectives
- **Habit Building**: Encourages healthy financial behaviors



## API Endpoints

### **Transaction Management**
- `POST /api/transactions` - Create new transaction
- `GET /api/transactions/search` - Search and filter transactions

### **AI Services**
- `POST /api/ai-advisor` - Get AI financial advice

### **Request/Response Examples**

#### Create Transaction
```typescript
POST /api/transactions
Content-Type: application/x-www-form-urlencoded

{
  amount: "150.00",
  category: "groceries",
  description: "Weekly grocery shopping",
  type: "expense",
  date: "2024-01-15"
}
```

#### Search Transactions
```typescript
GET /api/transactions/search?searchTerm=groceries&category=groceries&type=expense
```

#### AI Advisor Chat
```typescript
POST /api/ai-advisor
Content-Type: application/json

{
  "message": "How can I reduce my dining expenses?",
  "conversation_id": "optional-conversation-id"
}
```


## Setup Guide - Prerequisites

- Node.js 18.18.0+
- PostgreSQL 12+ installed and running locally
- npm 9.0.0+
- Next.js app dependencies installed (`npm install`)
  
## Install Dependencies

Install dependencies from `package.json` locally.

```bash
npm install
```

## Database setup 

**Database setup must be done manually on your local environment.**

This guide will help you set up PostgreSQL for your SpendWise application. 

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

With this setup, you now have:

- **Sequelize ORM** - Type-safe database operations
- **Real-time Calculations** - Charts update with database data
- **Transaction Management** - Add, view, and filter transactions
- **Performance Optimized** - Server-side rendering with fresh data
- **Scalable Architecture** - Easy to add more features


## Future Enhancements

### **Planned Features**
1. **User Authentication**: Multi-user support with secure authentication
2. **Data Export**: CSV/PDF export functionality
3. **Budget Goals**: Set and track spending goals
4. **Recurring Transactions**: Automatic recurring transaction handling
5. **Receipt Upload**: Image-based transaction creation
6. **Voice Input**: Voice-to-text transaction entry
7. **Advanced Analytics**: More sophisticated financial insights
8. **Investment Tracking**: Portfolio and investment management
9. **Customize Categories** - Modify the seed data in `./schema.sql`

## AWS Deployment Architecture

The following diagram shows how SpendWise would be deployed on AWS using a containerized, scalable architecture:

```mermaid
graph TB
    subgraph "AWS Cloud"
        subgraph "Global Infrastructure"
            R53[Route 53<br/>DNS & Health Checks]
            CF[CloudFront<br/>Global CDN]
        end
        
        subgraph "Compute Layer"
            AG[API Gateway<br/>Request Management]
            ALB[Application Load Balancer<br/>Traffic Distribution]
        end
        
        subgraph "Container Services"
            ECS[Amazon ECS<br/>Container Orchestration]
            Fargate[Amazon Fargate<br/>Serverless Containers]
            
            subgraph "SpendWise Application"
                NextJS[Next.js Application]
                Frontend[React Frontend<br/>• Dashboard<br/>• Transaction Management<br/>• AI Advisor<br/>• Charts & Analytics]
                API[API Routes<br/>• /api/transactions<br/>• /api/ai-advisor<br/>• /api/transactions/search]
                Logic[Server Logic<br/>• Sequelize ORM<br/>• Zod Validations<br/>• Business Logic]
            end
        end
        
        subgraph "Data Layer"
            RDS[Amazon RDS PostgreSQL<br/>Multi-AZ Deployment]
            Primary[(Primary DB<br/>AZ-1)]
            Standby[(Standby DB<br/>AZ-2)]
            S3[Amazon S3<br/>Static Assets & Backups]
        end
        
        subgraph "Security & Monitoring"
            Cognito[Amazon Cognito<br/>User Authentication]
            CW[CloudWatch<br/>Monitoring & Logging]
            RDSInsights[RDS Performance Insights<br/>Database Monitoring]
        end
    end
    
    %% User connections
    User[Users] --> R53
    User --> CF
    
    %% Infrastructure flow
    R53 --> CF
    CF --> AG
    AG --> ALB
    ALB --> ECS
    ECS --> Fargate
    Fargate --> NextJS
    
    %% Application internal flow
    NextJS --> Frontend
    NextJS --> API
    NextJS --> Logic
    
    %% Data connections
    API --> RDS
    Logic --> RDS
    RDS --> Primary
    RDS --> Standby
    Primary -.-> Standby
    
    %% Storage connections
    NextJS --> S3
    RDS --> S3
    
    %% Security connections
    AG --> Cognito
    API --> Cognito
    
    %% Monitoring connections
    ECS --> CW
    RDS --> RDSInsights
    CW --> RDSInsights
    
    %% Styling
    classDef aws fill:#ff9900,stroke:#232f3e,stroke-width:2px,color:#fff
    classDef app fill:#61dafb,stroke:#20232a,stroke-width:2px,color:#000
    classDef data fill:#336791,stroke:#fff,stroke-width:2px,color:#fff
    classDef security fill:#ff6b6b,stroke:#fff,stroke-width:2px,color:#fff
    
    class R53,CF,AG,ALB,ECS,Fargate,RDS,S3,Cognito,CW,RDSInsights aws
    class NextJS,Frontend,API,Logic app
    class Primary,Standby data
    class Cognito security
```

### Architecture Benefits

- **Scalability**: Auto-scaling based on demand with ECS Fargate
- **Reliability**: Multi-AZ deployment with automatic failover
- **Security**: Multiple layers including Cognito, IAM, and encryption
- **Performance**: Global CDN with CloudFront and optimized database access
- **Cost Optimization**: Pay-per-use model with no over-provisioning
- **Monitoring**: Comprehensive observability with CloudWatch and RDS Insights
