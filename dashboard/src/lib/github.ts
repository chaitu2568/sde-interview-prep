import type { ProgressData } from '../types'

const REPO_OWNER = 'chaitu2568'
const REPO_NAME = 'sde-interview-prep'
const FILE_PATH = 'tracking/progress.json'
const BASE_URL = 'https://api.github.com'
const RAW_BASE_URL = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/main`
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

  // Public repo: fetch raw JSON directly (no token needed)
  // Use cache-busting param to avoid stale CDN cache
  const rawUrl = `${RAW_BASE_URL}/${FILE_PATH}?t=${Date.now()}`
  const res = await fetch(rawUrl)

  if (!res.ok) {
    if (res.status === 404) throw new Error('progress.json not found in repository.')
    throw new Error(`Failed to load progress: ${res.status} ${res.statusText}`)
  }

  const data = await res.json() as ProgressData

  // If we have a token, also fetch the SHA for future writes
  if (token) {
    try {
      const apiUrl = `${BASE_URL}/repos/${REPO_OWNER}/${REPO_NAME}/contents/${FILE_PATH}`
      const apiRes = await fetch(apiUrl, { headers: headers(token) })
      if (apiRes.ok) {
        const apiData: GitHubFileResponse = await apiRes.json()
        cachedSha = apiData.sha
      }
    } catch {
      // SHA fetch failed, will retry on save
    }
  }

  return data
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
