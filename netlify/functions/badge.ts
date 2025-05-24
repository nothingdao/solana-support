import type { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const handler: Handler = async (
  event: HandlerEvent,
  context: HandlerContext
) => {
  const { path } = event
  const segments = path.split('/').filter(Boolean)
  const projectId = segments[segments.length - 1]

  if (!projectId) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Project ID required',
    }
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id: projectId },
    })

    if (!project) {
      return {
        statusCode: 404,
        headers: { 'Content-Type': 'text/plain' },
        body: 'Project not found',
      }
    }

    // Generate SVG badge
    const raised = project.raised.toFixed(1)
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="120" height="20">
        <linearGradient id="b" x2="0" y2="100%">
          <stop offset="0" stop-color="#bbb" stop-opacity=".1"/>
          <stop offset="1" stop-opacity=".1"/>
        </linearGradient>
        <clipPath id="a">
          <rect width="120" height="20" rx="3" fill="#fff"/>
        </clipPath>
        <g clip-path="url(#a)">
          <path fill="#555" d="M0 0h63v20H0z"/>
          <path fill="#9945FF" d="M63 0h57v20H63z"/>
          <path fill="url(#b)" d="M0 0h120v20H0z"/>
        </g>
        <g fill="#fff" text-anchor="middle" font-family="DejaVu Sans,Verdana,Geneva,sans-serif" font-size="110">
          <text x="325" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="530">Support</text>
          <text x="325" y="140" transform="scale(.1)" textLength="530">Support</text>
          <text x="905" y="150" fill="#010101" fill-opacity=".3" transform="scale(.1)" textLength="470">${raised} SOL</text>
          <text x="905" y="140" transform="scale(.1)" textLength="470">${raised} SOL</text>
        </g>
      </svg>
    `.trim()

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'image/svg+xml',
        'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        'Access-Control-Allow-Origin': '*',
      },
      body: svg,
    }
  } catch (error) {
    console.error('Badge generation error:', error)
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'text/plain' },
      body: 'Internal server error',
    }
  }
}
