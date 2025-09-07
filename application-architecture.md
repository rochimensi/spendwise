# SpendWise Application Architecture

## Overview
SpendWise is a Next.js-based personal finance management application that helps users track expenses, analyze spending patterns, and get AI-powered financial advice.

## Application Architecture Diagram

```mermaid
graph TB
    %% External Services
    subgraph "External Services"
        OpenAI[OpenAI API<br/>GPT-4o-mini]
        PostgreSQL[(PostgreSQL Database<br/>Transaction Storage)]
    end

    %% Client Layer
    subgraph "Client Layer"
        Browser[Web Browser]
        Mobile[Mobile Browser]
    end

    %% CDN/Edge
    subgraph "CDN/Edge Layer"
        CDN[CloudFlare/AWS CloudFront<br/>Static Assets & Caching]
    end

    %% Application Layer
    subgraph "Next.js Application"
        subgraph "Frontend Components"
            Dashboard[Dashboard Component<br/>Financial Overview]
            AddTransaction[Add Transaction<br/>Form Component]
            History[Transaction History<br/>Search & Filter]
            AIAdvisor[AI Advisor<br/>Chat Interface]
            Charts[Chart Components<br/>Recharts Library]
        end

        subgraph "Pages"
            HomePage[Home Page<br/>Dashboard View]
            AddPage[Add Page<br/>Transaction Entry]
            HistoryPage[History Page<br/>Transaction List]
            AdvisorPage[Advisor Page<br/>AI Chat]
        end

        subgraph "API Routes"
            TransactionAPI[POST /api/transactions<br/>Create Transaction]
            SearchAPI[GET /api/transactions/search<br/>Search Transactions]
            AIAPI[POST /api/ai-advisor<br/>AI Chat Endpoint]
        end

        subgraph "Business Logic"
            TransactionModel[Transaction Model<br/>Sequelize ORM]
            Validation[Zod Validation<br/>Data Validation]
            Constants[Constants<br/>Categories & Types]
        end

        subgraph "Database Layer"
            Sequelize[Sequelize ORM<br/>Database Abstraction]
            ConnectionPool[Connection Pool<br/>PostgreSQL Driver]
        end
    end

    %% Data Flow
    Browser --> CDN
    Mobile --> CDN
    CDN --> HomePage
    CDN --> AddPage
    CDN --> HistoryPage
    CDN --> AdvisorPage

    HomePage --> Dashboard
    AddPage --> AddTransaction
    HistoryPage --> History
    AdvisorPage --> AIAdvisor

    Dashboard --> Charts
    AddTransaction --> TransactionAPI
    History --> SearchAPI
    AIAdvisor --> AIAPI

    TransactionAPI --> Validation
    TransactionAPI --> TransactionModel
    SearchAPI --> TransactionModel
    AIAPI --> OpenAI

    Validation --> Constants
    TransactionModel --> Sequelize
    Sequelize --> ConnectionPool
    ConnectionPool --> PostgreSQL

    %% Styling
    classDef external fill:#e1f5fe,stroke:#01579b,stroke-width:2px
    classDef frontend fill:#f3e5f5,stroke:#4a148c,stroke-width:2px
    classDef api fill:#e8f5e8,stroke:#1b5e20,stroke-width:2px
    classDef database fill:#fff3e0,stroke:#e65100,stroke-width:2px
    classDef cdn fill:#fce4ec,stroke:#880e4f,stroke-width:2px

    class OpenAI,PostgreSQL external
    class Dashboard,AddTransaction,History,AIAdvisor,Charts,HomePage,AddPage,HistoryPage,AdvisorPage frontend
    class TransactionAPI,SearchAPI,AIAPI,TransactionModel,Validation,Constants,Sequelize,ConnectionPool api
    class CDN cdn
```

## Technology Stack

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom components with Lucide React icons
- **Charts**: Recharts library
- **State Management**: React useState/useEffect

### Backend
- **Runtime**: Node.js
- **Framework**: Next.js API Routes
- **ORM**: Sequelize
- **Database Driver**: PostgreSQL (pg)
- **Validation**: Zod
- **AI Integration**: OpenAI API (GPT-4o-mini)

### Database
- **Primary Database**: PostgreSQL
- **Connection Pooling**: Sequelize built-in pooling
- **Schema**: Single table (transactions) with predefined categories

### External Services
- **AI Service**: OpenAI API for financial advice
- **Database**: PostgreSQL (can be hosted on AWS RDS, Google Cloud SQL, etc.)

## Key Features

### 1. Transaction Management
- Add income/expense transactions
- Categorize transactions (12 predefined categories)
- Form validation with Zod
- Real-time data persistence

### 2. Financial Analytics
- Dashboard with spending overview
- Category-based spending analysis (Pie Chart)
- Weekly spending trends (Bar Chart)
- Monthly financial trends (Area Chart)
- Savings goal tracking

### 3. AI Financial Advisor
- Conversational AI interface
- Context-aware financial advice
- Integration with OpenAI's GPT-4o-mini
- Conversation persistence

### 4. Transaction History
- Search and filter transactions
- Category and type filtering
- Summary statistics
- Pagination support

## Data Flow

1. **User Input**: Users interact with React components
2. **Validation**: Zod validates form data on both client and server
3. **API Processing**: Next.js API routes handle business logic
4. **Database Operations**: Sequelize ORM manages database interactions
5. **Response**: Data flows back through the same path
6. **UI Updates**: React components re-render with new data

## Security Considerations

- Input validation with Zod schemas
- SQL injection protection via Sequelize ORM
- Environment variable management for API keys
- CORS handling (Next.js built-in)
- Error handling and logging

## Scalability Considerations

- Connection pooling for database efficiency
- Static asset optimization via Next.js
- API route separation for microservice migration
- Stateless application design
- CDN integration for global performance

## Deployment Architecture (Future AWS Integration)

The application is designed to integrate with AWS services:
- **Frontend**: AWS S3 + CloudFront
- **Backend**: AWS Lambda + API Gateway
- **Database**: AWS RDS PostgreSQL
- **AI Service**: OpenAI API (external)
- **Monitoring**: AWS CloudWatch
- **CI/CD**: AWS CodePipeline
