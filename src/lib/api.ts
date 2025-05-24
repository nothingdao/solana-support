// API client for Netlify Functions
const API_BASE = '/.netlify/functions'

interface ProjectData {
  id: string
  name: string
  description: string | null
  walletAddress: string
  goal: number | null
  raised: number
  isActive: boolean
  createdAt: string
  showGoal: boolean
  theme: string
  devFeeEnabled: boolean
  customMessage: string | null
}

interface DonationData {
  projectId: string
  donorWallet: string
  amount: number
  message?: string
  txSignature: string
}

interface CreateProjectData {
  name: string
  description?: string
  walletAddress: string
  goal?: number
  showGoal?: boolean
  theme?: string
  devFeeEnabled?: boolean
  customMessage?: string
}

// Projects API
export const projectsApi = {
  async getAll(): Promise<ProjectData[]> {
    const response = await fetch(`${API_BASE}/projects`)
    if (!response.ok) throw new Error('Failed to fetch projects')
    return response.json()
  },

  async getById(id: string): Promise<ProjectData> {
    const response = await fetch(`${API_BASE}/projects/${id}`)
    if (!response.ok) throw new Error('Failed to fetch project')
    return response.json()
  },

  async create(data: CreateProjectData): Promise<ProjectData> {
    const response = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to create project')
    }
    return response.json()
  },

  async update(
    id: string,
    data: Partial<CreateProjectData>
  ): Promise<ProjectData> {
    const response = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) throw new Error('Failed to update project')
    return response.json()
  },
}

// Donations API
export const donationsApi = {
  async create(data: DonationData) {
    const response = await fetch(`${API_BASE}/donations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.message || 'Failed to record donation')
    }
    return response.json()
  },
}

// Badge API
export const getBadgeUrl = (projectId: string): string => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : ''
  return `${baseUrl}/.netlify/functions/badge/${projectId}`
}
