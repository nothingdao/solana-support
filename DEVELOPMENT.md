# Development Guide

Complete development setup for the SolanaFund platform.

## 🏗 Architecture

```
SolanaFund Platform (Netlify Full-Stack)
├── React Dashboard (Frontend)
├── Netlify Functions (Backend API)
├── PostgreSQL Database (Neon.tech)
└── NPM Widget Package
```

## ⚡ Quick Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon.tech)
- Solana wallet (Phantom/Solflare)

### 1. Clone & Install

```bash
git clone https://github.com/yourusername/solana-support-platform.git
cd solana-support-platform
npm install
npm install -g netlify-cli
```

### 2. Environment Setup

```bash
cp .env.example .env
```

Edit `.env`:

```bash
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"
VITE_SOLANA_RPC_URL="https://api.devnet.solana.com"
VITE_SOLANA_NETWORK="devnet"
VITE_DEV_WALLET_ADDRESS="your-wallet-address"
```

### 3. Database Setup

```bash
npm run db:generate  # Generate Prisma client
npm run db:push      # Create tables
```

### 4. Development

```bash
netlify dev  # Runs frontend + functions at localhost:8888
```

## 📁 Project Structure

```
src/
├── components/ui/     # shadcn/ui components
├── pages/            # Route pages
├── lib/              # Utilities & API client
└── App.tsx           # Main app

netlify/functions/    # Serverless API
├── projects.ts       # CRUD operations
├── donations.ts      # Record donations
└── badge.ts          # Generate SVG badges

package/               # NPM package
├── src/             # Widget source
└── dist/            # Built package

prisma/
└── schema.prisma    # Database schema
```

## 🧩 Development Patterns

### API Client Usage

```typescript
import { projectsApi } from '@/lib/api'

// Get all projects
const projects = await projectsApi.getAll()

// Create project
const project = await projectsApi.create({
  name: 'My Project',
  walletAddress: 'ABC123...',
  goal: 100,
})
```

### Component Pattern

```tsx
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function MyPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Fetch data
  }, [])

  if (loading) return <div>Loading...</div>

  return (
    <div className='max-w-4xl mx-auto space-y-6'>
      <h1 className='text-3xl font-bold'>My Page</h1>
      <Card>
        <CardHeader>
          <CardTitle>Content</CardTitle>
        </CardHeader>
        <CardContent>{/* Content */}</CardContent>
      </Card>
    </div>
  )
}
```

### Solana Integration

```tsx
import { useWallet } from '@solana/wallet-adapter-react'
import { Connection, Transaction, SystemProgram } from '@solana/web3.js'

const { connected, publicKey, signTransaction } = useWallet()

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

## 🎨 Widget Development

### Build Widget

```bash
cd package
npm install
npm run build    # Creates dist/
```

### Test Locally

```bash
cd package
npm link         # Link package locally

cd ..
npm link @solanafund/package  # Use in main project
```

### Widget Configuration

```tsx
<SolanaFund
  projectId='required'
  apiUrl='/.netlify/functions' // Default
  theme='default' // 'default' | 'dark' | 'minimal'
  size='md' // 'sm' | 'md' | 'lg'
  showAmount={true} // Show raised amount
  showGoal={false} // Show progress bar
  className='custom-class' // Additional CSS
/>
```

## 🗄 Database Operations

### Schema Changes

```bash
# Edit prisma/schema.prisma, then:
npm run db:generate  # Update client
npm run db:push      # Apply changes
```

### Common Queries

```typescript
// Create project with relations
const project = await prisma.project.create({
  data: {
    name: 'Project',
    walletAddress: '...',
    donations: {
      create: [{ amount: 1.0, donorWallet: '...' }],
    },
  },
  include: { donations: true },
})
```

## 🚀 Deployment

### Netlify Setup

1. Connect GitHub repo to Netlify
2. Build settings:

   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Functions directory**: `netlify/functions`

3. Environment variables:

```bash
DATABASE_URL=postgresql://...
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
VITE_SOLANA_NETWORK=devnet
VITE_DEV_WALLET_ADDRESS=your-wallet
```

### Deploy Process

```bash
git add .
git commit -m "Your changes"
git push origin main  # Auto-deploys to Netlify
```

## 🐛 Debugging

### Common Issues

**Functions not working locally**:

```bash
netlify dev --live  # Use live functions
```

**Database connection**:

```bash
npx prisma studio  # Test connection
```

**Widget build errors**:

```bash
cd package
rm -rf node_modules dist
npm install && npm run build
```

### Development Tools

```bash
npm run db:studio    # Database GUI
npx tsc --noEmit     # Type check
npm run lint         # Code linting
```

## 📝 Code Style

### File Naming

- Components: `PascalCase.tsx`
- Pages: `PascalCase.tsx`
- Utilities: `camelCase.ts`
- Functions: `kebab-case.ts`

### TypeScript

```typescript
// Interfaces for props
interface ComponentProps {
  title: string
  optional?: boolean
}

// Union types
type Theme = 'default' | 'dark' | 'minimal'

// Const assertions
const themes = ['default', 'dark', 'minimal'] as const
```

### React Patterns

```tsx
// Function components
export default function Component({ prop }: Props) {
  return <div>{prop}</div>
}

// Hooks
const [state, setState] = useState<Type>(initial)
const value = useMemo(() => computation, [dep])
```

## 🤝 Contributing Workflow

1. **Fork & Branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Development**

   - Follow existing patterns
   - Add tests for new features
   - Update docs if needed

3. **Testing**

   ```bash
   npm run lint
   npm run build
   netlify dev  # Test functions
   ```

4. **Submit**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   git push origin feature/amazing-feature
   ```

## 📚 Resources

- **Netlify Functions**: [docs.netlify.com/functions](https://docs.netlify.com/functions/)
- **Solana Web3.js**: [solana-labs.github.io/solana-web3.js](https://solana-labs.github.io/solana-web3.js)
- **Prisma**: [prisma.io/docs](https://prisma.io/docs)
- **shadcn/ui**: [ui.shadcn.com](https://ui.shadcn.com)

---

**Need help?** Open an issue or join our Discord community!
