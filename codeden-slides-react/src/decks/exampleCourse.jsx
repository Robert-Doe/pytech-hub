import React from 'react'
import { ALL_SLIDES } from '../components/slides/index.js'

// Helper: grab a slide by id from ALL_SLIDES
const pick = (id) => ALL_SLIDES.find(s => s.id === id)

// ── A complete "Introduction to Algorithms" lesson ──
// Pick only what you need, in the order you want.
// Duplicate by creating a new object with the same Component but different props:
//   import { TitleSlide } from '../components/slides'
//   { id:'title-2', name:'Title Variant', group:'Intro', element: <TitleSlide title="My New Title" /> }

export const exampleCourse = [
  pick('course-trailer'),
  pick('author-card'),
  pick('what-youll-learn'),
  pick('who-is-for'),
  pick('learning-path'),
  pick('time-commit'),
  pick('section-divider'),
  pick('learning-objectives'),
  pick('definition'),
  pick('syntax-anatomy'),
  pick('code-snippet'),
  pick('terminal-output'),
  pick('pause-think'),
  pick('quick-check'),
  pick('answer-reveal'),
  pick('exercise'),
  pick('xp-level-up'),
  pick('checkpoint'),
  pick('key-takeaways'),
  pick('cheat-sheet'),
  pick('homework'),
  pick('chapter-opener'),
  pick('encouragement'),
  pick('community'),
  pick('thank-you'),
].filter(Boolean)

// ── A quick "single lesson" starter ──
export const starterLesson = [
  pick('title'),
  pick('learning-objectives'),
  pick('definition'),
  pick('code-snippet'),
  pick('pause-think'),
  pick('quick-check'),
  pick('answer-reveal'),
  pick('exercise'),
  pick('key-takeaways'),
  pick('thank-you'),
].filter(Boolean)

// ── A gamified engagement pack ──
export const gamificationPack = [
  pick('streak'),
  pick('xp-level-up'),
  pick('badge-earned'),
  pick('skill-map'),
  pick('quest-briefing'),
  pick('leaderboard'),
  pick('progress-dash'),
  pick('challenge-tiers'),
  pick('feedback-ask'),
].filter(Boolean)
