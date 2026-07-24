import { useState } from 'react'
import type { ReactNode } from 'react'

const NAV_LINKS = ['About', 'Services', 'Journal', 'Contact']

const EASE = 'cubic-bezier(0.22,1,0.36,1)'

function PillButton({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <button
      className={`bg-white text-black px-8 py-3.5 rounded-full font-medium text-sm tracking-wide hover:bg-white/90 transition-all duration-300 button-glow ${className}`}
    >
      {children}
    </button>
  )
}

export default function Hero() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* 1. Background video */}
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260613_180732_a54afbf6-b30d-470e-861f-669871f09f67.mp4"
          type="video/mp4"
        />
      </video>

      {/* 2. Dark overlay */}
      <div className="absolute inset-0 bg-black/20" />

      {/* 3. Fixed navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5">
        {/* Left: brand */}
        <a
          href="#"
          className="text-white text-2xl md:text-3xl"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Serene
        </a>

        {/* Center: nav links (desktop) */}
        <div className="hidden md:flex items-center gap-12">
          {NAV_LINKS.map((link) => (
            <a
              key={link}
              href="#"
              className="text-white/80 hover:text-white text-sm tracking-wide transition-colors duration-300"
            >
              {link}
            </a>
          ))}
        </div>

        {/* Right: CTA (desktop) */}
        <div className="hidden md:block">
          <PillButton>Book a consultation</PillButton>
        </div>

        {/* Right: hamburger (mobile) */}
        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden relative z-50 flex h-8 w-8 flex-col items-center justify-center"
        >
          <span
            className="block h-[2px] w-6 bg-white transition-all duration-500"
            style={{
              transitionTimingFunction: EASE,
              transform: menuOpen ? 'translateY(9px) rotate(45deg)' : 'none',
            }}
          />
          <span
            className="my-[7px] block h-[2px] w-6 bg-white transition-all duration-500"
            style={{
              transitionTimingFunction: EASE,
              opacity: menuOpen ? 0 : 1,
              transform: menuOpen ? 'scale(0)' : 'none',
            }}
          />
          <span
            className="block h-[2px] w-6 bg-white transition-all duration-500"
            style={{
              transitionTimingFunction: EASE,
              transform: menuOpen ? 'translateY(-9px) rotate(-45deg)' : 'none',
            }}
          />
        </button>
      </nav>

      {/* Mobile slide-in menu */}
      <div
        className="md:hidden fixed top-0 right-0 bottom-0 z-40 w-[85%] max-w-[340px] bg-[#0a0608]/95 backdrop-blur-xl border-l border-white/10 transition-transform duration-500"
        style={{
          transitionTimingFunction: EASE,
          transform: menuOpen ? 'translateX(0)' : 'translateX(100%)',
        }}
      >
        <div className="flex h-full flex-col px-8 pb-10 pt-28">
          <div className="flex flex-col gap-7">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="text-white text-2xl font-light"
                style={{
                  opacity: menuOpen ? 1 : 0,
                  transform: menuOpen ? 'translateX(0)' : 'translateX(30px)',
                  transition: `all 500ms ${EASE}`,
                  transitionDelay: `${menuOpen ? 150 + i * 75 : 0}ms`,
                }}
              >
                {link}
              </a>
            ))}
          </div>

          <div
            className="mt-auto"
            style={{
              opacity: menuOpen ? 1 : 0,
              transform: menuOpen ? 'translateX(0)' : 'translateX(30px)',
              transition: `all 500ms ${EASE}`,
              transitionDelay: `${menuOpen ? 450 : 0}ms`,
            }}
          >
            <PillButton className="w-full">Book a consultation</PillButton>
          </div>
        </div>
      </div>

      {/* 4. Center content */}
      <div className="absolute inset-0 z-10 -mt-[120px] flex flex-col items-center justify-center px-6">
        <h1 className="font-instrument text-white text-[36px] md:text-7xl lg:text-[110px] leading-[0.9] tracking-tight text-center text-glow">
          Gentle touch.
          <br />
          Radiant presence.
        </h1>
        <p className="text-white/70 text-sm md:text-base text-center mt-5 md:mt-7 max-w-xl">
          Expert beauty and holistic wellness, delivered with warmth and intention.
        </p>
        <PillButton className="mt-6 md:mt-9">Begin your renewal</PillButton>
      </div>

      {/* 5. Sound indicator (desktop) */}
      <div className="hidden md:flex items-center gap-3 absolute bottom-8 left-8 z-10">
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20">
          <span className="block h-[2px] w-3 bg-white/70" />
        </div>
        <div className="text-white/60 text-xs leading-tight">
          <div>Experience</div>
          <div>with sound</div>
        </div>
      </div>
    </section>
  )
}
