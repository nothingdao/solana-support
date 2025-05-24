import React, { useState, useEffect } from 'react';
import { Connection, PublicKey, Transaction, SystemProgram, LAMPORTS_PER_SOL } from '@solana/web3.js';
import type { SolanaSupportProps, ProjectData } from './types';

export const SolanaSupport: React.FC<SolanaSupportProps> = ({
  projectId,
  apiUrl = 'https://api.solana-support.dev',
  theme = 'default',
  size = 'md',
  showAmount = true,
  showGoal = false,
  className = ''
}) => {
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  const [donating, setDonating] = useState(false);

  useEffect(() => {
    fetchProjectData();
  }, [projectId]);

  const fetchProjectData = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/projects/${projectId}`);
      if (response.ok) {
        const data = await response.json();
        setProject(data);
      }
    } catch (error) {
      console.error('Failed to fetch project data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDonate = async () => {
    if (!project || !donationAmount || !window.solana) {
      alert('Please install a Solana wallet extension');
      return;
    }

    setDonating(true);
    try {
      const connection = new Connection('https://api.devnet.solana.com');
      const walletResponse = await window.solana.connect();
      const publicKey = new PublicKey(walletResponse.publicKey.toString());
      const recipientKey = new PublicKey(project.walletAddress);

      const lamports = parseFloat(donationAmount) * LAMPORTS_PER_SOL;

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: recipientKey,
          lamports: lamports,
        })
      );

      // Add dev fee if enabled
      if (project.devFeeEnabled) {
        const devFee = Math.floor(lamports * 0.02); // 2% fee
        const devWallet = new PublicKey('YOUR_DEV_WALLET_ADDRESS'); // Replace with actual dev wallet

        transaction.add(
          SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey: devWallet,
            lamports: devFee,
          })
        );
      }

      const { blockhash } = await connection.getLatestBlockhash();
      transaction.recentBlockhash = blockhash;
      transaction.feePayer = publicKey;

      const signed = await window.solana.signTransaction(transaction);
      const signature = await connection.sendRawTransaction(signed.serialize());

      // Record the donation
      await fetch(`${apiUrl}/api/donations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          projectId,
          donorWallet: publicKey.toString(),
          amount: parseFloat(donationAmount),
          txSignature: signature,
        }),
      });

      alert('Donation sent successfully!');
      setDonationAmount('');
      setIsExpanded(false);
      fetchProjectData(); // Refresh data
    } catch (error) {
      console.error('Donation failed:', error);
      alert('Donation failed. Please try again.');
    } finally {
      setDonating(false);
    }
  };

  const getThemeStyles = () => {
    const baseStyles = 'font-sans transition-all duration-200 border rounded-full';

    switch (theme) {
      case 'dark':
        return `${baseStyles} bg-gray-900 text-white border-gray-700 hover:bg-gray-800`;
      case 'minimal':
        return `${baseStyles} bg-white text-gray-700 border-gray-200 hover:bg-gray-50`;
      default:
        return `${baseStyles} bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-100`;
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1.5 text-sm';
    }
  };

  if (loading) {
    return (
      <div className={`inline-flex items-center ${getSizeStyles()} ${getThemeStyles()} animate-pulse ${className}`}>
        <div className="w-4 h-4 bg-current opacity-20 rounded-full mr-2"></div>
        <span className="opacity-60">Loading...</span>
      </div>
    );
  }

  if (!project || !project.isActive) {
    return null;
  }

  const progressPercentage = project.goal && project.showGoal ?
    Math.min((project.raised / project.goal) * 100, 100) : 0;

  return (
    <div className={`inline-block ${className}`}>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`inline-flex items-center space-x-2 ${getSizeStyles()} ${getThemeStyles()} cursor-pointer hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50`}
      >
        <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
        </svg>
        <span>Support</span>
        {showAmount && (
          <span className="font-semibold">
            {project.raised.toFixed(1)} SOL
          </span>
        )}
        {showGoal && project.showGoal && project.goal && (
          <span className="text-xs opacity-70">
            / {project.goal} SOL
          </span>
        )}
      </button>

      {isExpanded && (
        <div className="absolute z-50 mt-2 p-4 bg-white border border-gray-200 rounded-lg shadow-xl min-w-80">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900">{project.name}</h3>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {project.showGoal && project.goal && (
              <div className="space-y-1">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>{project.raised.toFixed(2)} SOL raised</span>
                  <span>Goal: {project.goal} SOL</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Donation Amount (SOL)
              </label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={donationAmount}
                onChange={(e) => setDonationAmount(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="0.00"
              />
            </div>

            <div className="flex space-x-2">
              {['0.1', '0.5', '1.0', '5.0'].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setDonationAmount(amount)}
                  className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors"
                >
                  {amount} SOL
                </button>
              ))}
            </div>

            <button
              onClick={handleDonate}
              disabled={!donationAmount || donating}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {donating ? 'Processing...' : `Donate ${donationAmount || '0'} SOL`}
            </button>

            <p className="text-xs text-gray-500 text-center">
              Powered by Solana Support
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SolanaSupport;
