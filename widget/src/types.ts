export interface SolanaSupportProps {
  projectId: string
  apiUrl?: string
  theme?: 'default' | 'dark' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  showAmount?: boolean
  showGoal?: boolean
  className?: string
}

export interface ProjectData {
  id: string
  name: string
  walletAddress: string
  raised: number
  goal: number | null
  showGoal: boolean
  isActive: boolean
  devFeeEnabled: boolean
}

export interface DonationRequest {
  projectId: string
  donorWallet: string
  amount: number
  message?: string
  txSignature: string
}

declare global {
  interface Window {
    solana?: {
      isPhantom?: boolean
      connect: () => Promise<{ publicKey: { toString(): string } }>
      disconnect: () => Promise<void>
      signTransaction: (transaction: any) => Promise<any>
      publicKey?: { toString(): string }
    }
  }
}
