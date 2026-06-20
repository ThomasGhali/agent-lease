'use client'

import Widget from '@/features/widget/components'
import './test.css'
import { useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'

export default function TestPage() {
  const [isBubbleOpen, setIsBubbleOpen] = useState(false)

  return (
    <div className="h-screen bg-red-300">
      <div
        inert={!isBubbleOpen}
        className={`my-container ${isBubbleOpen ? 'container-active' : ''}`}
      >
        <Widget agentId="asd" />
      </div>

      <button className="bubble" onClick={() => setIsBubbleOpen(!isBubbleOpen)}>
        <MessageCircle
          color="white"
          className={`symbol ${isBubbleOpen ? 'is-active' : ''}`}
        />
        <ChevronDown
          color="white"
          className={`symbol ${!isBubbleOpen ? 'is-active' : ''}`}
        />{' '}
      </button>
    </div>
  )
}
