// 📄 src/pages/CreateProject.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import { projectsApi } from '../lib/api';

interface CreateProjectForm {
  name: string
  description: string
  goal: string
  showGoal: boolean
  theme: 'default' | 'dark' | 'minimal'
  devFeeEnabled: boolean
  customMessage: string
}

export default function CreateProject() {
  const navigate = useNavigate();
  const { connected, publicKey } = useWallet();
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState<CreateProjectForm>({
    name: '',
    description: '',
    goal: '',
    showGoal: true,
    theme: 'default',
    devFeeEnabled: false,
    customMessage: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!connected || !publicKey) {
      setError('Please connect your wallet first');
      return;
    }

    if (!formData.name.trim()) {
      setError('Project name is required');
      return;
    }

    setCreating(true);
    setError(null);

    try {
      const projectData = {
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        walletAddress: publicKey.toString(),
        goal: formData.goal ? parseFloat(formData.goal) : undefined,
        showGoal: formData.showGoal,
        theme: formData.theme,
        devFeeEnabled: formData.devFeeEnabled,
        customMessage: formData.customMessage.trim() || undefined
      };

      const project = await projectsApi.create(projectData);

      setSuccess(true);

      // Redirect to project page after short delay
      setTimeout(() => {
        navigate(`/project/${project.id}`);
      }, 2000);

    } catch (err) {
      console.error('Failed to create project:', err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create project. Please try again.');
      }
    } finally {
      setCreating(false);
    }
  };

  const updateFormData = (updates: Partial<CreateProjectForm>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto">
        <Card className="text-center">
          <CardContent className="pt-6">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Project Created Successfully!</h2>
            <p className="text-muted-foreground mb-4">
              Your project has been created and is now live. You'll be redirected shortly.
            </p>
            <div className="animate-pulse">
              <div className="h-2 bg-green-200 rounded-full">
                <div className="h-2 bg-green-500 rounded-full w-1/2"></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Create New Project</h1>
          <p className="text-muted-foreground">
            Set up your sponsorship project in minutes
          </p>
        </div>
      </div>

      {/* Connection Status */}
      {!connected && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-3">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              <div className="flex-1">
                <p className="font-medium text-orange-800">
                  Connect your wallet to continue
                </p>
                <p className="text-sm text-orange-700">
                  We'll use your wallet address to receive donations
                </p>
              </div>
              <WalletMultiButton />
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Project Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => updateFormData({ name: e.target.value })}
                    placeholder="My Awesome Solana Project"
                    maxLength={100}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.name.length}/100 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    rows={4}
                    value={formData.description}
                    onChange={(e) => updateFormData({ description: e.target.value })}
                    placeholder="Describe your project and what you're building..."
                    maxLength={500}
                  />
                  <p className="text-xs text-muted-foreground">
                    {formData.description.length}/500 characters
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customMessage">Custom Support Message</Label>
                  <Input
                    id="customMessage"
                    value={formData.customMessage}
                    onChange={(e) => updateFormData({ customMessage: e.target.value })}
                    placeholder="Thank you for supporting open source!"
                    maxLength={150}
                  />
                  <p className="text-xs text-muted-foreground">
                    This message will be shown prominently to supporters
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Funding Goal */}
            <Card>
              <CardHeader>
                <CardTitle>Funding Goal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="goal">Goal Amount (SOL)</Label>
                  <Input
                    id="goal"
                    type="number"
                    step="0.01"
                    min="0"
                    value={formData.goal}
                    onChange={(e) => updateFormData({ goal: e.target.value })}
                    placeholder="100.00"
                  />
                  <p className="text-xs text-muted-foreground">
                    Leave empty for no specific goal
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="showGoal"
                    checked={formData.showGoal}
                    onCheckedChange={(checked) => updateFormData({ showGoal: checked })}
                  />
                  <Label htmlFor="showGoal">Show goal progress publicly</Label>
                </div>
              </CardContent>
            </Card>

            {/* Configuration */}
            <Card>
              <CardHeader>
                <CardTitle>Configuration</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label>Widget Theme</Label>
                  <div className="grid grid-cols-3 gap-3">
                    {(['default', 'dark', 'minimal'] as const).map((theme) => (
                      <div
                        key={theme}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${formData.theme === theme
                          ? 'border-primary bg-primary/5'
                          : 'border-border hover:bg-muted/50'
                          }`}
                        onClick={() => updateFormData({ theme })}
                      >
                        <div className="text-center">
                          <Badge
                            variant={formData.theme === theme ? "default" : "secondary"}
                            className="capitalize"
                          >
                            {theme}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="devFee">Support spnsr Development</Label>
                    <p className="text-xs text-muted-foreground">
                      Enable a small fee (2%) to help maintain this service
                    </p>
                  </div>
                  <Switch
                    id="devFee"
                    checked={formData.devFeeEnabled}
                    onCheckedChange={(checked) => updateFormData({ devFeeEnabled: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Preview Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-4 bg-muted/30 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-2">
                      Widget Preview
                    </div>
                    {/* Mock widget preview */}
                    <div className="inline-flex items-center space-x-2 px-3 py-1.5 bg-blue-50 text-blue-800 border border-blue-200 rounded-full text-sm font-medium">
                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      <span>Support</span>
                      <span className="font-semibold">0.0 SOL</span>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Name:</span>
                      <span className="font-medium">
                        {formData.name || 'Project Name'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Goal:</span>
                      <span className="font-medium">
                        {formData.goal ? `${formData.goal} SOL` : 'No goal set'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Theme:</span>
                      <span className="font-medium capitalize">{formData.theme}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Dev Fee:</span>
                      <span className="font-medium">
                        {formData.devFeeEnabled ? '2%' : 'None'}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Your Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                {connected && publicKey ? (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Connected Wallet:</p>
                    <p className="text-xs font-mono bg-muted p-2 rounded break-all">
                      {publicKey.toString()}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      This wallet will receive all donations
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Connect your wallet to continue
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="pt-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Submit Button */}
        <Card>
          <CardContent className="pt-6">
            <Button
              type="submit"
              className="w-full"
              size="lg"
              disabled={!connected || creating}
            >
              {creating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Creating Project...
                </>
              ) : (
                'Create Project'
              )}
            </Button>
            <p className="text-xs text-muted-foreground text-center mt-2">
              By creating a project, you agree to our terms of service
            </p>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
