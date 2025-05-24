import { useState, useEffect } from 'react';
import { Heart, ExternalLink } from 'lucide-react';

interface SupportBadgeProps {
  projectId: string;
  theme?: 'default' | 'dark' | 'minimal';
  showAmount?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

interface ProjectData {
  name: string;
  raised: number;
  goal: number | null;
  showGoal: boolean;
}

export function SupportBadge({
  projectId,
  theme = 'default',
  showAmount = true,
  size = 'md'
}: SupportBadgeProps) {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      // In a real implementation, this would fetch from your API
      const mockData: ProjectData = {
        name: 'Solana DeFi Analytics',
        raised: 45.5,
        goal: 100,
        showGoal: true
      };
      setProject(mockData);
    } catch (error) {
      console.error('Failed to fetch project data:', error);
    }
  };

  const handleClick = () => {
    const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    window.open(`${baseUrl}/project/${projectId}`, '_blank');
  };

  if (!project) {
    return (
      <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 animate-pulse">
        <div className="w-4 h-4 bg-gray-300 rounded-full mr-2"></div>
        <div className="w-20 h-4 bg-gray-300 rounded"></div>
      </div>
    );
  }

  const getThemeClasses = () => {
    switch (theme) {
      case 'dark':
        return {
          container: 'bg-gray-900 text-white border-gray-700 hover:bg-gray-800',
          heart: 'text-red-400',
          text: 'text-gray-100'
        };
      case 'minimal':
        return {
          container: 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50',
          heart: 'text-gray-500',
          text: 'text-gray-600'
        };
      default:
        return {
          container: 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100',
          heart: 'text-red-500',
          text: 'text-blue-700'
        };
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1.5 text-sm';
    }
  };

  const themeClasses = getThemeClasses();
  const sizeClasses = getSizeClasses();

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        inline-flex items-center space-x-2 rounded-full border font-medium 
        transition-all duration-200 cursor-pointer
        ${themeClasses.container} ${sizeClasses}
        ${isHovered ? 'transform scale-105 shadow-lg' : 'shadow-sm'}
      `}
      title={`Support ${project.name}`}
    >
      <Heart
        className={`w-4 h-4 ${themeClasses.heart} ${isHovered ? 'animate-pulse' : ''}`}
        fill={isHovered ? 'currentColor' : 'none'}
      />

      <span className={themeClasses.text}>
        Support
      </span>

      {showAmount && (
        <span className={`font-semibold ${themeClasses.text}`}>
          {project.raised.toFixed(1)} SOL
        </span>
      )}

      {isHovered && (
        <ExternalLink className={`w-3 h-3 ${themeClasses.text}`} />
      )}
    </button>
  );
}
