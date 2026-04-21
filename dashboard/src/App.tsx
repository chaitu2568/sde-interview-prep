import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  LayoutDashboard, BookOpen, Cpu, MessageSquare, Settings as SettingsIcon,
  RefreshCw, CheckCircle2, XCircle, Loader2, Menu, X
} from 'lucide-react'
import { loadProgress, saveProgress, getToken } from './lib/github'
import type { ProgressData } from './types'
import { DEFAULT_STAR_STORIES } from './types'
import Dashboard from './components/Dashboard'
import Problems from './components/Problems'
import SystemDesign from './components/SystemDesign'
import Behavioral from './components/Behavioral'
import SettingsPage from './components/Settings'

type NavPage = 'dashboard' | 'problems' | 'system-design' | 'behavioral' | 'settings'

export type Toast = { id: number; message: string; type: 'success' | 'error' | 'info' }

function App() {
  const [page, setPage] = useState<NavPage>('dashboard')
  const [data, setData] = useState<ProgressData | null>(null)
  const [loading, setLoading] = useState(false)
  const [syncing, setSyncing] = useState(false)
  const [lastSync, setLastSync] = useState<Date | null>(null)
  const [syncError, setSyncError] = useState<string | null>(null)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const addToast = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, message, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000)
  }, [])

  const fetchData = useCallback(async () => {
    setLoading(true)
    setSyncError(null)
    try {
      const progress = await loadProgress()
      // Ensure star stories exist
      if (!progress.starStories) {
        progress.starStories = DEFAULT_STAR_STORIES
      }
      setData(progress)
      setLastSync(new Date())
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to load data'
      setSyncError(msg)
      addToast(msg, 'error')
    } finally {
      setLoading(false)
    }
  }, [addToast])

  const handleSave = useCallback(async (updatedData: ProgressData) => {
    if (!getToken()) {
      addToast('Add your GitHub token in Settings to save changes.', 'error')
      return
    }
    setSyncing(true)
    setSyncError(null)
    try {
      await saveProgress(updatedData)
      setData(updatedData)
      setLastSync(new Date())
      addToast('Saved to GitHub', 'success')
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Failed to save'
      setSyncError(msg)
      addToast(msg, 'error')
    } finally {
      setSyncing(false)
    }
  }, [addToast])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const navItems: { id: NavPage; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={18} /> },
    { id: 'problems', label: 'Problems', icon: <BookOpen size={18} /> },
    { id: 'system-design', label: 'System Design', icon: <Cpu size={18} /> },
    { id: 'behavioral', label: 'Behavioral', icon: <MessageSquare size={18} /> },
    { id: 'settings', label: 'Settings', icon: <SettingsIcon size={18} /> },
  ]

  const pageVariants = {
    initial: { opacity: 0, x: 16 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -16 },
  }

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--bg)', overflow: 'hidden' }}>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={false}
        style={{
          width: 240,
          background: 'var(--surface)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
          position: 'relative',
          zIndex: 50,
        }}
        className={sidebarOpen ? '' : 'sidebar-desktop'}
      >
        {/* Logo */}
        <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid var(--border)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'linear-gradient(135deg, #58a6ff, #bc8cff)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', fontWeight: 800, color: '#0d1117',
            }}>P</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>PrepTracker</div>
              <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>SDE Interview 2026</div>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '12px 12px', overflowY: 'auto' }}>
          <div style={{ marginBottom: 8, padding: '0 4px 6px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
            Navigation
          </div>
          {navItems.map(item => (
            <div
              key={item.id}
              className={`nav-item ${page === item.id ? 'active' : ''}`}
              onClick={() => { setPage(item.id); setSidebarOpen(false) }}
              style={{ marginBottom: 2 }}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </nav>

        {/* Sync status at bottom */}
        <div style={{ padding: '12px 16px', borderTop: '1px solid var(--border)', fontSize: '0.75rem' }}>
          {syncing ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--accent)' }}>
              <Loader2 size={13} style={{ animation: 'spin 1s linear infinite' }} />
              Syncing...
            </div>
          ) : syncError ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--red)' }}>
              <XCircle size={13} />
              Sync error
            </div>
          ) : lastSync ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'var(--green)' }}>
              <CheckCircle2 size={13} />
              Synced {formatRelativeTime(lastSync)}
            </div>
          ) : (
            <div style={{ color: 'var(--muted)' }}>Not synced</div>
          )}
        </div>
      </motion.aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', minWidth: 0 }}>
        {/* Top bar */}
        <header style={{
          height: 56,
          background: 'var(--surface)',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 20px',
          gap: 16,
          flexShrink: 0,
        }}>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer', display: 'none', padding: 4 }}
            className="mobile-menu-btn"
          >
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>

          <div style={{ flex: 1 }}>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text)' }}>
              {navItems.find(n => n.id === page)?.label}
            </span>
          </div>

          <button
            onClick={fetchData}
            disabled={loading}
            style={{
              background: 'var(--surface2)',
              border: '1px solid var(--border)',
              borderRadius: 8,
              color: loading ? 'var(--muted)' : 'var(--text)',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 6,
              padding: '6px 12px',
              fontSize: '0.8rem',
              fontWeight: 500,
            }}
          >
            <RefreshCw
              size={14}
              style={{ animation: loading ? 'spin 1s linear infinite' : 'none' }}
            />
            Sync
          </button>

          {/* Week indicator */}
          {data && (
            <div style={{
              background: 'rgba(88,166,255,0.1)',
              border: '1px solid rgba(88,166,255,0.2)',
              borderRadius: 8,
              padding: '4px 12px',
              fontSize: '0.8rem',
              color: 'var(--accent)',
              fontWeight: 600,
            }}>
              Week {data.currentWeek} / {data.totalWeeks}
            </div>
          )}
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflow: 'auto', padding: '24px' }}>
          {loading && !data ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: 16 }}>
              <Loader2 size={48} style={{ animation: 'spin 1s linear infinite', color: 'var(--accent)' }} />
              <div style={{ color: 'var(--muted)' }}>Loading from GitHub...</div>
            </div>
          ) : !data ? (
            <NoDataState onGoToSettings={() => setPage('settings')} />
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={page}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                style={{ height: '100%' }}
              >
                {page === 'dashboard' && <Dashboard data={data} />}
                {page === 'problems' && <Problems data={data} onSave={handleSave} />}
                {page === 'system-design' && <SystemDesign data={data} onSave={handleSave} />}
                {page === 'behavioral' && <Behavioral data={data} onSave={handleSave} />}
                {page === 'settings' && <SettingsPage onSync={fetchData} addToast={addToast} />}
              </motion.div>
            </AnimatePresence>
          )}
        </main>
      </div>

      {/* Toasts */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 10 }}>
        <AnimatePresence>
          {toasts.map(toast => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 60, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 60, scale: 0.9 }}
              transition={{ duration: 0.25 }}
              className={`toast ${toast.type}`}
            >
              {toast.type === 'success' && <CheckCircle2 size={16} />}
              {toast.type === 'error' && <XCircle size={16} />}
              {toast.type === 'info' && <RefreshCw size={16} />}
              {toast.message}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </div>
  )
}

function NoDataState({ onGoToSettings }: { onGoToSettings: () => void }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', flexDirection: 'column', gap: 20, textAlign: 'center', padding: 40 }}>
      <div style={{
        width: 80, height: 80, borderRadius: 20,
        background: 'linear-gradient(135deg, rgba(88,166,255,0.2), rgba(188,140,255,0.2))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: '2.5rem', marginBottom: 8,
      }}>
        ⚡
      </div>
      <div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text)', marginBottom: 8 }}>
          Ready to grind?
        </h2>
        <p style={{ color: 'var(--muted)', maxWidth: 360, lineHeight: 1.6 }}>
          Configure your GitHub token to sync your progress data and start tracking your interview prep journey.
        </p>
      </div>
      <button className="btn btn-primary" onClick={onGoToSettings}>
        Go to Settings
      </button>
    </div>
  )
}

function formatRelativeTime(date: Date): string {
  const diff = Math.floor((Date.now() - date.getTime()) / 1000)
  if (diff < 60) return 'just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  return `${Math.floor(diff / 3600)}h ago`
}

export default App
