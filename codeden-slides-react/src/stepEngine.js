// Manual step-reveal engine shared by SlideShow (live presenting) and the
// PDF exporter (static baking). Two reveal modes, both driven purely by
// className conventions already used across every slide component:
//
//   className="anim-fade-up d3"   → CUMULATIVE: visible once step >= 3, stays visible.
//   className="anim-pop frame d3" → EXCLUSIVE:   visible only while step === 3
//                                                  (used for mutually-exclusive
//                                                  "redraw" frames, e.g. sorting bars).
//   className="anim-fade-up"      → no dN suffix = baseline, step 1 (always
//                                    visible the moment the slide is entered).
//   no anim-/frame class at all   → untouched, always visible (logos, chrome).
//
// Nothing here plays automatically on a timer — the caller decides when to
// move from one step to the next (Ctrl+→/← in SlideShow, or a plain loop
// when baking every frame for PDF export).

const STEP_CLASS_RE = /\bd(\d+)\b/
const ANIM_CLASS_RE = /\banim-[\w-]+\b/
const FRAME_CLASS_RE = /\bframe\b/

// Walk `root` and classify every element that opts into the step system.
// Returns { descriptors, maxStep }. descriptors: [{ el, mode, step }]
export function scanSteps(root) {
  if (!root) return { descriptors: [], maxStep: 1 }
  const descriptors = []
  let maxStep = 1
  const all = root.querySelectorAll('[class]')
  all.forEach((el) => {
    // el.className is an SVGAnimatedString (not a plain string) for SVG
    // elements — getAttribute('class') works uniformly for both HTML and SVG.
    const cls = el.getAttribute('class') || ''
    const isAnim = ANIM_CLASS_RE.test(cls)
    const isFrame = FRAME_CLASS_RE.test(cls)
    if (!isAnim && !isFrame) return
    const m = cls.match(STEP_CLASS_RE)
    const step = m ? parseInt(m[1], 10) : 1
    const mode = isFrame ? 'exclusive' : 'cumulative'
    descriptors.push({ el, mode, step })
    if (step > maxStep) maxStep = step
  })
  return { descriptors, maxStep }
}

// Reveal/hide every tracked element for the given step (1-based).
// Newly-revealed elements replay their entrance animation; everything else
// is left untouched so already-visible content never re-flickers.
export function applyStep(descriptors, currentStep) {
  descriptors.forEach(({ el, mode, step }) => {
    const shouldShow = mode === 'cumulative' ? step <= currentStep : step === currentStep
    if (shouldShow) {
      if (el.dataset.stepRevealed !== 'true') {
        el.style.animation = 'none'
        // eslint-disable-next-line no-void
        void el.offsetWidth // force reflow so the animation restarts cleanly
        el.style.opacity = ''
        el.style.transform = ''
        el.style.animation = ''
        el.style.animationDelay = '0s'
        el.dataset.stepRevealed = 'true'
      }
      el.style.pointerEvents = ''
    } else {
      el.style.animation = 'none'
      el.style.opacity = '0'
      el.style.pointerEvents = 'none'
      el.dataset.stepRevealed = 'false'
    }
  })
}

// Instantly bake a specific step's final visual state with no animation at
// all — used by the PDF exporter, which needs crisp, settled frames rather
// than anything mid-transition.
export function bakeStep(descriptors, currentStep) {
  descriptors.forEach(({ el, mode, step }) => {
    const shouldShow = mode === 'cumulative' ? step <= currentStep : step === currentStep
    el.style.animation = 'none'
    el.style.transition = 'none'
    el.style.opacity = shouldShow ? '1' : '0'
    el.style.transform = shouldShow ? 'none' : el.style.transform
  })
}
