import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useWallet } from '@solana/wallet-adapter-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Switch } from '../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { ArrowLeft, Save, Code, Trash2, AlertTriangle } from 'lucide-react';
import { SupportBadge } from '../components/SupportBadge';

interface ProjectSettings {
  id: string;
  name: string;
  description: string | null;
  walletAddress: string;
  goal: number | null;
  showGoal: boolean;
  theme: 'default' | 'dark' | 'minimal';
  devFeeEnabled: boolean;
  customMessage: string | null;
  isActive: boolean;
}

export default function ProjectSettings() {
  const { id } = useParams<{ id: string }>();
  const { publicKey, connected } = useWallet();
  const [project, setProject] = useState<ProjectSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isOwner, setIsOwner] = useState(false);

  // Form state with proper typing
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    goal: '',
    showGoal: true,
    theme: 'default' as 'default' | 'dark' | 'minimal',
    devFeeEnabled: false,
    customMessage: '',
    isActive: true
  });

  useEffect(() => {
    if (id) {
      fetchProjectSettings();
    }
  }, [id, publicKey]);

  const fetchProjectSettings = async () => {
    try {
      // Mock data - replace with actual API call
      const mockProject: ProjectSettings = {
        id: id!,
        name: 'Solana DeFi Analytics',
        description: 'Building comprehensive analytics tools for Solana DeFi protocols',
        walletAddress: 'ABC123def456GHI789jkl012MNO345pqr678STU901vwx234YZ',
        goal: 100,
        showGoal: true,
        theme: 'default',
        devFeeEnabled: true,
        customMessage: 'Support open-source DeFi tools for Solana!',
        isActive: true
      };

      setProject(mockProject);
      setFormData({
        name: mockProject.name,
        description: mockProject.description || '',
        goal: mockProject.goal?.toString() || '',
        showGoal: mockProject.showGoal,
        theme: mockProject.theme,
        devFeeEnabled: mockProject.devFeeEnabled,
        customMessage: mockProject.customMessage || '',
        isActive: mockProject.isActive
      });

      // Check if current user is the project owner
      if (connected && publicKey) {
        setIsOwner(publicKey.toString() === mockProject.walletAddress);
      }
    } catch (error) {
      console.error('Failed to fetch project settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!isOwner) return;

    setSaving(true);
    try {
      // Here you would make the actual API call to update the project
      console.log('Saving project settings:', formData);

      // Mock success
      setTimeout(() => {
        setSaving(false);
        alert('Settings saved successfully!');
      }, 1000);
    } catch (error) {
      console.error('Failed to save settings:', error);
      setSaving(false);
    }
  };

  const generateEmbedCode = () => {
    if (!project) return '';

    return `<!-- Add this to your project's README.md -->
<a href="${window.location.origin}/project/${project.id}">
  <img src="${window.location.origin}/.netlify/functions/badge/${project.id}" alt="Support ${project.name}" />
</a>

<!-- Or use the React component -->
import { SupportBadge } from 'solanafund';

<SupportBadge projectId="${project.id}" />`;
  };

  const handleDeleteProject = async () => {
    if (!confirm('Are you sure you want to delete this project? This action cannot be undone.')) {
      return;
    }

    try {
      // Here you would make the API call to delete the project
      console.log('Deleting project:', project?.id);
      alert('Project deleted successfully!');
      // Redirect to projects list
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const handleThemeChange = (selectedTheme: string) => {
    // Type guard to ensure the theme is valid
    if (selectedTheme === 'default' || selectedTheme === 'dark' || selectedTheme === 'minimal') {
      setFormData({ ...formData, theme: selectedTheme });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Loading settings...</div>
      </div>
    );
  }

  if (!project || !isOwner) {
    return (
      <div className="text-center py-12">
        <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
        <p className="text-muted-foreground">
          {!project ? 'Project not found' : 'You do not have permission to edit this project'}
        </p>
        <Button className="mt-4" asChild>
          <Link to="/">Back to Projects</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/project/${project.id}`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Project Settings</h1>
            <p className="text-muted-foreground">{project.name}</p>
          </div>
        </div>

        <Button onClick={handleSave} disabled={saving}>
          <Save className="h-4 w-4 mr-2" />
          {saving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="embed">Embed Code</TabsTrigger>
          <TabsTrigger value="advanced">Advanced</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Project Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter project name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe your project..."
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="customMessage">Custom Message</Label>
                <Input
                  id="customMessage"
                  value={formData.customMessage}
                  onChange={(e) => setFormData({ ...formData, customMessage: e.target.value })}
                  placeholder="A custom message for supporters"
                />
                <p className="text-xs text-muted-foreground">
                  This message will be displayed prominently on your project page
                </p>
              </div>
            </CardContent>
          </Card>

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
                  onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                  placeholder="100.00"
                />
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="showGoal"
                  checked={formData.showGoal}
                  onCheckedChange={(checked) => setFormData({ ...formData, showGoal: checked })}
                />
                <Label htmlFor="showGoal">Show goal progress publicly</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Widget Theme</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                {(['default', 'dark', 'minimal'] as const).map((theme) => (
                  <div
                    key={theme}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${formData.theme === theme ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                    onClick={() => handleThemeChange(theme)}
                  >
                    <div className="text-center space-y-2">
                      <div className="w-full h-8 bg-muted rounded flex items-center justify-center">
                        <Badge variant="secondary" className="text-xs capitalize">
                          {theme}
                        </Badge>
                      </div>
                      <p className="text-sm font-medium capitalize">{theme}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator />

              <div>
                <Label className="text-sm font-medium mb-2 block">Preview</Label>
                <div className="flex justify-center p-6 bg-muted/30 rounded-lg">
                  <SupportBadge projectId={project.id} theme={formData.theme} />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Embed Code */}
        <TabsContent value="embed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Code className="h-5 w-5" />
                <span>Embed Code</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Copy and paste this code into your project's README.md or website:
              </p>

              <div className="relative">
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{generateEmbedCode()}</code>
                </pre>
                <Button
                  size="sm"
                  className="absolute top-2 right-2"
                  onClick={() => {
                    navigator.clipboard.writeText(generateEmbedCode());
                    alert('Code copied to clipboard!');
                  }}
                >
                  Copy
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Advanced Settings */}
        <TabsContent value="advanced" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Developer Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="devFee">Support Developer (Optional)</Label>
                  <p className="text-xs text-muted-foreground">
                    Enable a small developer fee (2%) to help maintain this service
                  </p>
                </div>
                <Switch
                  id="devFee"
                  checked={formData.devFeeEnabled}
                  onCheckedChange={(checked) => setFormData({ ...formData, devFeeEnabled: checked })}
                />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="isActive">Project Status</Label>
                  <p className="text-xs text-muted-foreground">
                    Inactive projects won't accept new donations
                  </p>
                </div>
                <Switch
                  id="isActive"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive flex items-center space-x-2">
                <Trash2 className="h-5 w-5" />
                <span>Danger Zone</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Delete Project</p>
                  <p className="text-sm text-muted-foreground">
                    This will permanently delete your project and all associated data
                  </p>
                </div>
                <Button variant="destructive" onClick={handleDeleteProject}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
