# Development Guide

This guide covers everything you need to know to contribute to the Solana Support platform, from local setup to deployment.

## 🏗 Project Architecture

### Overview

```
Solana Support Platform
├── Frontend Dashboard (React + Vite)
├── Widget Package (NPM distributable)
├── Backend API (Express.js)
└── Database (PostgreSQL + Prisma)
```

### Technology Stack

| Component      | Technologies                                         |
| -------------- | ---------------------------------------------------- |
| **Frontend**   | React 19, TypeScript, Vite, TailwindCSS 4, shadcn/ui |
| **Widget**     | React, TypeScript, Rollup, Solana Web3.js            |
| **Backend**    | Express.js, TypeScript, Prisma, Joi validation       |
| **Database**   | PostgreSQL, Prisma ORM                               |
| **Blockchain** | Solana Web3.js, Wallet Adapter                       |
| **Deployment** | Vercel (Frontend), Railway (API), Neon.tech (DB)     |

## 🚀 Quick Setup

### Prerequisites

- **Node.js 18+** and npm
- **PostgreSQL database** (Neon.tech recommended for cloud)
- **Solana wallet** (Phantom or Solflare for testing)
- **Git** for version control

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/solana-support-platform.git
cd solana-support-platform

# Install main project dependencies
npm install

# Install widget dependencies
cd widget
npm install
cd ..
```

### 2. Environment Setup

```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` with your configuration:

```bash
# Database (get from Neon.tech)
DATABASE_URL="postgresql://username:password@hostname/dbname?sslmode=require"

# Solana Configuration
VITE_SOLANA_RPC_URL="https://api.devnet.solana.com"
VITE_SOLANA_NETWORK="devnet"
VITE_DEV_WALLET_ADDRESS="YOUR_SOLANA_WALLET_ADDRESS"

# Application URLs
VITE_APP_URL="http://localhost:5173"
VITE_API_URL="http://localhost:3001"
```

### 3. Database Setup

```bash
# Generate Prisma client
npm run db:generate

# Push schema to database (creates tables)
npm run db:push

# Optional: Open Prisma Studio to view data
npm run db:studio
```

### 4. Build Widget

```bash
cd widget
npm run build
cd ..
```

### 5. Start Development

```bash
# Start the main dashboard
npm run dev

# In another terminal, start the API (when implemented)
cd api
npm run dev
```

Visit `http://localhost:5173` to see the dashboard.

## 📁 Project Structure Deep Dive

### Main Application (`/src`)

```
src/
├── components/
│   ├── ui/              # shadcn/ui base components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   └── ...
│   ├── Header.tsx       # Main navigation
│   └── SupportBadge.tsx # Preview component
├── pages/
│   ├── ProjectsList.tsx    # Dashboard home
│   ├── ProjectDetail.tsx   # Individual project view
│   └── ProjectSettings.tsx # Project configuration
├── lib/
│   └── utils.ts         # Utility functions
├── App.tsx              # Main app with routing
├── main.tsx             # Application entry point
└── index.css            # Global styles
```

### Widget Package (`/widget`)

```
widget/
├── src/
│   ├── SolanaSupport.tsx  # Main widget component
│   ├── types.ts           # TypeScript interfaces
│   └── index.ts           # Package exports
├── dist/                  # Built package (generated)
├── package.json           # NPM package configuration
├── rollup.config.js       # Build configuration
└── tsconfig.json          # TypeScript configuration
```

### Database (`/prisma`)

```
prisma/
└── schema.prisma       # Database schema definition
```

## 🧩 Component Development

### UI Components

We use **shadcn/ui** for consistent, accessible components:

```tsx
// Example: Creating a new UI component
import { cn } from '@/lib/utils'

interface MyComponentProps {
  children: React.ReactNode
  variant?: 'default' | 'secondary'
  className?: string
}

export function MyComponent({
  children,
  variant = 'default',
  className,
}: MyComponentProps) {
  return (
    <div
      className={cn(
        'base-styles',
        variant === 'secondary' && 'secondary-styles',
        className
      )}
    >
      {children}
    </div>
  )
}
```

### Page Components

Follow this pattern for new pages:

```tsx
// src/pages/NewPage.tsx
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'

export default function NewPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch data
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      <h1 className='text-3xl font-bold'>New Page</h1>
      {/* Page content */}
    </div>
  )
}
```

## 🎨 Styling Guidelines

### TailwindCSS 4

We use the latest TailwindCSS with custom CSS variables:

```css
/* Custom properties in src/index.css */
:root {
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(0.985 0 0);
  /* ... */
}
```

### Component Styling

```tsx
// Use cn() utility for conditional classes
import { cn } from '@/lib/utils'

;<div
  className={cn(
    'base-classes',
    isActive && 'active-classes',
    variant === 'large' && 'size-classes',
    className
  )}
/>
```

### Responsive Design

```tsx
// Mobile-first approach
<div
  className='
  grid gap-4 
  md:grid-cols-2 
  lg:grid-cols-3
  xl:grid-cols-4
'
/>
```

## 🔗 Solana Integration

### Wallet Connection

```tsx
import { useWallet } from '@solana/wallet-adapter-react'

function MyComponent() {
  const { connected, publicKey, signTransaction } = useWallet()

  if (!connected) {
    return <div>Please connect your wallet</div>
  }

  // Use wallet functionality
}
```

