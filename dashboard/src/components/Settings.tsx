import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Key, TestTube2, Download, Upload, Trash2, CheckCircle2, XCircle, Loader2, GitBranch } from 'lucide-react'
import { getToken, setToken, clearToken, testConnection } from '../lib/github'
import type { Toast } from '../App'

interface SettingsProps {
  onSync: () => Promise<void>
  addToast: (message: string, type: Toast['type']) => void
}

export default function Settings({ onSync, addToast }: SettingsProps) {
  const [token, setTokenState] = useState('')
  const [showToken, setShowToken] = useState(false)
  const [testing, setTesting] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [testResult, setTestResult] = useState<{ ok: boolean; message: string } | null>(null)

  useEffect(() => {
    setTokenState(getToken())
  }, [])

  const handleSaveToken = () => {
    if (!token.trim()) {
      addToast('Token cannot be empty.', 'error')
      return
    }
    setToken(token.trim())
    addToast('Token saved to localStorage.', 'success')
    setTestResult(null)
  }

  const handleClearToken = () => {
    clearToken()
    setTokenState('')
    setTestResult(null)
    addToast('Token cleared.', 'info')
  }

  const handleTest = async () => {
    if (!token.trim()) {
      addToast('Enter a token first.', 'error')
      return
    }
    setToken(token.trim())
    setTesting(true)
    setTestResult(null)
    try {
      const user = await testConnection()
      setTestResult({ ok: true, message: `Connected as @${user.login} (${user.name})` })
      addToast(`Connected as @${user.login}`, 'success')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Connection failed'
      setTestResult({ ok: false, message: msg })
      addToast(msg, 'error')
    } finally {
      setTesting(false)
    }
  }

  const handleSync = async () => {
    setSyncing(true)
    try {
      await onSync()
    } finally {
      setSyncing(false)
    }
  }

  const handleExport = () => {
    const token = getToken()
    if (!token) {
      addToast('No data to export. Sync first.', 'error')
      return
    }
    addToast('Use the Sync button to load latest data first, then export will work.', 'info')
  }

  const tokenMasked = token.length > 8
    ? token.slice(0, 4) + '•'.repeat(token.length - 8) + token.slice(-4)
    : token

  return (
    <div style={{ maxWidth: 700, margin: '0 auto' }}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ marginBottom: 24 }}
      >
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>Settings</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--muted)' }}>
          Configure your GitHub connection and data management preferences.
        </p>
      </motion.div>

      {/* GitHub Token section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-card"
        style={{ marginBottom: 16 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(88,166,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Key size={18} style={{ color: 'var(--accent)' }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>GitHub Personal Access Token</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Required to read/write progress.json from your repo</div>
          </div>
        </div>

        <div style={{ background: 'rgba(88,166,255,0.05)', border: '1px solid rgba(88,166,255,0.15)', borderRadius: 8, padding: '12px 14px', marginBottom: 16, fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.7 }}>
          <strong style={{ color: 'var(--accent)' }}>How to get a token:</strong>
          <ol style={{ paddingLeft: 16, marginTop: 6 }}>
            <li>Go to <a href="https://github.com/settings/tokens" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--accent)' }}>github.com/settings/tokens</a></li>
            <li>Click "Generate new token (classic)"</li>
            <li>Give it a name like "interview-prep-dashboard"</li>
            <li>Select <strong style={{ color: 'var(--text)' }}>repo</strong> scope (full control)</li>
            <li>Copy the token and paste it below</li>
          </ol>
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <div style={{ flex: 1, position: 'relative' }}>
            <input
              className="gh-input"
              type={showToken ? 'text' : 'password'}
              placeholder="ghp_xxxxxxxxxxxxxxxxxxxx"
              value={token}
              onChange={e => { setTokenState(e.target.value); setTestResult(null) }}
              style={{ fontFamily: showToken ? 'inherit' : 'monospace', letterSpacing: showToken ? 'normal' : '0.1em' }}
            />
            <button
              onClick={() => setShowToken(!showToken)}
              style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', fontSize: '0.75rem',
              }}
            >
              {showToken ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Test result */}
        {testResult && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 14px',
              borderRadius: 8,
              marginBottom: 12,
              background: testResult.ok ? 'rgba(63,185,80,0.08)' : 'rgba(248,81,73,0.08)',
              border: `1px solid ${testResult.ok ? 'rgba(63,185,80,0.3)' : 'rgba(248,81,73,0.3)'}`,
              color: testResult.ok ? 'var(--green)' : 'var(--red)',
              fontSize: '0.82rem',
              fontWeight: 500,
            }}
          >
            {testResult.ok ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
            {testResult.message}
          </motion.div>
        )}

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          <button className="btn btn-primary" onClick={handleSaveToken}>
            <Key size={14} /> Save Token
          </button>
          <button className="btn btn-secondary" onClick={handleTest} disabled={testing || !token}>
            {testing ? (
              <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Testing...</>
            ) : (
              <><TestTube2 size={14} /> Test Connection</>
            )}
          </button>
          {token && (
            <button className="btn btn-danger" onClick={handleClearToken}>
              <Trash2 size={14} /> Clear Token
            </button>
          )}
        </div>
      </motion.div>

      {/* Sync section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card"
        style={{ marginBottom: 16 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(63,185,80,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <GitBranch size={18} style={{ color: 'var(--green)' }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>GitHub Sync</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
              Repository: <code style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>chaitu2568/sde-interview-prep</code>
              {' · '}File: <code style={{ color: 'var(--accent)', fontSize: '0.75rem' }}>tracking/progress.json</code>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-success" onClick={handleSync} disabled={syncing}>
            {syncing ? (
              <><Loader2 size={14} style={{ animation: 'spin 1s linear infinite' }} /> Syncing...</>
            ) : (
              <>Sync Now</>
            )}
          </button>
        </div>
      </motion.div>

      {/* Export/Import section */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card"
        style={{ marginBottom: 16 }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(210,153,34,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Download size={18} style={{ color: 'var(--orange)' }} />
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>Export / Import</div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Download or restore your progress data as JSON</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button className="btn btn-secondary" onClick={handleExport}>
            <Download size={14} /> Export JSON
          </button>
          <label className="btn btn-secondary" style={{ cursor: 'pointer' }}>
            <Upload size={14} /> Import JSON
            <input
              type="file"
              accept=".json"
              style={{ display: 'none' }}
              onChange={e => {
                const file = e.target.files?.[0]
                if (!file) return
                const reader = new FileReader()
                reader.onload = (ev) => {
                  try {
                    JSON.parse(ev.target?.result as string)
                    addToast('JSON parsed successfully. Use Save button to push to GitHub.', 'success')
                  } catch {
                    addToast('Invalid JSON file.', 'error')
                  }
                }
                reader.readAsText(file)
              }}
            />
          </label>
        </div>
      </motion.div>

      {/* About */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '16px 20px',
          fontSize: '0.8rem',
          color: 'var(--muted)',
          lineHeight: 1.7,
        }}
      >
        <strong style={{ color: 'var(--text)', display: 'block', marginBottom: 6 }}>About PrepTracker</strong>
        Built for the 12-week SDE interview grind. Tracks LeetCode problems, system design, and behavioral prep.
        Data lives in your GitHub repo — you own it. Token stored in <code style={{ color: 'var(--accent)' }}>localStorage</code> (never leaves your browser).
        <div style={{ marginTop: 8 }}>
          <strong style={{ color: 'var(--text)' }}>Start date:</strong> 2026-04-21 ·{' '}
          <strong style={{ color: 'var(--text)' }}>Target:</strong> 2026-07-13 ·{' '}
          <strong style={{ color: 'var(--text)' }}>Language:</strong> Python
        </div>
      </motion.div>

      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}
