'use client'

import { useState, useEffect, useCallback } from 'react'

type Progress = {
  completed: string[]
  lastVisited?: string
  notes: Record<string, string>
}

const KEY = 'jana-progress'

function load(): Progress {
  if (typeof window === 'undefined') return { completed: [], notes: {} }
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : { completed: [], notes: {} }
  } catch {
    return { completed: [], notes: {} }
  }
}

function save(p: Progress) {
  if (typeof window === 'undefined') return
  localStorage.setItem(KEY, JSON.stringify(p))
}

export function useProgress() {
  const [progress, setProgress] = useState<Progress>({ completed: [], notes: {} })

  useEffect(() => {
    setProgress(load())
  }, [])

  const markComplete = useCallback((slug: string) => {
    setProgress((prev) => {
      const next = {
        ...prev,
        completed: prev.completed.includes(slug)
          ? prev.completed
          : [...prev.completed, slug],
        lastVisited: slug,
      }
      save(next)
      return next
    })
  }, [])

  const markVisited = useCallback((slug: string) => {
    setProgress((prev) => {
      const next = { ...prev, lastVisited: slug }
      save(next)
      return next
    })
  }, [])

  const isCompleted = useCallback(
    (slug: string) => progress.completed.includes(slug),
    [progress.completed]
  )

  const completedCount = progress.completed.length

  return { progress, markComplete, markVisited, isCompleted, completedCount }
}
