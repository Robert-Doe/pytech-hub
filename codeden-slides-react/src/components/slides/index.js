import React from 'react'
import { TitleSlide, AuthorIntroSlide, CourseTrailerSlide, AuthorCardSlide } from './IntroSlides.jsx'
import { WhatYoullLearnSlide, WhoIsForSlide, LearningPathSlide, TimeCommitSlide, SkillMeterSlide, WhatYoullBuildSlide } from './CourseOverviewSlides.jsx'
import { BigQuoteSlide, TwoColumnTextSlide, DefinitionSlide, ImageFullBleedSlide, ImageRightSlide, ImageLeftBulletsSlide, BookFeatureSlide } from './ContentSlides.jsx'
import { BulletPointsSlide, StepsTimelineSlide, ComparisonTableSlide, DoVsDontSlide, CodeSnippetSlide, TerminalOutputSlide, SyntaxAnatomySlide, FlowchartSlide } from './TeachingSlides.jsx'
import { LearningObjectivesSlide, KeyTakewaysSlide, CheatSheetSlide, VocabularySlide, ConceptMapSlide, CommonMistakesSlide, RealWorldUseSlide, SpacedReviewSlide } from './LearningSlides.jsx'
import { QuickCheckSlide, TrueOrFalseSlide, AnswerRevealSlide, FillBlankSlide, SpeedRoundSlide, PollSlide, PauseThinkSlide, DailyChallengeSlide } from './InteractiveSlides.jsx'
import { ExerciseSlide, HomeworkSlide, CodeAlongSlide, ChallengeTiersSlide, LabTimeSlide, DebugHuntSlide } from './PracticeSlides.jsx'
import { XPLevelUpSlide, BadgeEarnedSlide, SkillMapSlide, StreakSlide, QuestBriefingSlide, ProgressDashboardSlide, LeaderboardSlide } from './GameSlides.jsx'
import { SectionDividerSlide, ChapterOpenerSlide, ChapterEndSlide, CheckpointSlide, AgendaSlide, ModuleTableSlide, StorySoFarSlide } from './NavigationSlides.jsx'
import { ThankYouSlide, CertificateSlide, CommunitySlide, EncouragementSlide, ResourcesSlide, TestimonialsSlide, NextCourseSlide, FeedbackAskSlide } from './ClosingSlides.jsx'
import { GraphDiagramSlide, SortingBarsSlide } from './DiagramSlides.jsx'
import { InstructorNotesSlide } from './InstructorSlides.jsx'

// Each entry: { id, name, group, element }
// Pass custom props to any slide to override defaults
function s(id, name, group, Component, props = {}) {
  return { id, name, group, element: React.createElement(Component, props) }
}

