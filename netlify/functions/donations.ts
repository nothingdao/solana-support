import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import { PrismaClient } from '@prisma/client'
import { Connection, PublicKey } from '@solana/web3.js'

const prisma = new PrismaClient()
const connection = new Connection(
  process.env.VITE_SOLANA_RPC_URL || 'https://api.devnet.solana.com'
)

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Content-Type': 'application/json',
}

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  const { httpMethod, body } = event

  try {
    switch (httpMethod) {
      case 'POST':
        // Record new donation
        const donationData = JSON.parse(body || '{}')

        // Validate required fields
        if (
          !donationData.projectId ||
          !donationData.donorWallet ||
          !donationData.amount ||
          !donationData.txSignature
        ) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Missing required fields' }),
          }
        }

        // Validate Solana addresses
        try {
          new PublicKey(donationData.donorWallet)
        } catch {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Invalid donor wallet address' }),
          }
        }

        // Check if project exists
        const project = await prisma.project.findUnique({
          where: { id: donationData.projectId },
        })

        if (!project || !project.isActive) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Project not found or inactive' }),
          }
        }

        // Check if transaction signature already exists
        const existingDonation = await prisma.donation.findUnique({
          where: { txSignature: donationData.txSignature },
        })

        if (existingDonation) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Transaction already recorded' }),
          }
        }

        // Verify transaction (basic check - in production you'd want more thorough verification)
        let isConfirmed = false
        try {
          const transaction = await connection.getTransaction(
            donationData.txSignature
          )
          isConfirmed = transaction !== null && transaction.meta?.err === null
        } catch (error) {
          console.log('Transaction verification failed:', error)
          // Still record the donation but mark as unconfirmed
        }

        // Create donation record
        const donation = await prisma.donation.create({
          data: {
            projectId: donationData.projectId,
            donorWallet: donationData.donorWallet,
            amount: parseFloat(donationData.amount),
            message: donationData.message,
            txSignature: donationData.txSignature,
            isConfirmed,
          },
        })

        // Update project raised amount if confirmed
        if (isConfirmed) {
          await prisma.project.update({
            where: { id: donationData.projectId },
            data: {
              raised: {
                increment: parseFloat(donationData.amount),
              },
            },
          })

          // Record dev fee if enabled
          if (project.devFeeEnabled) {
            const devFeeAmount = parseFloat(donationData.amount) * 0.02 // 2% fee
            await prisma.devFee.create({
              data: {
                donationId: donation.id,
                amount: devFeeAmount,
                txSignature: `${donationData.txSignature}_fee`, // Placeholder
              },
            })
          }
        }

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(donation),
        }

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' }),
        }
    }
  } catch (error) {
    console.error('Donation function error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' }),
    }
  }
}
