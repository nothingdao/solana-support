import { Link } from 'react-router-dom';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Button } from './ui/button';
import { Heart, Plus } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">SolanaFund</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            Projects
          </Link>
          <Link to="/docs" className="text-muted-foreground hover:text-foreground transition-colors">
            Documentation
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" asChild>
            <Link to="/create">
              <Plus className="h-4 w-4 mr-2" />
              Create Project
            </Link>
          </Button>
          <WalletMultiButton />
        </div>
      </div>
    </header>
  );
}