export const ALL_SLIDES = [
  // ── Intro ──────────────────────────────────────────────
  s('title',           'Title',              'Intro', TitleSlide),
  s('author-intro',    'Author Intro',       'Intro', AuthorIntroSlide),
  s('author-card',     'Author Card',        'Intro', AuthorCardSlide),
  s('course-trailer',  'Course Trailer',     'Intro', CourseTrailerSlide),

  // ── Course Overview ────────────────────────────────────
  s('what-youll-learn','What You\'ll Learn', 'Course Overview', WhatYoullLearnSlide),
  s('who-is-for',      'Who This Is For',    'Course Overview', WhoIsForSlide),
  s('learning-path',   'Learning Path',      'Course Overview', LearningPathSlide),
  s('time-commit',     'Time Commitment',    'Course Overview', TimeCommitSlide),
  s('skill-meter',     'Skill Meter',        'Course Overview', SkillMeterSlide),
  s('what-youll-build','What You\'ll Build', 'Course Overview', WhatYoullBuildSlide),
  s('module-table',    'Module Table',       'Course Overview', ModuleTableSlide),
  s('testimonials',    'Testimonials',       'Course Overview', TestimonialsSlide),

  // ── Navigation ─────────────────────────────────────────
  s('section-divider', 'Section Divider',    'Navigation', SectionDividerSlide),
  s('chapter-opener',  'Chapter Opener',     'Navigation', ChapterOpenerSlide),
  s('chapter-end',     'Chapter End',        'Navigation', ChapterEndSlide),
  s('agenda',          'Agenda',             'Navigation', AgendaSlide),
  s('checkpoint',      'Checkpoint',         'Navigation', CheckpointSlide),
  s('story-so-far',    'Story So Far',       'Navigation', StorySoFarSlide),

  // ── Content ────────────────────────────────────────────
  s('big-quote',       'Big Quote',          'Content', BigQuoteSlide),
  s('two-column',      'Two Column Text',    'Content', TwoColumnTextSlide),
  s('definition',      'Definition',         'Content', DefinitionSlide),
  s('image-fullbleed', 'Image Full-Bleed',   'Content', ImageFullBleedSlide),
  s('image-right',     'Image Right',        'Content', ImageRightSlide),
  s('image-left',      'Image Left + Bullets','Content', ImageLeftBulletsSlide),
  s('book-feature',    'Book Feature',       'Content', BookFeatureSlide),

  // ── Teaching ───────────────────────────────────────────
  s('bullet-points',   'Bullet Points',      'Teaching', BulletPointsSlide),
  s('steps-timeline',  'Steps Timeline',     'Teaching', StepsTimelineSlide),
  s('comparison-table','Comparison Table',   'Teaching', ComparisonTableSlide),
  s('do-vs-dont',      'Do vs Don\'t',       'Teaching', DoVsDontSlide),
  s('code-snippet',    'Code Snippet',       'Teaching', CodeSnippetSlide),
  s('terminal-output', 'Terminal Output',    'Teaching', TerminalOutputSlide),
  s('syntax-anatomy',  'Syntax Anatomy',     'Teaching', SyntaxAnatomySlide),
  s('flowchart',       'Flowchart',          'Teaching', FlowchartSlide),

  // ── Learning Science ───────────────────────────────────
  s('learning-objectives','Learning Objectives','Learning', LearningObjectivesSlide),
  s('key-takeaways',   'Key Takeaways',      'Learning', KeyTakewaysSlide),
  s('cheat-sheet',     'Cheat Sheet',        'Learning', CheatSheetSlide),
  s('vocabulary',      'Vocabulary',         'Learning', VocabularySlide),
  s('concept-map',     'Concept Map',        'Learning', ConceptMapSlide),
  s('common-mistakes', 'Common Mistakes',    'Learning', CommonMistakesSlide),
  s('real-world-use',  'Real World Use',     'Learning', RealWorldUseSlide),
  s('spaced-review',   'Spaced Review',      'Learning', SpacedReviewSlide),

  // ── Interactive ────────────────────────────────────────
  s('quick-check',     'Quick Check',        'Interactive', QuickCheckSlide),
  s('true-or-false',   'True or False',      'Interactive', TrueOrFalseSlide),
  s('answer-reveal',   'Answer Reveal',      'Interactive', AnswerRevealSlide),
  s('fill-blank',      'Fill the Blank',     'Interactive', FillBlankSlide),
  s('speed-round',     'Speed Round',        'Interactive', SpeedRoundSlide),
  s('poll',            'Poll',               'Interactive', PollSlide),
  s('pause-think',     'Pause & Think',      'Interactive', PauseThinkSlide),
  s('daily-challenge', 'Daily Challenge',    'Interactive', DailyChallengeSlide),

  // ── Practice ───────────────────────────────────────────
  s('exercise',        'Exercise',           'Practice', ExerciseSlide),
  s('homework',        'Homework',           'Practice', HomeworkSlide),
  s('code-along',      'Code Along',         'Practice', CodeAlongSlide),
  s('challenge-tiers', 'Challenge Tiers',    'Practice', ChallengeTiersSlide),
  s('lab-time',        'Lab Time',           'Practice', LabTimeSlide),
  s('debug-hunt',      'Debug Hunt',         'Practice', DebugHuntSlide),

  // ── Gamification ───────────────────────────────────────
  s('xp-level-up',     'XP Level Up',        'Gamification', XPLevelUpSlide),
  s('badge-earned',    'Badge Earned',       'Gamification', BadgeEarnedSlide),
  s('skill-map',       'Skill Map',          'Gamification', SkillMapSlide),
  s('streak',          'Streak',             'Gamification', StreakSlide),
  s('quest-briefing',  'Quest Briefing',     'Gamification', QuestBriefingSlide),
  s('progress-dash',   'Progress Dashboard', 'Gamification', ProgressDashboardSlide),
  s('leaderboard',     'Leaderboard',        'Gamification', LeaderboardSlide),

  // ── Closing ────────────────────────────────────────────
  s('resources',       'Resources',          'Closing', ResourcesSlide),
  s('encouragement',   'Encouragement',      'Closing', EncouragementSlide),
  s('community',       'Community',          'Closing', CommunitySlide),
  s('certificate',     'Certificate',        'Closing', CertificateSlide),
  s('next-course',     'Next Course Teaser', 'Closing', NextCourseSlide),
  s('feedback-ask',    'Feedback Ask',       'Closing', FeedbackAskSlide),
  s('thank-you',       'Thank You',          'Closing', ThankYouSlide),

  // ── Diagrams (step-by-step, real algorithm-driven) ─────
  s('graph-diagram',   'Graph Diagram',      'Diagrams', GraphDiagramSlide),
  s('sorting-bars',    'Sorting Bars',       'Diagrams', SortingBarsSlide),

  // ── Instructor-only ─────────────────────────────────────
  s('instructor-notes','Instructor Notes',   'Instructor', InstructorNotesSlide),
]

