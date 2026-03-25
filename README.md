# Portfolio Manager WebApp

A Next.js application for tracking stock performance and fundamental data.

## Features
- **Dashboard**: Market overview with a searchable list of stocks.
- **Company Pages**: Detailed stock information, historical price charts, and fundamental metrics.
- **Database**: Powered by PostgreSQL and Prisma ORM.

## Tech Stack
- **Framework**: Next.js 14/15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Charts**: Recharts
- **ORM**: Prisma

## Getting Started

### 1. Prerequisites
- Node.js 18+
- A PostgreSQL database (`trading_db`)

### 2. Environment Variables
Create a `.env` file in the `webapp` directory and add your database connection string:

```env
DATABASE_URL="postgresql://user:password@host:port/trading_db?schema=public"
```

### 3. Installation
```bash
npm install
```

### 4. Database Setup
Since the database already exists, you can introspect the schema and generate the Prisma Client:

```bash
npx prisma db pull
npx prisma generate
```

### 5. Running the App
```bash
npm run dev
```
The app will be available at `http://localhost:3000`.

## Development
To add more UI components, use:
```bash
npx shadcn@latest add [component-name]
```
