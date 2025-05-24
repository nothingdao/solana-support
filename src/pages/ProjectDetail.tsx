import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Textarea } from '../components/ui/textarea';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { Settings, Heart, Copy, Calendar, Wallet } from 'lucide-react';
import { SupportBadge } from '../components/SupportBadge';

interface Project {
  id: string;
  name: string;
  description: string | null;
  walletAddress: string;
  goal: number | null;
  raised: number;
  isActive: boolean;
  createdAt: string;
  showGoal: boolean;
  customMessage: string | null;
}

interface Donation {
  id: string;
  donorWallet: string;
  amount: number;
  message: string | null;
  createdAt: string;
  isConfirmed: boolean;
}

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const { publicKey, connected } = useWallet();
  const [project, setProject] = useState<Project | null>(null);
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationMessage, setDonationMessage] = useState('');
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (id) {
      fetchProjectData();
    }
  }, [id, publicKey]);

  const fetchProjectData = async () => {
    try {
      // Mock data - replace with actual API calls
      const mockProject: Project = {
        id: id!,
        name: 'Solana DeFi Analytics',
        description: 'Building comprehensive analytics tools for Solana DeFi protocols. This project aims to provide developers and traders with real-time insights into the Solana ecosystem.',
        walletAddress: 'ABC123def456GHI789jkl012MNO345pqr678STU901vwx234YZ',
        goal: 100,
        raised: 45.5,
        isActive: true,
        createdAt: '2024-01-15T10:00:00Z',
        showGoal: true,
        customMessage: 'Support open-source DeFi tools for Solana!'
      };

      const mockDonations: Donation[] = [
        {
          id: '1',
          donorWallet: 'XYZ789...ABC123',
          amount: 5.0,
          message: 'Great work on the analytics dashboard!',
          createdAt: '2024-01-20T15:30:00Z',
          isConfirmed: true
        },
        {
          id: '2',
          donorWallet: 'DEF456...GHI789',
          amount: 2.5,
          message: null,
          createdAt: '2024-01-18T09:15:00Z',
          isConfirmed: true
        }
      ];

      setProject(mockProject);
      setDonations(mockDonations);

      // Check if current user is the project owner
      if (connected && publicKey) {
        setIsOwner(publicKey.toString() === mockProject.walletAddress);
      }
    } catch (error) {
      console.error('Failed to fetch project data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async () => {
    if (!connected || !publicKey || !donationAmount) return;

    // Here you would implement the actual Solana transaction
    console.log('Donating:', { amount: donationAmount, message: donationMessage });

    // Mock success - in real app, handle transaction
    alert('Donation sent! (This is a demo)');
    setDonationAmount('');
    setDonationMessage('');
  };

  const copyWalletAddress = () => {
    if (project) {
      navigator.clipboard.writeText(project.walletAddress);
      // You could add a toast notification here
      alert('Wallet address copied!');
    }
  };

  const formatSOL = (amount: number) => `${amount.toFixed(2)} SOL`;
  const formatWalletAddress = (address: string) =>
    `${address.slice(0, 4)}...${address.slice(-4)}`;

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Loading project...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Project not found</p>
        <Button className="mt-4" asChild>
          <Link to="/">Back to Projects</Link>
        </Button>
      </div>
    );
  }

  const progressPercentage = project.goal ?
    Math.min((project.raised / project.goal) * 100, 100) : 0;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span>Created {new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Wallet className="h-4 w-4" />
              <span>{formatWalletAddress(project.walletAddress)}</span>
              <Button variant="ghost" size="sm" onClick={copyWalletAddress}>
                <Copy className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {isOwner && (
          <Button variant="outline" asChild>
            <Link to={`/settings/${project.id}`}>
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Link>
          </Button>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {project.description || 'No description provided.'}
              </p>
              {project.customMessage && (
                <div className="mt-4 p-3 bg-primary/5 rounded-lg border-l-4 border-primary">
                  <p className="text-sm font-medium">{project.customMessage}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Widget Preview */}
          <Card>
            <CardHeader>
              <CardTitle>Widget Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This is how your support badge will appear in projects:
              </p>
              <div className="flex justify-center p-6 bg-muted/30 rounded-lg">
                <SupportBadge projectId={project.id} />
              </div>
            </CardContent>
          </Card>

          {/* Recent Donations */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Donations</CardTitle>
            </CardHeader>
            <CardContent>
              {donations.length > 0 ? (
                <div className="space-y-4">
                  {donations.map((donation) => (
                    <div key={donation.id} className="flex items-start space-x-3 p-3 rounded-lg bg-muted/30">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{formatSOL(donation.amount)}</span>
                          <span className="text-xs text-muted-foreground">
                            {new Date(donation.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">
                          From {formatWalletAddress(donation.donorWallet)}
                        </p>
                        {donation.message && (
                          <p className="text-sm text-muted-foreground italic">
                            "{donation.message}"
                          </p>
                        )}
                      </div>
                      {donation.isConfirmed && (
                        <Badge variant="secondary" className="text-xs">
                          Confirmed
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-muted-foreground py-6">
                  No donations yet. Be the first to support this project!
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Funding Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-red-500" />
                <span>Support Progress</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{formatSOL(project.raised)} raised</span>
                  {project.showGoal && project.goal && (
                    <span className="text-muted-foreground">
                      of {formatSOL(project.goal)}
                    </span>
                  )}
                </div>
                {project.showGoal && project.goal && (
                  <Progress value={progressPercentage} className="h-2" />
                )}
              </div>

              <div className="pt-2 border-t">
                <p className="text-sm text-muted-foreground">
                  {donations.filter(d => d.isConfirmed).length} supporters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Donation Form */}
          {connected ? (
            <Card>
              <CardHeader>
                <CardTitle>Make a Donation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (SOL)</Label>
                  <Input
                    id="amount"
                    type="number"
                    step="0.01"
                    min="0.01"
                    placeholder="0.00"
                    value={donationAmount}
                    onChange={(e) => setDonationAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Message (optional)</Label>
                  <Textarea
                    id="message"
                    rows={3}
                    placeholder="Leave a message for the project owner..."
                    value={donationMessage}
                    onChange={(e) => setDonationMessage(e.target.value)}
                  />
                </div>

                <Button
                  className="w-full"
                  onClick={handleDonate}
                  disabled={!donationAmount || parseFloat(donationAmount) <= 0}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Donate {donationAmount || '0'} SOL
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Transactions are processed on Solana Devnet
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center">
                <p className="text-muted-foreground mb-4">
                  Connect your wallet to support this project
                </p>
                <Button className="w-full">
                  Connect Wallet
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