### Transaction Handling

```tsx
import { Connection, Transaction, SystemProgram } from '@solana/web3.js'

const handleDonation = async () => {
  const connection = new Connection(rpcUrl)
  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: publicKey!,
      toPubkey: recipientKey,
      lamports: amount * LAMPORTS_PER_SOL,
    })
  )

  const signed = await signTransaction!(transaction)
  const signature = await connection.sendRawTransaction(signed.serialize())
}
```

## 🔧 Widget Development

### Building the Widget

```bash
cd widget
npm run build    # Creates optimized bundle
npm run dev      # Watch mode for development
```

### Testing Widget Locally

```bash
# Link package locally
cd widget
npm link

# Use in main project
cd ..
npm link @solana-support/widget
```

### Widget API

```tsx
// Full widget configuration
<SolanaSupport
  projectId='required-project-id'
  apiUrl='https://api.solana-support.dev' // Optional
  theme='default' // 'default' | 'dark' | 'minimal'
  size='md' // 'sm' | 'md' | 'lg'
  showAmount={true} // Show raised amount
  showGoal={false} // Show progress bar
  className='custom-classes' // Additional CSS
/>
```

## 🗄 Database Development

### Schema Changes

```bash
# After modifying prisma/schema.prisma
npm run db:generate  # Update Prisma client
npm run db:push      # Apply to database
```

### Common Patterns

```typescript
// Using Prisma client
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Create with relations
const project = await prisma.project.create({
  data: {
    name: 'New Project',
    walletAddress: '...',
    donations: {
      create: [{ amount: 1.0, donorWallet: '...' }],
    },
  },
  include: {
    donations: true,
    _count: {
      select: { donations: true },
    },
  },
})
```

## 🧪 Testing

### Component Testing

```tsx
// Example test structure
import { render, screen } from '@testing-library/react'
import { MyComponent } from './MyComponent'

test('renders component correctly', () => {
  render(<MyComponent />)
  expect(screen.getByText('Expected Text')).toBeInTheDocument()
})
```

### Widget Testing

```bash
# Test widget in isolation
cd widget
npm run build
npm pack  # Creates .tgz file for testing
```

## 🚀 Deployment

### Frontend (Vercel)

```bash
# Build for production
npm run build

# Deploy to Vercel
npx vercel --prod
```

### Widget (NPM)

```bash
cd widget
npm run build
npm version patch  # Increment version
npm publish        # Publish to NPM
```

### Environment Variables

Set these in your deployment platform:

```bash
# Production
DATABASE_URL="postgresql://prod-connection-string"
VITE_SOLANA_RPC_URL="https://api.mainnet-beta.solana.com"
VITE_SOLANA_NETWORK="mainnet-beta"
```

## 🐛 Debugging

### Common Issues

**Database Connection**

```bash
# Test database connection
npx prisma db push
```

**Widget Build Errors**

```bash
# Clear node_modules and rebuild
cd widget
rm -rf node_modules dist
npm install
npm run build
```

**Wallet Connection Issues**

- Ensure wallet extension is installed
- Check network settings (devnet vs mainnet)
- Verify RPC endpoint is accessible

### Development Tools

```bash
# Database management
npm run db:studio

# Type checking
npx tsc --noEmit

# Linting
npm run lint
```

## 📝 Code Style

### TypeScript

```typescript
// Use interfaces for props
interface ComponentProps {
  title: string
  optional?: boolean
}

// Use type for unions
type Theme = 'default' | 'dark' | 'minimal'

// Prefer const assertions
const themes = ['default', 'dark', 'minimal'] as const
```

### React Patterns

```tsx
// Prefer function components
export default function Component({ prop }: Props) {
  return <div>{prop}</div>
}

// Use proper hooks
const [state, setState] = useState<Type>(initialValue)
const value = useMemo(() => computation, [dep])
```

### File Naming

- **Components**: `PascalCase.tsx`
- **Pages**: `PascalCase.tsx`
- **Utilities**: `camelCase.ts`
- **Types**: `camelCase.ts`

## 🤝 Contributing Workflow

### 1. Fork & Branch

```bash
git checkout -b feature/amazing-feature
```

### 2. Development

- Write code following the style guide
- Add tests for new functionality
- Update documentation if needed

### 3. Testing

```bash
npm run lint     # Check code style
npm run build    # Ensure builds work
cd widget && npm run build  # Test widget build
```

### 4. Commit & Push

```bash
git add .
git commit -m "feat: add amazing feature"
git push origin feature/amazing-feature
```

### 5. Pull Request

- Use clear PR title and description
- Link any related issues
- Add screenshots for UI changes

## 📚 Resources

- **React Documentation**: [react.dev](https://react.dev)
- **Solana Web3.js**: [solana-labs.github.io/solana-web3.js](https://solana-labs.github.io/solana-web3.js)
- **Prisma Documentation**: [prisma.io/docs](https://prisma.io/docs)
- **TailwindCSS**: [tailwindcss.com](https://tailwindcss.com)
- **shadcn/ui**: [ui.shadcn.com](https://ui.shadcn.com)

## 💬 Getting Help

- **GitHub Issues**: Report bugs and request features
- **Discord**: Join our development community
- **Discussions**: Ask questions and share ideas

---

Happy coding! 🚀
