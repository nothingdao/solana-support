// 📄 netlify/functions/project.ts
import type { Handler, HandlerEvent } from '@netlify/functions'
import { PrismaClient } from '@prisma/client'
import { PublicKey } from '@solana/web3.js'

const prisma = new PrismaClient()

const headers = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Content-Type': 'application/json',
}

export const handler: Handler = async (event: HandlerEvent) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    }
  }

  const { httpMethod, path, body } = event
  const segments = path.split('/').filter(Boolean)
  const projectId = segments[segments.length - 1]

  try {
    switch (httpMethod) {
      case 'POST': {
        // Create new project
        const projectData = JSON.parse(body || '{}')

        // Validate required fields
        if (!projectData.name || !projectData.walletAddress) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              error: 'Name and wallet address are required',
            }),
          }
        }

        // Validate Solana wallet address
        try {
          new PublicKey(projectData.walletAddress)
        } catch {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              error: 'Invalid Solana wallet address',
            }),
          }
        }

        // Check if wallet address already has a project
        const existingProject = await prisma.project.findUnique({
          where: { walletAddress: projectData.walletAddress },
        })

        if (existingProject) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({
              error: 'This wallet address already has a project',
            }),
          }
        }

        // Create the project
        const newProject = await prisma.project.create({
          data: {
            name: projectData.name.trim(),
            description: projectData.description?.trim() || null,
            walletAddress: projectData.walletAddress,
            goal: projectData.goal ? parseFloat(projectData.goal) : null,
            showGoal: projectData.showGoal ?? true,
            theme: projectData.theme || 'default',
            devFeeEnabled: projectData.devFeeEnabled ?? false,
            customMessage: projectData.customMessage?.trim() || null,
          },
        })

        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(newProject),
        }
      }

      case 'GET': {
        if (projectId && projectId !== 'projects') {
          // Get single project
          const project = await prisma.project.findUnique({
            where: { id: projectId },
            include: {
              donations: {
                where: { isConfirmed: true },
                orderBy: { createdAt: 'desc' },
                take: 10,
              },
            },
          })

          if (!project) {
            return {
              statusCode: 404,
              headers,
              body: JSON.stringify({ error: 'Project not found' }),
            }
          }

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(project),
          }
        } else {
          // Get all projects
          const projects = await prisma.project.findMany({
            where: { isActive: true },
            include: {
              _count: {
                select: { donations: { where: { isConfirmed: true } } },
              },
            },
            orderBy: { createdAt: 'desc' },
          })

          return {
            statusCode: 200,
            headers,
            body: JSON.stringify(projects),
          }
        }
      }

      case 'PUT': {
        // Update project
        if (!projectId) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Project ID required' }),
          }
        }

        const updateData = JSON.parse(body || '{}')

        const updatedProject = await prisma.project.update({
          where: { id: projectId },
          data: {
            name: updateData.name,
            description: updateData.description,
            goal: updateData.goal ? parseFloat(updateData.goal) : null,
            showGoal: updateData.showGoal,
            theme: updateData.theme,
            devFeeEnabled: updateData.devFeeEnabled,
            customMessage: updateData.customMessage,
            isActive: updateData.isActive,
          },
        })

        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(updatedProject),
        }
      }

      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' }),
        }
    }
  } catch (error) {
    console.error('Function error:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    }
  }
}
