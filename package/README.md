# SolanaFund

Embeddable funding badges for Solana projects. Get community support through clean, unobtrusive badges that integrate seamlessly with your project.

[![NPM Version](https://img.shields.io/npm/v/solanafund.svg)](https://www.npmjs.com/package/solanafund)
[![License](https://img.shields.io/npm/l/solanafund.svg)](https://github.com/yourusername/solanafund-platform/blob/main/LICENSE)

## ⚡ Quick Start

### Installation

```bash
npm install solanafund
```

### Basic Usage

```jsx
import { SolanaFund } from 'solanafund'

function MyProject() {
  return (
    <div>
      <h1>My Awesome Solana Project</h1>
      <SolanaFund projectId='your-project-id' />
    </div>
  )
}
```

## 🎨 Customization

```jsx
<SolanaFund
  projectId='abc123'
  theme='dark' // 'default' | 'dark' | 'minimal'
  size='lg' // 'sm' | 'md' | 'lg'
  showAmount={true} // Display raised amount
  showGoal={true} // Display funding progress
  className='my-badge' // Custom CSS classes
/>
```

## 🔧 Props

| Prop         | Type                               | Default      | Description                     |
| ------------ | ---------------------------------- | ------------ | ------------------------------- |
| `projectId`  | `string`                           | **required** | Your project ID from SolanaFund |
| `theme`      | `'default' \| 'dark' \| 'minimal'` | `'default'`  | Visual theme                    |
| `size`       | `'sm' \| 'md' \| 'lg'`             | `'md'`       | Badge size                      |
| `showAmount` | `boolean`                          | `true`       | Show raised SOL amount          |
| `showGoal`   | `boolean`                          | `false`      | Show funding goal progress      |
| `className`  | `string`                           | `''`         | Additional CSS classes          |

## 🎯 Getting Your Project ID

1. Visit [solanafund.ndao.computer](https://solanafund.ndao.computer)
2. Connect your Solana wallet
3. Create your funding project
4. Copy your project ID from the dashboard

## 🌟 Themes

### Default Theme

Perfect for most projects with a friendly blue color scheme.

### Dark Theme

Great for projects with dark backgrounds or modern designs.

### Minimal Theme

Clean and subtle, ideal for professional or minimalist projects.

## 📖 Examples

### Simple Badge

```jsx
<SolanaFund projectId='abc123' />
```

### Dark Theme with Progress

```jsx
<SolanaFund
  projectId='abc123'
  theme='dark'
  showGoal={true}
  size='lg'
/>
```

### Minimal Style

```jsx
<SolanaFund
  projectId='abc123'
  theme='minimal'
  showAmount={false}
  size='sm'
/>
```

## 🚀 How It Works

1. **Click to Expand**: Users click the badge to open donation interface
2. **Wallet Connection**: Integrates with Phantom, Solflare, and other Solana wallets
3. **Instant Donations**: SOL donations processed directly on Solana blockchain
4. **Real-time Updates**: Badge automatically updates with new funding totals

## 💡 Features

- 🎨 **Three Beautiful Themes** - Default, Dark, and Minimal
- ⚡ **Lightweight** - Minimal bundle size with no unnecessary dependencies
- 🔗 **Solana Native** - Built specifically for the Solana ecosystem
- 📱 **Responsive** - Works perfectly on mobile and desktop
- 🎯 **Easy Integration** - Just one component to add
- 💰 **Real-time** - Live funding updates

## 🛠 TypeScript Support

Fully typed with TypeScript for the best developer experience:

```typescript
import { SolanaFund, SolanaFundProps } from 'solanafund'

const MyComponent: React.FC = () => {
  const badgeProps: SolanaFundProps = {
    projectId: 'abc123',
    theme: 'dark',
    size: 'lg',
  }

  return <SolanaFund {...badgeProps} />
}
```

## 🌐 Platform

This badge connects to the SolanaFund platform at [solanafund.ndao.computer](https://solanafund.ndao.computer), where you can:

- Create and manage funding projects
- Track donations and supporters
- Configure badge settings
- View detailed analytics

## 📄 License

MIT License - see [LICENSE](https://github.com/yourusername/solanafund-platform/blob/main/LICENSE) for details.

## 🤝 Contributing

Found a bug or want to contribute? Check out our [GitHub repository](https://github.com/yourusername/solanafund-platform).

## 💬 Support

- 🌐 **Platform**: [solanafund.ndao.computer](https://solanafund.ndao.computer)
- 📖 **Documentation**: [GitHub](https://github.com/yourusername/solanafund-platform)
- 🐛 **Issues**: [GitHub Issues](https://github.com/yourusername/solanafund-platform/issues)

---

**Built with ❤️ for the Solana community**
