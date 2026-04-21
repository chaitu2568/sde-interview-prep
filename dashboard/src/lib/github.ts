import type { ProgressData } from '../types'

const REPO_OWNER = 'chaitu2568'
const REPO_NAME = 'sde-interview-prep'
const FILE_PATH = 'tracking/progress.json'
const BASE_URL = 'https://api.github.com'
const TOKEN_KEY = 'gh_token'

export function getToken(): string {
  return localStorage.getItem(TOKEN_KEY) || ''
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

function headers(token: string): Record<string, string> {
  return {
    'Accept': 'application/vnd.github+json',
    'Authorization': `Bearer ${token}`,
    'X-GitHub-Api-Version': '2022-11-28',
    'Content-Type': 'application/json',
  }
}

interface GitHubFileResponse {
  content: string
  sha: string
  name: string
  path: string
}

let cachedSha: string | null = null

export async function loadProgress(): Promise<ProgressData> {
  const token = getToken()
  if (!token) {
    throw new Error('No GitHub token configured. Please add your token in Settings.')
  }

  const url = `${BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`
  const res = await fetch(url, { headers: headers(token) })

  if (!res.ok) {
    if (res.status === 401) throw new Error('Invalid GitHub token. Please check your token in Settings.')
    if (res.status === 404) throw new Error('File not found in repository. Check repo and file path.')
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`)
  }

  const data: GitHubFileResponse = await res.json()
  cachedSha = data.sha

  // GitHub returns base64 encoded content
  const decoded = atob(data.content.replace(/\n/g, ''))
  return JSON.parse(decoded) as ProgressData
}

export async function saveProgress(progress: ProgressData): Promise<void> {
  const token = getToken()
  if (!token) {
    throw new Error('No GitHub token configured.')
  }

  if (!cachedSha) {
    // Fetch the current SHA first
    const url = `${BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`
    const res = await fetch(url, { headers: headers(token) })
    if (res.ok) {
      const data: GitHubFileResponse = await res.json()
      cachedSha = data.sha
    }
  }

  const content = btoa(unescape(encodeURIComponent(JSON.stringify(progress, null, 2))))
  const url = `${BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`

  const body: Record<string, string> = {
    message: `Update progress: ${progress.stats.totalSolved} problems solved`,
    content,
  }
  if (cachedSha) {
    body.sha = cachedSha
  }

  const res = await fetch(url, {
    method: 'PUT',
    headers: headers(token),
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    if (res.status === 401) throw new Error('Invalid GitHub token.')
    if (res.status === 409) throw new Error('Conflict: File was updated elsewhere. Refresh to get latest.')
    throw new Error(`Failed to save: ${res.status} ${res.statusText}`)
  }

  const result = await res.json()
  // Update SHA for next save
  if (result?.content?.sha) {
    cachedSha = result.content.sha
  }
}

export async function testConnection(): Promise<{ login: string; name: string }> {
  const token = getToken()
  if (!token) throw new Error('No token configured.')

  const res = await fetch(`${BASE_URL}/user`, { headers: headers(token) })
  if (!res.ok) {
    if (res.status === 401) throw new Error('Invalid token.')
    throw new Error(`API error: ${res.status}`)
  }
  const data = await res.json()
  return { login: data.login, name: data.name || data.login }
}
