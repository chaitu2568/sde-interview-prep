import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronUp, CheckCircle2, AlertCircle, Circle, BookOpen } from 'lucide-react'
import type { ProgressData, StarStory, StoryStatus } from '../types'
import { DEFAULT_STAR_STORIES } from '../types'

interface BehavioralProps {
  data: ProgressData
  onSave: (data: ProgressData) => Promise<void>
}

const STATUS_CONFIG: Record<StoryStatus, { label: string; color: string; icon: React.ReactNode }> = {
  written: { label: 'Written', color: 'var(--green)', icon: <CheckCircle2 size={14} /> },
  'needs-work': { label: 'Needs Work', color: 'var(--orange)', icon: <AlertCircle size={14} /> },
  empty: { label: 'Not Started', color: 'var(--muted)', icon: <Circle size={14} /> },
}

const STAR_TIPS = {
  situation: 'Set the scene. When, where, what was the context? (2-3 sentences)',
  task: 'What was YOUR responsibility or challenge in this situation?',
  action: 'What specific steps did YOU take? Use "I" not "we". Be specific about your contributions.',
  result: 'What was the outcome? Use metrics if possible. What did you learn?',
}

const THEME_ICONS: Record<string, string> = {
  'Leadership': '👑',
  'Conflict Resolution': '🤝',
  'Technical Challenge': '⚡',
  'Failure & Recovery': '🔄',
  'Innovation': '💡',
  'Collaboration': '🧩',
  'Impact at Scale': '📈',
  'Ownership': '🎯',
  'Mentorship': '🌱',
  'Deadline / Pressure': '⏰',
}

export default function Behavioral({ data, onSave }: BehavioralProps) {
  const stories: StarStory[] = data.starStories || DEFAULT_STAR_STORIES
  const [expanded, setExpanded] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const [localStories, setLocalStories] = useState<StarStory[]>(stories)

  const writtenCount = localStories.filter(s => s.status === 'written').length
  const needsWorkCount = localStories.filter(s => s.status === 'needs-work').length

  const toggleExpand = (id: number) => {
    setExpanded(prev => prev === id ? null : id)
  }

  const updateStory = (id: number, field: keyof StarStory, value: string) => {
    setLocalStories(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s))
  }

  const setStatus = (id: number, status: StoryStatus) => {
    setLocalStories(prev => prev.map(s => s.id === id ? { ...s, status } : s))
  }

  const handleSave = async () => {
    setSaving(true)
    const writtenCount = localStories.filter(s => s.status === 'written').length
    await onSave({
      ...data,
      starStories: localStories,
      stats: { ...data.stats, starStories: writtenCount },
    })
    setSaving(false)
  }

  const commonQuestions = [
    'Tell me about yourself.',
    'Why do you want to work at [company]?',
    'What\'s your greatest technical achievement?',
    'Describe a time you disagreed with your manager.',
    'Tell me about a time you failed. What did you learn?',
    'How do you handle competing priorities?',
    'Describe a situation where you had to learn something quickly.',
    'Tell me about a time you influenced others without authority.',
  ]

  return (
    <div style={{ maxWidth: 900, margin: '0 auto' }}>
      {/* Header stats */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex',
          gap: 20,
          marginBottom: 24,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '20px 24px',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <div style={{ flex: 1 }}>
          <h2 style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text)', marginBottom: 4 }}>
            STAR Story Bank
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--muted)', lineHeight: 1.5 }}>
            Prepare compelling stories for behavioral interviews. Aim for 8-10 solid stories covering different themes.
          </p>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--green)' }}>{writtenCount}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>Written</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--orange)' }}>{needsWorkCount}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>Needs Work</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--muted)' }}>{localStories.length - writtenCount - needsWorkCount}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>Not Started</div>
          </div>
        </div>
        <button
          className="btn btn-primary"
          onClick={handleSave}
          disabled={saving}
          style={{ flexShrink: 0 }}
        >
          {saving ? 'Saving...' : 'Save All'}
        </button>
      </motion.div>

      {/* Story cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
        {localStories.map((story, idx) => {
          const statusConfig = STATUS_CONFIG[story.status]
          const isOpen = expanded === story.id

          return (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.06 }}
              className={`star-story-card ${story.status !== 'empty' ? story.status : ''}`}
            >
              {/* Card header */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  padding: '14px 18px',
                  cursor: 'pointer',
                }}
                onClick={() => toggleExpand(story.id)}
              >
                <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{THEME_ICONS[story.theme] || '📝'}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                      {story.theme}
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.72rem', color: statusConfig.color }}>
                      {statusConfig.icon} {statusConfig.label}
                    </span>
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {story.title || <span style={{ color: 'var(--muted)', fontStyle: 'italic', fontWeight: 400 }}>Click to add your story...</span>}
                  </div>
                </div>

                {/* Status buttons */}
                <div style={{ display: 'flex', gap: 6, flexShrink: 0 }} onClick={e => e.stopPropagation()}>
                  {(['written', 'needs-work', 'empty'] as StoryStatus[]).map(s => (
                    <button
                      key={s}
                      onClick={() => setStatus(story.id, s)}
                      style={{
                        padding: '3px 8px',
                        borderRadius: 6,
                        fontSize: '0.68rem',
                        fontWeight: 600,
                        border: `1px solid ${story.status === s ? STATUS_CONFIG[s].color : 'var(--border)'}`,
                        background: story.status === s ? `${STATUS_CONFIG[s].color}18` : 'transparent',
                        color: story.status === s ? STATUS_CONFIG[s].color : 'var(--muted)',
                        cursor: 'pointer',
                        transition: 'all 0.15s',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {STATUS_CONFIG[s].label}
                    </button>
                  ))}
                </div>

                <div style={{ color: 'var(--muted)', flexShrink: 0 }}>
                  {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </div>
              </div>

              {/* Expanded content */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{ padding: '0 18px 18px', borderTop: '1px solid var(--border)' }}>
                      {/* Title */}
                      <div style={{ paddingTop: 14, marginBottom: 16 }}>
                        <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>
                          Story Title / Summary
                        </label>
                        <input
                          className="gh-input"
                          placeholder="One-line description: 'Led migration of legacy payment system...'"
                          value={story.title}
                          onChange={e => updateStory(story.id, 'title', e.target.value)}
                        />
                      </div>

                      {/* STAR fields */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                        {(['situation', 'task', 'action', 'result'] as const).map(field => (
                          <div key={field}>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                              {field.charAt(0).toUpperCase() + field.slice(1)}
                            </label>
                            <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginBottom: 6, lineHeight: 1.4 }}>
                              {STAR_TIPS[field]}
                            </div>
                            <textarea
                              className="gh-input"
                              value={story[field]}
                              onChange={e => updateStory(story.id, field, e.target.value)}
                              rows={4}
                              style={{ resize: 'vertical', fontFamily: 'inherit', fontSize: '0.82rem' }}
                              placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}...`}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </div>

      {/* Common questions reference */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '20px 24px',
        }}
      >
        <h3 style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
          <BookOpen size={16} style={{ color: 'var(--accent)' }} />
          Common Behavioral Questions
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {commonQuestions.map((q, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--muted)', flexShrink: 0, marginTop: 1 }}>Q{i + 1}</span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text)', lineHeight: 1.5 }}>{q}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
