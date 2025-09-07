# SpendWise - Personal Finance Management Application

## Overview

**SpendWise** is a modern, mobile-friendly web application designed to help users track their expenses, analyze spending patterns, and receive AI-powered financial advice. Built with Next.js 14 and TypeScript, it provides a comprehensive solution for personal finance management with an intuitive user interface and powerful analytics.

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

-------

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

-------

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

------

# API Endpoints

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

------

# Setup Guide

## Prerequisites

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

-------

# Future Enhancements

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

### **Technical Improvements**
1. **Real-time Updates**: WebSocket integration for live data
2. **Offline Support**: Service worker for offline functionality
3. **Push Notifications**: Budget alerts and reminders
4. **Advanced Search**: Full-text search with Elasticsearch
5. **API Rate Limiting**: Enhanced API security
6. **Monitoring**: Application performance monitoring

------

# **AWS Deployment Architecture**

The following diagram shows how SpendWise would be deployed on AWS using a containerized, scalable architecture:

```mermaid
C4Deployment
    title SpendWise - AWS Containerized Architecture

    Deployment_Node(aws, "AWS Cloud", "Amazon Web Services") {
        Deployment_Node(dns, "DNS & CDN", "Global Distribution") {
            Container(route53, "Route 53", "DNS", "DNS resolution and health checks")
            Container(cloudfront, "CloudFront", "CDN", "Global content delivery and DDoS protection")
        }
        
        Deployment_Node(api, "API Gateway", "Request Management") {
            Container(apigateway, "API Gateway", "AWS", "Request routing, throttling, and API management")
        }
        
        Deployment_Node(lb, "Load Balancer", "Traffic Distribution") {
            Container(alb, "Application Load Balancer", "AWS", "Traffic distribution and health checks")
        }
        
        Deployment_Node(ecs, "Container Services", "ECS Cluster") {
            Deployment_Node(fargate, "Fargate", "Serverless Containers") {
                Container(spendwise, "SpendWise App", "Next.js", "Full-stack financial management application") {
                    Component(frontend, "Frontend", "React", "Dashboard, Transactions, AI Advisor, Charts")
                    Component(api_routes, "API Routes", "Next.js", "/api/transactions, /api/ai-advisor")
                    Component(server_logic, "Server Logic", "Node.js", "Sequelize ORM, Zod Validations")
                }
            }
        }
        
        Deployment_Node(data, "Data Layer", "Database & Storage") {
            Deployment_Node(rds, "RDS Multi-AZ", "PostgreSQL") {
                ContainerDb(primary_db, "Primary DB", "PostgreSQL", "Main database instance (AZ-1)")
                ContainerDb(standby_db, "Standby DB", "PostgreSQL", "Standby instance (AZ-2)")
            }
            Container(s3, "S3", "AWS", "Static assets and database backups")
        }
        
        Deployment_Node(auth, "Authentication", "User Management") {
            Container(cognito, "Amazon Cognito", "AWS", "User identity and access management")
        }
        
        Deployment_Node(monitoring, "Monitoring", "Observability") {
            Container(cloudwatch, "CloudWatch", "AWS", "Metrics, logs, and dashboards")
            Container(rds_insights, "RDS Performance Insights", "AWS", "Database performance monitoring")
        }
    }

    Rel(route53, cloudfront, "Routes DNS queries")
    Rel(cloudfront, apigateway, "Serves cached content")
    Rel(apigateway, alb, "Routes API requests")
    Rel(alb, spendwise, "Load balances traffic")
    Rel(spendwise, primary_db, "Reads/Writes", "Sequelize ORM")
    Rel(spendwise, standby_db, "Failover", "Automatic failover")
    Rel(primary_db, standby_db, "Replicates", "Synchronous replication")
    Rel(spendwise, s3, "Stores assets", "Static files")
    Rel(primary_db, s3, "Backups", "Automated backups")
    Rel(apigateway, cognito, "Authenticates", "User validation")
    Rel(spendwise, cloudwatch, "Sends metrics", "Application monitoring")
    Rel(primary_db, rds_insights, "Performance data", "Database metrics")
    Rel(cloudwatch, rds_insights, "Aggregates", "Unified monitoring")
```

### **Architecture Benefits**

- **Scalability**: Auto-scaling based on demand with ECS Fargate
- **Reliability**: Multi-AZ deployment with automatic failover
- **Security**: Multiple layers including Cognito, IAM, and encryption
- **Performance**: Global CDN with CloudFront and optimized database access
- **Cost Optimization**: Pay-per-use model with no over-provisioning
- **Monitoring**: Comprehensive observability with CloudWatch and RDS Insights