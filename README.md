# Solana Support Platform

A comprehensive platform for Solana developers to receive community support through an unobtrusive, embeddable donation widget. Built with React, TypeScript, and Solana Web3.js.

![Solana Support](https://img.shields.io/badge/Solana-Support-9945FF?style=for-the-badge&logo=solana)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

## 🚀 Features

### 🎯 **For Project Owners**

- **Dashboard Management** - Create and manage your funding projects
- **Real-time Analytics** - Track donations, supporters, and progress
- **Customizable Goals** - Set funding targets and display progress
- **Widget Themes** - Choose from multiple professional themes
- **Embed Code Generation** - One-click integration for any project

### 💎 **For Supporters**

- **One-Click Donations** - Simple SOL donations via wallet connection
- **Multiple Wallets** - Support for Phantom, Solflare, and more
- **Donation Messages** - Leave encouraging messages for project owners
- **Transaction History** - Transparent, on-chain verification

### 🛠 **For Developers**

- **NPM Widget Package** - `@solana-support/widget`
- **Unobtrusive Design** - Clean, shields.io-style badges
- **Easy Integration** - Single line of code integration
- **Customizable** - Multiple sizes, themes, and display options
- **TypeScript Support** - Full type safety and IDE support

## 📦 Quick Start

### Install the Widget

```bash
npm install @solana-support/widget
```

### React Integration

```jsx
import { SolanaSupport } from '@solana-support/widget'

function MyProject() {
  return (
    <div>
      <h1>My Awesome Solana Project</h1>
      <SolanaSupport
        projectId='your-project-id'
        theme='default'
        showAmount={true}
      />
    </div>
  )
}
```

### Markdown Badge

```markdown
[![Support this project](https://api.solana-support.dev/badge/your-project-id)](https://solana-support.dev/project/your-project-id)
```

## 🏗 Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Dashboard     │    │   Backend API   │    │   Database      │
│   (React/Vite)  │◄──►│   (Express.js)  │◄──►│  (PostgreSQL)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │
         ▼
┌─────────────────┐
│  NPM Widget     │
│  (@solana-      │
│   support/      │
│   widget)       │
└─────────────────┘
```

### Tech Stack

**Frontend:**

- React 19 + TypeScript
- Vite + TailwindCSS 4
- shadcn/ui components
- React Router

**Blockchain:**

- Solana Web3.js
- Wallet Adapter (Phantom, Solflare)
- Devnet/Mainnet support

**Backend:**

- Express.js + TypeScript
- Prisma ORM
- PostgreSQL (Neon.tech)
- Joi validation

**Widget:**

- Rollup bundler
- TypeScript declarations
- Peer dependencies (React)

## 🎨 Widget Customization

```jsx
<SolanaSupport
  projectId='abc123'
  theme='dark' // 'default' | 'dark' | 'minimal'
  size='lg' // 'sm' | 'md' | 'lg'
  showAmount={true} // Display raised amount
  showGoal={true} // Display funding progress
  className='my-widget' // Custom CSS classes
/>
```

## 🌐 Live Demo

- **Dashboard**: [solana-support.dev](https://solana-support.dev)
- **Example Widget**: See it in action on popular Solana projects
- **Documentation**: [docs.solana-support.dev](https://docs.solana-support.dev)

## 📁 Project Structure

```
solana-support/
├── src/                    # Main React dashboard
│   ├── components/         # UI components
│   ├── pages/             # Route pages
│   └── lib/               # Utilities
├── widget/                # NPM package
│   ├── src/               # Widget source
│   └── dist/              # Built package
├── prisma/                # Database schema
└── api/                   # Backend API (separate)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (Neon.tech recommended)
- Solana wallet (Phantom/Solflare)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/solana-support-platform.git
cd solana-support-platform

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database URL and settings

# Initialize database
npm run db:generate
npm run db:push

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see the dashboard.

### Widget Development

```bash
cd widget
npm install
npm run build    # Creates dist/ folder
npm publish      # Publish to NPM (when ready)
```

## 🔧 Configuration

### Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:pass@host/db?sslmode=require"

# Solana
VITE_SOLANA_RPC_URL="https://api.devnet.solana.com"
VITE_SOLANA_NETWORK="devnet"
VITE_DEV_WALLET_ADDRESS="your-wallet-address"

# Application
VITE_APP_URL="http://localhost:5173"
```

### Database Schema

The platform uses Prisma with PostgreSQL:

- **Projects** - Funding projects with goals and settings
- **Donations** - SOL donations with transaction signatures
- **DevFees** - Optional platform fees (2% when enabled)

## 🎯 Roadmap

- [x] **MVP Dashboard** - Project creation and management
- [x] **Widget Package** - Embeddable React component
- [x] **Solana Integration** - Wallet connection and transactions
- [ ] **Backend API** - Full REST API implementation
- [ ] **User Authentication** - Wallet-based auth
- [ ] **Analytics Dashboard** - Detailed funding analytics
- [ ] **Multi-token Support** - USDC, other SPL tokens
- [ ] **Mobile App** - React Native companion app
- [ ] **Recurring Donations** - Subscription-like support
- [ ] **NFT Rewards** - Donor recognition system

## 🤝 Contributing

We welcome contributions! Please see [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed setup instructions.

### Quick Contribution Guide

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Areas We Need Help

- 🎨 **UI/UX Design** - Making the dashboard even more beautiful
- 🔒 **Security** - Smart contract audits and security reviews
- 📱 **Mobile** - React Native app development
- 🌐 **Internationalization** - Multi-language support
- 📖 **Documentation** - Tutorials and guides

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Solana Foundation** - For building an amazing blockchain
- **shadcn/ui** - For beautiful, accessible UI components
- **Vercel** - For hosting and deployment
- **Neon.tech** - For managed PostgreSQL
- **Railway** - For backend API hosting

## 🔗 Links

- **Website**: [solana-support.dev](https://solana-support.dev)
- **NPM Package**: [@solana-support/widget](https://npmjs.com/package/@solana-support/widget)
- **Documentation**: [docs.solana-support.dev](https://docs.solana-support.dev)
- **Discord**: [Join our community](https://discord.gg/solana-support)
- **Twitter**: [@solana_support](https://twitter.com/solana_support)

## 💰 Support This Project

This project is open source and free to use. If you find it valuable, consider supporting its development:

[![Support Solana Support](https://api.solana-support.dev/badge/platform-development)](https://solana-support.dev/project/platform-development)

---

**Built with ❤️ for the Solana community**
