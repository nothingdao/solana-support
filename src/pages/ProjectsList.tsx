import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Progress } from '../components/ui/progress';
import { Badge } from '../components/ui/badge';
import { Settings, ExternalLink, TrendingUp } from 'lucide-react';

interface Project {
  id: string;
  name: string;
  description: string | null;
  walletAddress: string;
  goal: number | null;
  raised: number;
  isActive: boolean;
  createdAt: string;
  _count: {
    donations: number;
  };
}

export default function ProjectsList() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      // This would be your actual API call
      // const response = await fetch('/api/projects');
      // const data = await response.json();

      // Mock data for now
      const mockProjects: Project[] = [
        {
          id: '1',
          name: 'Solana DeFi Analytics',
          description: 'Building comprehensive analytics tools for Solana DeFi protocols',
          walletAddress: 'ABC123...XYZ789',
          goal: 100,
          raised: 45.5,
          isActive: true,
          createdAt: '2024-01-15T10:00:00Z',
          _count: { donations: 23 }
        },
        {
          id: '2',
          name: 'NFT Marketplace SDK',
          description: 'Open-source SDK for building NFT marketplaces on Solana',
          walletAddress: 'DEF456...ABC123',
          goal: 50,
          raised: 12.8,
          isActive: true,
          createdAt: '2024-02-01T14:30:00Z',
          _count: { donations: 8 }
        }
      ];

      setProjects(mockProjects);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatSOL = (amount: number) => `${amount.toFixed(2)} SOL`;
  const getProgressPercentage = (raised: number, goal: number | null) => {
    if (!goal) return 0;
    return Math.min((raised / goal) * 100, 100);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-pulse text-muted-foreground">Loading projects...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">SolanaFund Projects</h1>
          <p className="text-muted-foreground mt-2">
            Discover and support amazing Solana projects
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <TrendingUp className="h-3 w-3" />
            <span>{projects.length} Active Projects</span>
          </Badge>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/settings/${project.id}`}>
                      <Settings className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button variant="ghost" size="sm" asChild>
                    <Link to={`/project/${project.id}`}>
                      <ExternalLink className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {project.description || 'No description provided'}
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Raised: {formatSOL(project.raised)}</span>
                  {project.goal && (
                    <span className="text-muted-foreground">
                      Goal: {formatSOL(project.goal)}
                    </span>
                  )}
                </div>
                {project.goal && (
                  <Progress value={getProgressPercentage(project.raised, project.goal)} />
                )}
              </div>

              <div className="flex justify-between items-center text-sm text-muted-foreground">
                <span>{project._count.donations} donations</span>
                <span>
                  {new Date(project.createdAt).toLocaleDateString()}
                </span>
              </div>

              <Button className="w-full" asChild>
                <Link to={`/project/${project.id}`}>
                  View Project
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No projects found</p>
          <Button className="mt-4" asChild>
            <Link to="/create">Create Your First Project</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
