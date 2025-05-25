# SolanaFund Platform

Embeddable donation badge for Solana developers. Get community support through clean, unobtrusive badges.

![SolanaFund](https://img.shields.io/badge/Solana-Support-9945FF?style=for-the-badge&logo=solana)
![Live Demo](https://img.shields.io/badge/Demo-Live-00D9FF?style=for-the-badge)

**🌐 Live Demo**: [solana-support.ndao.computer](https://solana-support.ndao.computer)

## 🚀 Quick Start

### Install Widget

```bash
npm install solanafund
```

### React Integration

```jsx
import { SolanaFund } from 'solanafund'
;<SolanaFund
  projectId='your-project-id'
  theme='default'
  showAmount={true}
/>
```

### Markdown Badge

```markdown
[![Support](https://solana-support.ndao.computer/.netlify/functions/badge/your-project-id)](https://solana-support.ndao.computer/project/your-project-id)
```

## ✨ Features

- **🎯 Dashboard** - Create and manage funding projects
- **💎 Widget Package** - Embeddable React component (`solanafund`)
- **🔗 Static Badges** - GitHub README integration
- **⚡ Solana Native** - Phantom, Solflare wallet support
- **🎨 Customizable** - Multiple themes and sizes
- **📊 Real-time** - Live donation tracking

## 🏗 Tech Stack

- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS
- **Backend**: Netlify Functions (Serverless)
- **Database**: PostgreSQL + Prisma ORM
- **Blockchain**: Solana Web3.js + Wallet Adapter
- **Hosting**: Netlify (Full-Stack)

## 🎨 Widget Options

```jsx
<SolanaFund
  projectId='abc123'
  theme='dark' // 'default' | 'dark' | 'minimal'
  size='lg' // 'sm' | 'md' | 'lg'
  showAmount={true} // Display raised amount
  showGoal={true} // Display progress bar
  className='my-badge' // Custom CSS
/>
```

## 🛠 Development

See [DEVELOPMENT.md](./DEVELOPMENT.md) for detailed setup instructions.

### Quick Setup

```bash
git clone https://github.com/yourusername/solana-support-platform.git
cd solana-support-platform
npm install
cp .env.example .env  # Add your database URL
npm run db:generate && npm run db:push
netlify dev           # Runs frontend + functions
```

## 📁 Project Structure

```
solana-support/
├── src/                    # React dashboard
├── package/                # NPM package
├── netlify/functions/      # Serverless API
├── prisma/                 # Database schema
└── dist/                   # Built app
```

## 🌐 API Endpoints

- `/.netlify/functions/projects` - CRUD operations
- `/.netlify/functions/donations` - Record donations
- `/.netlify/functions/badge/[id]` - Generate SVG badges

## 🚀 Deployment

Deploys automatically to Netlify on every push to `main`.

**Environment Variables** (Netlify Dashboard):

```bash
DATABASE_URL=postgresql://...
VITE_SOLANA_RPC_URL=https://api.devnet.solana.com
VITE_SOLANA_NETWORK=devnet
VITE_DEV_WALLET_ADDRESS=your-wallet-address
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Live App**: [solana-support.ndao.computer](https://solana-support.ndao.computer)
- **NPM Package**: [solanafund](https://npmjs.com/package/solanafund)
- **GitHub**: [solana-support-platform](https://github.com/nothingdao/solanafund-platform)

---

**Built with ❤️ for the Solana community**

[![Support this project](https://solanafund.ndao.computer/.netlify/functions/badge/platform-development)](https://solanafund.ndao.computer/project/platform-development)