export { TitleSlide, AuthorIntroSlide, CourseTrailerSlide, AuthorCardSlide,
  WhatYoullLearnSlide, WhoIsForSlide, LearningPathSlide, TimeCommitSlide, SkillMeterSlide, WhatYoullBuildSlide,
  BigQuoteSlide, TwoColumnTextSlide, DefinitionSlide, ImageFullBleedSlide, ImageRightSlide, ImageLeftBulletsSlide, BookFeatureSlide,
  BulletPointsSlide, StepsTimelineSlide, ComparisonTableSlide, DoVsDontSlide, CodeSnippetSlide, TerminalOutputSlide, SyntaxAnatomySlide, FlowchartSlide,
  LearningObjectivesSlide, KeyTakewaysSlide, CheatSheetSlide, VocabularySlide, ConceptMapSlide, CommonMistakesSlide, RealWorldUseSlide, SpacedReviewSlide,
  QuickCheckSlide, TrueOrFalseSlide, AnswerRevealSlide, FillBlankSlide, SpeedRoundSlide, PollSlide, PauseThinkSlide, DailyChallengeSlide,
  ExerciseSlide, HomeworkSlide, CodeAlongSlide, ChallengeTiersSlide, LabTimeSlide, DebugHuntSlide,
  XPLevelUpSlide, BadgeEarnedSlide, SkillMapSlide, StreakSlide, QuestBriefingSlide, ProgressDashboardSlide, LeaderboardSlide,
  SectionDividerSlide, ChapterOpenerSlide, ChapterEndSlide, CheckpointSlide, AgendaSlide, ModuleTableSlide, StorySoFarSlide,
  ThankYouSlide, CertificateSlide, CommunitySlide, EncouragementSlide, ResourcesSlide, TestimonialsSlide, NextCourseSlide, FeedbackAskSlide,
  GraphDiagramSlide, SortingBarsSlide,
  InstructorNotesSlide }
