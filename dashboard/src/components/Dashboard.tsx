import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import ReactConfetti from 'react-confetti'
import {
  Zap, Flame, Target, Brain, TrendingUp, Award, Calendar
} from 'lucide-react'
import type { ProgressData } from '../types'
import { PATTERNS } from '../types'

const QUOTES = [
  { text: "Every expert was once a beginner. Every pro was once an amateur.", author: "Robin Sharma" },
  { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
  { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
  { text: "Hard problems are just easy problems you haven't solved yet.", author: "Anonymous" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
  { text: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Abelson & Sussman" },
  { text: "In a world of algorithms, be the one who understands them.", author: "Unknown" },
]

function getDailyQuote() {
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000)
  return QUOTES[dayOfYear % QUOTES.length]
}

function AnimatedNumber({ value, duration = 1200 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    const start = Date.now()
    const end = start + duration
    const tick = () => {
      const now = Date.now()
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [value, duration])

  return <span>{display}</span>
}

interface DashboardProps {
  data: ProgressData
}

export default function Dashboard({ data }: DashboardProps) {
  const { stats, problems, systemDesigns, confidence } = data
  const [showConfetti, setShowConfetti] = useState(false)
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight })

  const quote = getDailyQuote()
  const totalProblems = problems.length
  const solvedProblems = problems.filter(p => p.solved)
  const overallProgress = totalProblems > 0 ? (stats.totalSolved / totalProblems) * 100 : 0

  // Check milestone
  useEffect(() => {
    if (stats.totalSolved > 0 && stats.totalSolved % 10 === 0) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 5000)
    }
  }, [stats.totalSolved])

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Pie chart data
  const pieData = [
    { name: 'Easy', value: stats.easy || 0, color: '#3fb950' },
    { name: 'Medium', value: stats.medium || 0, color: '#d29922' },
    { name: 'Hard', value: stats.hard || 0, color: '#f85149' },
    { name: 'Unsolved', value: totalProblems - stats.totalSolved, color: '#21262d' },
  ].filter(d => d.value > 0)

  // Pattern progress
  const patternProgress = PATTERNS.map(pattern => {
    const patternProblems = problems.filter(p => p.pattern === pattern.key)
    const solved = patternProblems.filter(p => p.solved).length
    return { ...pattern, solved, total: patternProblems.length }
  }).filter(p => p.total > 0)

  // Activity heatmap (last 84 days = 12 weeks)
  const heatmapData = generateHeatmap(solvedProblems.map(p => p.date).filter(Boolean) as string[])

  // Confidence score (average of all patterns)
  const confidenceValues = Object.values(confidence)
  const avgConfidence = confidenceValues.length > 0
    ? Math.round(confidenceValues.reduce((a, b) => a + b, 0) / confidenceValues.length * 10)
    : 0

  const statCards = [
    {
      label: 'Problems Solved',
      value: stats.totalSolved,
      total: totalProblems,
      icon: <Zap size={20} />,
      iconBg: 'rgba(88,166,255,0.15)',
      iconColor: '#58a6ff',
      suffix: `/ ${totalProblems}`,
    },
    {
      label: 'Current Streak',
      value: stats.currentStreak,
      icon: <Flame size={20} />,
      iconBg: 'rgba(210,153,34,0.15)',
      iconColor: '#d29922',
      suffix: 'days',
    },
    {
      label: 'System Designs',
      value: stats.systemDesigns,
      total: systemDesigns.length,
      icon: <Brain size={20} />,
      iconBg: 'rgba(188,140,255,0.15)',
      iconColor: '#bc8cff',
      suffix: `/ ${systemDesigns.length}`,
    },
    {
      label: 'Confidence Score',
      value: avgConfidence,
      icon: <Target size={20} />,
      iconBg: 'rgba(63,185,80,0.15)',
      iconColor: '#3fb950',
      suffix: '/ 100',
    },
  ]

  const completedDesigns = systemDesigns.filter(s => s.completed)

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto' }}>
      {showConfetti && (
        <ReactConfetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={300}
          colors={['#58a6ff', '#bc8cff', '#3fb950', '#d29922', '#f85149']}
        />
      )}

      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{
          background: 'linear-gradient(135deg, #161b22 0%, #1a1f2e 50%, #161b22 100%)',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '28px 32px',
          marginBottom: 24,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Decorative orbs */}
        <div style={{
          position: 'absolute', top: -40, right: -40, width: 200, height: 200,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(88,166,255,0.1) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', bottom: -30, left: 200, width: 150, height: 150,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(188,140,255,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 8 }}>
              Daily Inspiration
            </div>
            <blockquote style={{ fontSize: '1.15rem', fontWeight: 500, color: 'var(--text)', lineHeight: 1.5, maxWidth: 600, fontStyle: 'italic', marginBottom: 8 }}>
              "{quote.text}"
            </blockquote>
            <cite style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>— {quote.author}</cite>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--accent)', lineHeight: 1 }}>
              <AnimatedNumber value={Math.round(overallProgress)} />%
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginTop: 4 }}>Overall Complete</div>
          </div>
        </div>

        {/* Progress bar */}
        <div style={{ marginTop: 20 }}>
          <div className="progress-bar" style={{ height: 8 }}>
            <motion.div
              className="progress-fill"
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
              style={{ height: '100%', borderRadius: 4 }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: '0.75rem', color: 'var(--muted)' }}>
            <span>Start: {data.startDate}</span>
            <span>{stats.totalSolved} / {totalProblems} problems</span>
            <span>Target: {data.targetEndDate}</span>
          </div>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginBottom: 24 }}>
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="glass-card"
            style={{ display: 'flex', alignItems: 'center', gap: 16 }}
          >
            <div className="stat-icon" style={{ background: card.iconBg, color: card.iconColor }}>
              {card.icon}
            </div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text)', lineHeight: 1 }}>
                <AnimatedNumber value={card.value} />
                <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'var(--muted)', marginLeft: 4 }}>
                  {card.suffix}
                </span>
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginTop: 4 }}>{card.label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 16, marginBottom: 24 }}>
        {/* Pie chart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="glass-card"
        >
          <div style={{ marginBottom: 16 }}>
            <h3 style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <TrendingUp size={16} style={{ color: 'var(--accent)' }} />
              Difficulty Breakdown
            </h3>
          </div>
          {stats.totalSolved === 0 ? (
            <div style={{ textAlign: 'center', color: 'var(--muted)', padding: '40px 0', fontSize: '0.875rem' }}>
              No problems solved yet. Let's go!
            </div>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      background: 'var(--surface2)',
                      border: '1px solid var(--border)',
                      borderRadius: 8,
                      color: 'var(--text)',
                      fontSize: '0.8rem',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 16, flexWrap: 'wrap' }}>
                {[
                  { label: 'Easy', count: stats.easy, color: '#3fb950' },
                  { label: 'Medium', count: stats.medium, color: '#d29922' },
                  { label: 'Hard', count: stats.hard, color: '#f85149' },
                ].map(item => (
                  <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color }} />
                    <span style={{ color: 'var(--muted)' }}>{item.label}:</span>
                    <span style={{ color: item.color, fontWeight: 700 }}>{item.count}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </motion.div>

        {/* Activity heatmap */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="glass-card"
        >
          <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h3 style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Calendar size={16} style={{ color: 'var(--accent)' }} />
              Activity (Last 12 Weeks)
            </h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
              {solvedProblems.length} total
            </span>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <div style={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
              {/* Day labels */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 3, marginRight: 4, paddingTop: 0 }}>
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                  <div key={i} style={{ width: 12, height: 12, fontSize: '0.6rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {i % 2 === 1 ? d : ''}
                  </div>
                ))}
              </div>
              {heatmapData.map((week, wi) => (
                <div key={wi} style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {week.map((level, di) => (
                    <div
                      key={di}
                      className="heatmap-cell"
                      data-level={level}
                      title={`Level ${level}`}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 12, fontSize: '0.7rem', color: 'var(--muted)' }}>
              <span>Less</span>
              {[0, 1, 2, 3, 4].map(l => (
                <div key={l} className="heatmap-cell" data-level={l} style={{ flexShrink: 0 }} />
              ))}
              <span>More</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Pattern progress grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card"
        style={{ marginBottom: 24 }}
      >
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Award size={16} style={{ color: 'var(--accent)' }} />
            Pattern Mastery
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
            {patternProgress.filter(p => p.solved === p.total && p.total > 0).length} / {patternProgress.length} patterns complete
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
          {patternProgress.map((pattern, i) => {
            const pct = pattern.total > 0 ? (pattern.solved / pattern.total) * 100 : 0
            const complete = pattern.solved === pattern.total && pattern.total > 0
            return (
              <motion.div
                key={pattern.key}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                style={{
                  background: 'var(--surface2)',
                  borderRadius: 10,
                  padding: '12px 14px',
                  border: `1px solid ${complete ? 'rgba(63,185,80,0.3)' : 'var(--border)'}`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color: complete ? 'var(--green)' : 'var(--text)' }}>
                    {complete && '✓ '}{pattern.label}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 600 }}>
                    {pattern.solved} / {pattern.total}
                  </span>
                </div>
                <div className="progress-bar">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 1, ease: 'easeOut', delay: 0.5 + i * 0.03 }}
                    style={{
                      height: '100%',
                      borderRadius: 3,
                      background: complete
                        ? `linear-gradient(90deg, var(--green), #56e36a)`
                        : `linear-gradient(90deg, ${pattern.color}, ${pattern.color}99)`,
                    }}
                  />
                </div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>

      {/* System Design mini cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="glass-card"
      >
        <div style={{ marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Brain size={16} style={{ color: 'var(--purple)' }} />
            System Design Track
          </h3>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>
            {completedDesigns.length} / {systemDesigns.length} complete
          </span>
        </div>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {systemDesigns.map(sd => (
            <div
              key={sd.id}
              style={{
                padding: '8px 14px',
                borderRadius: 8,
                fontSize: '0.8rem',
                fontWeight: 500,
                border: `1px solid ${sd.completed ? 'rgba(63,185,80,0.4)' : 'var(--border)'}`,
                background: sd.completed ? 'rgba(63,185,80,0.08)' : 'var(--surface2)',
                color: sd.completed ? 'var(--green)' : 'var(--muted)',
              }}
            >
              {sd.completed ? '✓ ' : ''}{sd.name}
              <span style={{ marginLeft: 6, fontSize: '0.7rem', color: 'var(--muted)' }}>W{sd.week}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

function generateHeatmap(dates: string[]): number[][] {
  const weeks = 12
  const days = 7
  const grid: number[][] = Array.from({ length: weeks }, () => Array(days).fill(0))

  const now = new Date()
  const startDate = new Date(now)
  startDate.setDate(startDate.getDate() - (weeks * days - 1))

  const dateMap = new Map<string, number>()
  for (const d of dates) {
    if (!d) continue
    dateMap.set(d, (dateMap.get(d) || 0) + 1)
  }

  for (let w = 0; w < weeks; w++) {
    for (let d = 0; d < days; d++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + w * 7 + d)
      const key = date.toISOString().split('T')[0]
      const count = dateMap.get(key) || 0
      grid[w][d] = count === 0 ? 0 : count === 1 ? 1 : count === 2 ? 2 : count <= 4 ? 3 : 4
    }
  }

  return grid
}
