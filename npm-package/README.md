# spnsr

Embeddable donation badges for Solana projects.

## Installation

```bash
npm install spnsr
```

## Basic Usage

```jsx
import { Spnsr } from 'spnsr'

function MyProject() {
  return (
    <div>
      <h1>My Solana Project</h1>
      <Spnsr projectId='your-project-id' />
    </div>
  )
}
```

## Props

| Prop         | Type                               | Default      | Description                |
| ------------ | ---------------------------------- | ------------ | -------------------------- |
| `projectId`  | `string`                           | **required** | Your project ID from spnsr |
| `theme`      | `'default' \| 'dark' \| 'minimal'` | `'default'`  | Visual theme               |
| `size`       | `'sm' \| 'md' \| 'lg'`             | `'md'`       | Badge size                 |
| `showAmount` | `boolean`                          | `true`       | Show raised SOL amount     |
| `showGoal`   | `boolean`                          | `false`      | Show funding goal progress |
| `className`  | `string`                           | `''`         | Additional CSS classes     |

## Examples

### Dark Theme with Progress

```jsx
<Spnsr
  projectId='abc123'
  theme='dark'
  showGoal={true}
  size='lg'
/>
```

### Minimal Style

```jsx
<Spnsr
  projectId='abc123'
  theme='minimal'
  showAmount={false}
  size='sm'
/>
```

## Getting Project ID

1. Visit [spnsr.ndao.computer](https://spnsr.ndao.computer)
2. Connect your Solana wallet
3. Create your project
4. Copy project ID from dashboard

## How It Works

1. User clicks badge to open donation interface
2. Connects with Phantom, Solflare, or other Solana wallets
3. SOL donations processed directly on Solana blockchain
4. Badge updates with new funding totals in real-time

## TypeScript Support

```typescript
import { Spnsr, SpnsrProps } from 'spnsr'

const MyComponent: React.FC = () => {
  const badgeProps: SpnsrProps = {
    projectId: 'abc123',
    theme: 'dark',
    size: 'lg',
  }

  return <Spnsr {...badgeProps} />
}
```

## Repository

- **Platform**: [spnsr.ndao.computer](https://spnsr.ndao.computer)
- **GitHub**: [github.com/nothingdao/spnsr](https://github.com/nothingdao/spnsr)
- **Issues**: [github.com/nothingdao/spnsr/issues](https://github.com/nothingdao/spnsr/issues)

## License

MIT
