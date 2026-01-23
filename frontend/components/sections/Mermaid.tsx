'use client'

import { useEffect, useId, useMemo, useState } from 'react'
import mermaid from 'mermaid'

interface MermaidProps {
  code: string
}

export function Mermaid({ code }: MermaidProps) {
  const [svg, setSvg] = useState<string>('')
  const id = useId()
  const normalized = useMemo(() => code.trim(), [code])

  useEffect(() => {
    if (!normalized) {
      setSvg('')
      return
    }

    let cancelled = false

    mermaid.initialize({
      startOnLoad: false,
      securityLevel: 'strict',
      theme: 'default',
    })

    mermaid
      .render(`mermaid-${id}`, normalized)
      .then(({ svg }) => {
        if (!cancelled) {
          setSvg(svg)
        }
      })
      .catch(() => {
        if (!cancelled) {
          setSvg('')
        }
      })

    return () => {
      cancelled = true
    }
  }, [id, normalized])

  if (!normalized) return null

  return (
    <div className="my-6 overflow-x-auto rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      {svg ? (
        <div className="mermaid" dangerouslySetInnerHTML={{ __html: svg }} />
      ) : (
        <pre className="text-xs text-gray-500">{normalized}</pre>
      )}
    </div>
  )
}
