import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, CheckCircle2, HelpCircle, XCircle, ExternalLink, ChevronRight } from 'lucide-react'
import type { ProgressData, Problem, SolvedAlone, Difficulty } from '../types'
import { PATTERNS } from '../types'

interface ProblemsProps {
  data: ProgressData
  onSave: (data: ProgressData) => Promise<void>
}

interface SolveModalState {
  problem: Problem
}

export default function Problems({ data, onSave }: ProblemsProps) {
  const [selectedWeek, setSelectedWeek] = useState(data.currentWeek || 1)
  const [search, setSearch] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState<Difficulty | 'All'>('All')
  const [filterPattern, setFilterPattern] = useState<string>('All')
  const [modal, setModal] = useState<SolveModalState | null>(null)
  const [saving, setSaving] = useState(false)

  // Modal form state
  const [modalTime, setModalTime] = useState<string>('')
  const [modalSolvedAlone, setModalSolvedAlone] = useState<SolvedAlone>('yes')
  const [modalNotes, setModalNotes] = useState('')

  const weeks = Array.from({ length: data.totalWeeks }, (_, i) => i + 1)

  const weekProblems = useMemo(() => {
    return data.problems.filter(p => p.week === selectedWeek)
  }, [data.problems, selectedWeek])

  const filteredProblems = useMemo(() => {
    return weekProblems.filter(p => {
      const matchSearch = search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.num.toString().includes(search)
      const matchDiff = filterDifficulty === 'All' || p.difficulty === filterDifficulty
      const matchPattern = filterPattern === 'All' || p.pattern === filterPattern
      return matchSearch && matchDiff && matchPattern
    })
  }, [weekProblems, search, filterDifficulty, filterPattern])

  const weekStats = useMemo(() => {
    const solved = weekProblems.filter(p => p.solved)
    return {
      total: weekProblems.length,
      solved: solved.length,
      easy: solved.filter(p => p.difficulty === 'Easy').length,
      medium: solved.filter(p => p.difficulty === 'Medium').length,
      hard: solved.filter(p => p.difficulty === 'Hard').length,
      avgTime: solved.filter(p => p.time).length > 0
        ? Math.round(solved.filter(p => p.time).reduce((a, p) => a + (p.time || 0), 0) / solved.filter(p => p.time).length)
        : 0,
    }
  }, [weekProblems])

  const openModal = (problem: Problem) => {
    setModal({ problem })
    setModalTime(problem.time?.toString() || '')
    setModalSolvedAlone(problem.solvedAlone || 'yes')
    setModalNotes(problem.notes || '')
  }

  const closeModal = () => {
    setModal(null)
    setModalTime('')
    setModalSolvedAlone('yes')
    setModalNotes('')
  }

  const handleToggleSolve = (problem: Problem) => {
    if (!problem.solved) {
      // Opening modal to fill in details
      openModal(problem)
    } else {
      // Un-solve directly
      handleSaveProblem(problem, false, null, null, problem.notes)
    }
  }

  const handleSaveProblem = async (
    problem: Problem,
    solved: boolean,
    time: number | null,
    solvedAlone: SolvedAlone,
    notes: string
  ) => {
    setSaving(true)
    const today = new Date().toISOString().split('T')[0]

    const updatedProblems = data.problems.map(p => {
      if (p.id !== problem.id) return p
      return {
        ...p,
        solved,
        date: solved ? today : null,
        time,
        solvedAlone,
        notes,
      }
    })

    // Recalculate stats
    const solved_list = updatedProblems.filter(p => p.solved)
    const newStats = {
      ...data.stats,
      totalSolved: solved_list.length,
      easy: solved_list.filter(p => p.difficulty === 'Easy').length,
      medium: solved_list.filter(p => p.difficulty === 'Medium').length,
      hard: solved_list.filter(p => p.difficulty === 'Hard').length,
    }

    await onSave({ ...data, problems: updatedProblems, stats: newStats })
    setSaving(false)
    closeModal()
  }

  const handleModalSubmit = () => {
    if (!modal) return
    handleSaveProblem(
      modal.problem,
      true,
      modalTime ? parseInt(modalTime) : null,
      modalSolvedAlone,
      modalNotes,
    )
  }

  const patternsInWeek = [...new Set(weekProblems.map(p => p.pattern))]

  const difficultyColor: Record<Difficulty, string> = {
    Easy: 'var(--green)',
    Medium: 'var(--orange)',
    Hard: 'var(--red)',
  }

  return (
    <div style={{ maxWidth: 1100, margin: '0 auto' }}>
      {/* Week stats banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          display: 'flex',
          gap: 16,
          marginBottom: 20,
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 12,
          padding: '16px 20px',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <div style={{ flex: 1, minWidth: 120 }}>
          <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: 4 }}>Week Progress</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text)' }}>
            {weekStats.solved} / {weekStats.total}
          </div>
          <div style={{ marginTop: 6 }} className="progress-bar">
            <motion.div
              className="progress-fill"
              animate={{ width: `${weekStats.total > 0 ? (weekStats.solved / weekStats.total) * 100 : 0}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              style={{ height: '100%', borderRadius: 3 }}
            />
          </div>
        </div>
        {[
          { label: 'Easy', count: weekStats.easy, color: 'var(--green)' },
          { label: 'Medium', count: weekStats.medium, color: 'var(--orange)' },
          { label: 'Hard', count: weekStats.hard, color: 'var(--red)' },
        ].map(s => (
          <div key={s.label} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: s.color }}>{s.count}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>{s.label}</div>
          </div>
        ))}
        {weekStats.avgTime > 0 && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--accent)' }}>{weekStats.avgTime}m</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--muted)' }}>Avg Time</div>
          </div>
        )}
      </motion.div>

      {/* Week selector */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
        {weeks.map(w => {
          const wProblems = data.problems.filter(p => p.week === w)
          const wSolved = wProblems.filter(p => p.solved).length
          const complete = wSolved === wProblems.length && wProblems.length > 0
          return (
            <button
              key={w}
              className={`week-tab ${selectedWeek === w ? 'active' : ''}`}
              onClick={() => setSelectedWeek(w)}
              style={{ position: 'relative' }}
            >
              W{w}
              {complete && (
                <span style={{
                  position: 'absolute', top: -4, right: -4, width: 8, height: 8,
                  borderRadius: '50%', background: 'var(--green)',
                }} />
              )}
            </button>
          )
        })}
      </div>

      {/* Filters */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative', flex: 1, minWidth: 200 }}>
          <Search size={14} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
          <input
            className="gh-input"
            placeholder="Search problems..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: 32 }}
          />
        </div>
        <select
          className="gh-input"
          style={{ width: 140 }}
          value={filterDifficulty}
          onChange={e => setFilterDifficulty(e.target.value as Difficulty | 'All')}
        >
          <option value="All">All Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
        <select
          className="gh-input"
          style={{ width: 180 }}
          value={filterPattern}
          onChange={e => setFilterPattern(e.target.value)}
        >
          <option value="All">All Patterns</option>
          {patternsInWeek.map(pt => {
            const info = PATTERNS.find(p => p.key === pt)
            return <option key={pt} value={pt}>{info?.label || pt}</option>
          })}
        </select>
        {(search || filterDifficulty !== 'All' || filterPattern !== 'All') && (
          <button
            className="btn btn-secondary"
            onClick={() => { setSearch(''); setFilterDifficulty('All'); setFilterPattern('All') }}
            style={{ padding: '8px 12px' }}
          >
            <X size={14} /> Clear
          </button>
        )}
      </div>

      {/* Table */}
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        overflow: 'hidden',
      }}>
        <table className="data-table">
          <thead>
            <tr>
              <th style={{ width: 40 }}>Done</th>
              <th style={{ width: 60 }}>LC#</th>
              <th>Problem</th>
              <th style={{ width: 90 }}>Difficulty</th>
              <th style={{ width: 150 }}>Pattern</th>
              <th style={{ width: 70 }}>Time</th>
              <th style={{ width: 100 }}>Solo?</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="popLayout">
              {filteredProblems.map(problem => (
                <motion.tr
                  key={problem.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ cursor: 'pointer' }}
                  onClick={() => openModal(problem)}
                >
                  <td onClick={e => { e.stopPropagation(); handleToggleSolve(problem) }}>
                    <div
                      className={`custom-checkbox ${problem.solved ? 'checked' : ''}`}
                      style={{ margin: '0 auto' }}
                    >
                      {problem.solved && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="#0d1117" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                      )}
                    </div>
                  </td>
                  <td style={{ color: 'var(--muted)', fontWeight: 600, fontSize: '0.8rem' }}>
                    {problem.num}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <a
                        href={`https://leetcode.com/problems/${problem.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={e => e.stopPropagation()}
                        style={{ color: problem.solved ? 'var(--green)' : 'var(--text)', textDecoration: 'none', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 4 }}
                      >
                        {problem.name}
                        <ExternalLink size={11} style={{ color: 'var(--muted)', flexShrink: 0 }} />
                      </a>
                    </div>
                    {problem.notes && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginTop: 2, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {problem.notes}
                      </div>
                    )}
                  </td>
                  <td>
                    <span style={{
                      fontSize: '0.78rem', fontWeight: 600,
                      color: difficultyColor[problem.difficulty],
                    }}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td>
                    <span className="pattern-badge">
                      {PATTERNS.find(p => p.key === problem.pattern)?.label || problem.pattern}
                    </span>
                  </td>
                  <td style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
                    {problem.time ? `${problem.time}m` : '—'}
                  </td>
                  <td>
                    {problem.solved ? (
                      problem.solvedAlone === 'yes' ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--green)' }}>
                          <CheckCircle2 size={13} /> Solo
                        </span>
                      ) : problem.solvedAlone === 'hint' ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--orange)' }}>
                          <HelpCircle size={13} /> Hint
                        </span>
                      ) : problem.solvedAlone === 'no' ? (
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', color: 'var(--red)' }}>
                          <XCircle size={13} /> No
                        </span>
                      ) : null
                    ) : (
                      <span style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>—</span>
                    )}
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
        {filteredProblems.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--muted)', fontSize: '0.875rem' }}>
            No problems match your filters.
          </div>
        )}
      </div>

      {/* Solve Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
          >
            <motion.div
              className="modal"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.2 }}
              onClick={e => e.stopPropagation()}
            >
              {/* Modal header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--muted)', marginBottom: 4 }}>
                    #{modal.problem.num} · <span style={{ color: difficultyColor[modal.problem.difficulty] }}>{modal.problem.difficulty}</span>
                  </div>
                  <h3 style={{ fontWeight: 700, color: 'var(--text)', fontSize: '1rem' }}>
                    {modal.problem.name}
                  </h3>
                </div>
                <button onClick={closeModal} style={{ background: 'none', border: 'none', color: 'var(--muted)', cursor: 'pointer' }}>
                  <X size={18} />
                </button>
              </div>

              {/* Links */}
              <div style={{ display: 'flex', gap: 8, marginBottom: 20 }}>
                <a
                  href={`https://leetcode.com/problems/${modal.problem.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}/`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary"
                  style={{ fontSize: '0.8rem', textDecoration: 'none' }}
                >
                  <ExternalLink size={13} /> Open in LeetCode
                </a>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <ChevronRight size={13} style={{ color: 'var(--muted)' }} />
                  <span className="pattern-badge">{PATTERNS.find(p => p.key === modal.problem.pattern)?.label}</span>
                </div>
              </div>

              {/* Form fields */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>
                    <Clock size={13} style={{ display: 'inline', marginRight: 4 }} />
                    Time taken (minutes)
                  </label>
                  <input
                    className="gh-input"
                    type="number"
                    min="1"
                    max="180"
                    placeholder="e.g. 25"
                    value={modalTime}
                    onChange={e => setModalTime(e.target.value)}
                    style={{ width: 160 }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: 8 }}>
                    Solved alone?
                  </label>
                  <div style={{ display: 'flex', gap: 8 }}>
                    {([
                      { value: 'yes', label: 'Yes, solo!', color: 'var(--green)', bg: 'rgba(63,185,80,0.1)' },
                      { value: 'hint', label: 'Needed a hint', color: 'var(--orange)', bg: 'rgba(210,153,34,0.1)' },
                      { value: 'no', label: 'Looked it up', color: 'var(--red)', bg: 'rgba(248,81,73,0.1)' },
                    ] as const).map(opt => (
                      <button
                        key={opt.value}
                        onClick={() => setModalSolvedAlone(opt.value)}
                        style={{
                          flex: 1,
                          padding: '8px 4px',
                          borderRadius: 8,
                          border: `1px solid ${modalSolvedAlone === opt.value ? opt.color : 'var(--border)'}`,
                          background: modalSolvedAlone === opt.value ? opt.bg : 'transparent',
                          color: modalSolvedAlone === opt.value ? opt.color : 'var(--muted)',
                          cursor: 'pointer',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          transition: 'all 0.15s',
                        }}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: 'var(--muted)', marginBottom: 6 }}>
                    Notes (approach, edge cases, etc.)
                  </label>
                  <textarea
                    className="gh-input"
                    placeholder="Two pointers approach, watch out for duplicates..."
                    value={modalNotes}
                    onChange={e => setModalNotes(e.target.value)}
                    rows={3}
                    style={{ resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', gap: 10, marginTop: 20, justifyContent: 'flex-end' }}>
                <button className="btn btn-secondary" onClick={closeModal}>Cancel</button>
                {modal.problem.solved && (
                  <button
                    className="btn btn-danger"
                    onClick={() => handleSaveProblem(modal.problem, false, null, null, modal.problem.notes)}
                    disabled={saving}
                  >
                    Mark Unsolved
                  </button>
                )}
                <button
                  className="btn btn-success"
                  onClick={handleModalSubmit}
                  disabled={saving}
                >
                  {saving ? 'Saving...' : modal.problem.solved ? 'Update' : 'Mark Solved'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
