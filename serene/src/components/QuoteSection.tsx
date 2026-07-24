import { useEffect, useRef } from 'react'

const RAINBOW_SRC =
  'https://soft-zoom-63098134.figma.site/_assets/v11/8d520a7515d06cbfc403d0125e3d05b1a7ccd29c.png'
const CLOUD_SRC =
  'https://soft-zoom-63098134.figma.site/_assets/v11/0d6dfd3f90b930f21726f2ed56a3320d79b7a797.png'

const clamp = (min: number, max: number, value: number) =>
  Math.min(max, Math.max(min, value))

const lerp = (current: number, target: number, factor: number) =>
  current + (target - current) * factor

export default function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const rainbowRef = useRef<HTMLImageElement>(null)
  const leftCloudRef = useRef<HTMLImageElement>(null)
  const rightCloudRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    // Current (smoothed) animation values.
    let rainbowY = 120
    let leftX = -200
    let leftY = 0
    let leftOpacity = 0
    let rightX = 200
    let rightY = 0
    let rightOpacity = 0
    let frame = 0

    const tick = () => {
      const section = sectionRef.current
      if (section) {
        const rect = section.getBoundingClientRect()
        const wh = window.innerHeight
        const progress = clamp(0, 1, (wh - rect.top) / (wh + rect.height))

        // 1. Rainbow: +120px -> -160px
        const rainbowTarget = 120 + (-160 - 120) * progress
        rainbowY = lerp(rainbowY, rainbowTarget, 0.06)
        if (rainbowRef.current) {
          rainbowRef.current.style.transform = `translate3d(0, ${rainbowY}px, 0)`
        }

        // Clouds are "in view" between progress 0.12 and 0.92.
        const inView = progress > 0.12 && progress < 0.92
        const cloudY = progress * -50

        // 2. Left cloud: slides in from -200px
        const leftXTarget = inView ? 0 : -200
        leftX = lerp(leftX, leftXTarget, 0.04)
        leftY = lerp(leftY, cloudY, 0.04)
        leftOpacity = lerp(leftOpacity, clamp(0, 1, 1 - Math.abs(leftX) / 200), 0.04)
        if (leftCloudRef.current) {
          leftCloudRef.current.style.transform = `translate3d(${leftX}px, ${leftY}px, 0)`
          leftCloudRef.current.style.opacity = String(leftOpacity)
        }

        // 3. Right cloud: slides in from +200px (flipped)
        const rightXTarget = inView ? 0 : 200
        rightX = lerp(rightX, rightXTarget, 0.04)
        rightY = lerp(rightY, cloudY, 0.04)
        rightOpacity = lerp(rightOpacity, clamp(0, 1, 1 - Math.abs(rightX) / 200), 0.04)
        if (rightCloudRef.current) {
          rightCloudRef.current.style.transform = `translate3d(${rightX}px, ${rightY}px, 0) scaleX(-1)`
          rightCloudRef.current.style.opacity = String(rightOpacity)
        }
      }
      frame = requestAnimationFrame(tick)
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden"
      style={{
        background:
          'linear-gradient(to bottom, #010A17 0%, #0A4267 30%, #20658E 60%, #6BADC4 100%)',
      }}
    >
      {/* 1. Rainbow */}
      <img
        ref={rainbowRef}
        src={RAINBOW_SRC}
        alt=""
        aria-hidden="true"
        className="absolute inset-x-0 top-0 z-30 w-full will-change-transform pointer-events-none select-none"
        style={{ transform: 'translate3d(0, 120px, 0)' }}
      />

      {/* 2. Left cloud */}
      <img
        ref={leftCloudRef}
        src={CLOUD_SRC}
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute left-0 bottom-[10%] z-10 w-[500px] md:w-[650px] will-change-transform pointer-events-none select-none"
        style={{ marginLeft: '-50%', opacity: 0, transform: 'translate3d(-200px, 0, 0)' }}
      />

      {/* 3. Right cloud (flipped) */}
      <img
        ref={rightCloudRef}
        src={CLOUD_SRC}
        alt=""
        aria-hidden="true"
        className="hidden sm:block absolute right-0 bottom-[15%] z-10 w-[500px] md:w-[650px] will-change-transform pointer-events-none select-none"
        style={{ marginRight: '-75%', opacity: 0, transform: 'translate3d(200px, 0, 0) scaleX(-1)' }}
      />

      {/* 4. Quote content */}
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl">
          <p className="font-instrument text-white text-xl sm:text-2xl md:text-4xl lg:text-[42px] leading-[1.45] md:leading-[1.5]">
            &ldquo;Serene was founded on a belief in beauty that honors your nature. We
            pursue refined outcomes, considered approaches, and lasting vitality. We spend
            time learning what matters to you before deciding what serves you best. No
            rushing, no excess &mdash; just support that lets you feel radiant.&rdquo;
          </p>
          <p className="mt-6 md:mt-8 text-white/80 text-sm md:text-base tracking-wide">
            Dr. Mia Callahan &mdash; Founder
          </p>
        </div>
      </div>
    </section>
  )
}
