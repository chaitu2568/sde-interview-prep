import { motion } from 'framer-motion'
import { CheckCircle2, Circle, Star } from 'lucide-react'
import type { ProgressData, SystemDesign as SystemDesignType } from '../types'

interface SystemDesignProps {
  data: ProgressData
  onSave: (data: ProgressData) => Promise<void>
}

export default function SystemDesign({ data, onSave }: SystemDesignProps) {
  const { systemDesigns } = data
  const completedCount = systemDesigns.filter(s => s.completed).length

  const handleToggle = async (design: SystemDesignType) => {
    const updated = data.systemDesigns.map(s =>
      s.id === design.id ? { ...s, completed: !s.completed } : s
    )
    const completedCount = updated.filter(s => s.completed).length
    await onSave({
      ...data,
      systemDesigns: updated,
      stats: { ...data.stats, systemDesigns: completedCount },
    })
  }

  const handleConfidence = async (design: SystemDesignType, rating: number) => {
    const updated = data.systemDesigns.map(s =>
      s.id === design.id ? { ...s, confidence: rating } : s
    )
    await onSave({ ...data, systemDesigns: updated })
  }

  const handleNotes = async (design: SystemDesignType, notes: string) => {
    const updated = data.systemDesigns.map(s =>
      s.id === design.id ? { ...s, notes } : s
    )
    await onSave({ ...data, systemDesigns: updated })
  }

  // Group by week
  const byWeek = systemDesigns.reduce((acc, sd) => {
    const w = sd.week
    if (!acc[w]) acc[w] = []
    acc[w].push(sd)
    return acc
  }, {} as Record<number, SystemDesignType[]>)

  const systemDesignTopics = [
    'Load Balancing & Scaling', 'Caching strategies (Redis)', 'Database sharding & replication',
    'CAP theorem', 'Message queues (Kafka)', 'CDN & edge computing',
    'API design (REST/GraphQL)', 'Microservices patterns', 'Consistent hashing',
  ]

  return (
    <div style={{ maxWidth: 1000, margin: '0 auto' }}>
      {/* Header stats */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex',
          gap: 20,
          marginBottom: 28,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '20px 24px',
          alignItems: 'center',
        }}
      >
        <div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--purple)', lineHeight: 1 }}>
            {completedCount}
            <span style={{ fontSize: '1rem', color: 'var(--muted)', fontWeight: 500, marginLeft: 6 }}>
              / {systemDesigns.length}
            </span>
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: 4 }}>System Designs Complete</div>
        </div>
        <div style={{ flex: 1 }}>
          <div className="progress-bar" style={{ height: 10 }}>
            <motion.div
              className="progress-fill"
              animate={{ width: `${(completedCount / systemDesigns.length) * 100}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              style={{ height: '100%', borderRadius: 5, background: 'linear-gradient(90deg, var(--purple), #58a6ff)' }}
            />
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '1.3rem', fontWeight: 700, color: 'var(--accent)' }}>
            {systemDesigns.length > 0 ? Math.round((completedCount / systemDesigns.length) * 100) : 0}%
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Complete</div>
        </div>
      </motion.div>

      {/* Design cards by week */}
      {Object.entries(byWeek)
        .sort(([a], [b]) => Number(a) - Number(b))
        .map(([week, designs], groupIdx) => (
          <div key={week} style={{ marginBottom: 28 }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 12 }}>
              Week {week}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 14 }}>
              {designs.map((design, idx) => (
                <DesignCard
                  key={design.id}
                  design={design}
                  animDelay={groupIdx * 0.1 + idx * 0.08}
                  onToggle={handleToggle}
                  onConfidence={handleConfidence}
                  onNotesChange={handleNotes}
                />
              ))}
            </div>
          </div>
        ))}

      {/* Key topics section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '20px 24px',
          marginTop: 8,
        }}
      >
        <h3 style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', marginBottom: 14 }}>
          Key Topics to Cover in Every Design
        </h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {systemDesignTopics.map(topic => (
            <span
              key={topic}
              style={{
                background: 'rgba(188,140,255,0.1)',
                border: '1px solid rgba(188,140,255,0.2)',
                borderRadius: 20,
                padding: '4px 12px',
                fontSize: '0.78rem',
                color: 'var(--purple)',
                fontWeight: 500,
              }}
            >
              {topic}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

interface DesignCardProps {
  design: SystemDesignType
  animDelay: number
  onToggle: (d: SystemDesignType) => Promise<void>
  onConfidence: (d: SystemDesignType, rating: number) => Promise<void>
  onNotesChange: (d: SystemDesignType, notes: string) => Promise<void>
}

function DesignCard({ design, animDelay, onToggle, onConfidence, onNotesChange }: DesignCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: animDelay }}
      style={{
        background: 'var(--surface)',
        border: `1px solid ${design.completed ? 'rgba(63,185,80,0.35)' : 'var(--border)'}`,
        borderRadius: 12,
        padding: '18px',
        transition: 'border-color 0.2s, transform 0.2s, box-shadow 0.2s',
        cursor: 'default',
      }}
      whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
    >
      {/* Header row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <h4 style={{
          fontWeight: 700,
          fontSize: '0.9rem',
          color: design.completed ? 'var(--green)' : 'var(--text)',
          flex: 1,
          lineHeight: 1.3,
        }}>
          {design.name}
        </h4>
        <button
          onClick={() => onToggle(design)}
          style={{ background: 'none', border: 'none', cursor: 'pointer', flexShrink: 0, marginLeft: 10, padding: 2 }}
          title={design.completed ? 'Mark incomplete' : 'Mark complete'}
        >
          {design.completed ? (
            <CheckCircle2 size={22} style={{ color: 'var(--green)' }} />
          ) : (
            <Circle size={22} style={{ color: 'var(--border)' }} />
          )}
        </button>
      </div>

      {/* Week tag */}
      <div style={{ marginBottom: 12 }}>
        <span style={{
          fontSize: '0.7rem', fontWeight: 600, color: 'var(--muted)',
          background: 'var(--surface2)', borderRadius: 4, padding: '2px 8px',
        }}>
          Week {design.week}
        </span>
      </div>

      {/* Confidence stars */}
      <div style={{ marginBottom: 12 }}>
        <div style={{ fontSize: '0.7rem', color: 'var(--muted)', marginBottom: 6 }}>Confidence</div>
        <div style={{ display: 'flex', gap: 4 }}>
          {[1, 2, 3, 4, 5].map(star => (
            <Star
              key={star}
              size={18}
              className="star"
              onClick={() => onConfidence(design, star)}
              style={{
                color: star <= design.confidence ? 'var(--yellow)' : 'var(--border)',
                fill: star <= design.confidence ? 'var(--yellow)' : 'none',
              }}
            />
          ))}
        </div>
      </div>

      {/* Notes */}
      <textarea
        className="gh-input"
        placeholder="Notes, key decisions, patterns used..."
        value={design.notes}
        onChange={e => onNotesChange(design, e.target.value)}
        rows={2}
        style={{ fontSize: '0.78rem', resize: 'none', fontFamily: 'inherit' }}
        onBlur={() => {}}
      />
    </motion.div>
  )
}
