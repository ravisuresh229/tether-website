'use client'

import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0e27]">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0e27]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-400/20 backdrop-blur-md rounded-xl p-2 border border-blue-500/30">
              <img src="/LOGO.jpeg" alt="" className="w-full h-full object-contain brightness-200" />
            </div>
            <span className="text-2xl font-light text-gray-300 tracking-widest uppercase">Tether</span>
          </div>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-light tracking-wide transition-all hover:scale-105 shadow-lg shadow-blue-500/20">
            Request Demo
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl animate-pulse delay-700" />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <div 
            className="inline-block mb-8 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-light tracking-wide"
            style={{ opacity: 1 - scrollY / 500 }}
          >
            PE-BACKED SPECIALTY PRACTICES
          </div>
          
          <h1 
            className="text-7xl md:text-8xl lg:text-[10rem] font-light tracking-tight mb-10 text-white leading-none"
            style={{ 
              opacity: 1 - scrollY / 500,
              transform: `translateY(${scrollY * 0.3}px)`
            }}
          >
            Turn chaos<br />
            <span className="bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent font-normal">
              into conversion
            </span>
          </h1>
          
          <p 
            className="text-2xl md:text-3xl text-gray-400 mb-16 max-w-4xl mx-auto font-light leading-relaxed"
            style={{ opacity: 1 - scrollY / 400 }}
          >
            Turn referral chaos into revenue.<br className="hidden md:block" />
            The intelligent platform for PE-backed practices.
          </p>
          
          <button className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-14 py-6 rounded-full font-light tracking-wide text-lg transition-all hover:scale-105 shadow-2xl shadow-blue-500/30 flex items-center gap-3 mx-auto">
            See the platform
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Impact */}
      <section className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                value: '$100M+', 
                label: 'Revenue recovered',
                sub: '200-location specialty group'
              },
              { 
                value: '50%', 
                label: 'Patient leakage eliminated',
                sub: 'Industry average vs. Tether'
              },
              { 
                value: '46x', 
                label: 'Return on investment',
                sub: 'Per location, per year'
              }
            ].map((stat, i) => (
              <div 
                key={i} 
                className="group bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-10 hover:border-blue-500/30 transition-all text-center min-h-[280px] flex flex-col justify-center"
              >
                <div className="text-6xl md:text-7xl lg:text-8xl font-light bg-gradient-to-br from-blue-400 to-blue-500 bg-clip-text text-transparent mb-4 group-hover:scale-105 transition-transform leading-tight overflow-visible">
                  {stat.value}
                </div>
                <p className="text-white text-xl mb-2 font-light">{stat.label}</p>
                <p className="text-gray-500 text-sm font-light tracking-wide">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="py-40 px-6 bg-gradient-to-b from-transparent via-white/5 to-transparent">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-light text-white mb-12 text-center">
            The silent profit killer
          </h2>
          <p className="text-2xl text-gray-400 font-light text-center leading-relaxed mb-20">
            Every day, patients disappear between referral and appointment.<br />
            Fax machines. Incomplete data. Zero visibility.<br />
            <span className="text-white font-normal">Your operations team is drowning. Your revenue is bleeding.</span>
          </p>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { 
                problem: 'Referral chaos', 
                impact: 'PCPs fax incomplete information. Front desk spends 5+ hours/week chasing data.' 
              },
              { 
                problem: 'Patient leakage', 
                impact: "50% never complete. That's $5,000 lifetime value lost per patient." 
              },
              { 
                problem: 'Zero visibility', 
                impact: 'PE firms have no idea which providers drive value. No data. No optimization.' 
              },
              { 
                problem: 'Manual operations', 
                impact: 'Everything tracked in spreadsheets. No automation. No intelligence.' 
              }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all">
                <h3 className="text-xl font-normal text-white mb-3 tracking-wide">{item.problem}</h3>
                <p className="text-gray-400 font-light leading-relaxed text-sm">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Platform */}
      <section className="py-40 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24">
            <h2 className="text-6xl md:text-7xl font-light text-white mb-6">
              Intelligent coordination
            </h2>
            <p className="text-2xl text-gray-400 font-light tracking-wide">
              End-to-end patient journey automation
            </p>
          </div>
          
          <div className="space-y-6">
            {[
              { 
                phase: 'Capture', 
                desc: 'Digital intake replaces fax. Complete patient data, structured, every time.',
                detail: '60-second PCP form · Auto-validation · File attachments'
              },
              { 
                phase: 'Engage', 
                desc: 'Instant patient notification. Reduce no-shows before they happen.',
                detail: 'SMS automation · Appointment reminders · Two-way communication'
              },
              { 
                phase: 'Coordinate', 
                desc: 'Real-time dashboard shows every referral, every status, every outcome.',
                detail: 'Live tracking · Status updates · Team collaboration'
              },
              { 
                phase: 'Optimize', 
                desc: 'Know which providers drive value. Know which patients complete. Know everything.',
                detail: 'Provider performance · Completion funnels · Revenue attribution'
              }
            ].map((step, i) => (
              <div key={i} className="group relative">
                <div className="p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-500/30 transition-all hover:bg-white/10">
                  <div className="flex items-start gap-8">
                    <div className="text-7xl font-extralight text-blue-400/20 group-hover:text-blue-400/40 transition-colors">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-3xl font-light text-white mb-3 tracking-wide">{step.phase}</h3>
                      <p className="text-xl text-gray-300 font-light mb-4 leading-relaxed">{step.desc}</p>
                      <p className="text-sm text-gray-500 font-light tracking-wide">{step.detail}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-32 px-6 bg-gradient-to-b from-white/5 to-transparent">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-3xl p-16 text-center">
            <div className="mb-8">
              <div className="text-8xl font-extralight bg-gradient-to-r from-blue-400 to-blue-500 bg-clip-text text-transparent mb-4">
                23
              </div>
              <p className="text-xl text-gray-300 font-light tracking-wide">
                patients recovered in first month
              </p>
            </div>
            <p className="text-xl text-gray-400 italic mb-8 font-light">
              "That's $115K in lifetime value we would have lost to the void."
            </p>
            <div className="text-gray-400">
              <div className="font-light text-white text-lg">Dr. Micah Belzberg</div>
              <div className="text-sm font-light tracking-wide">Forefront Dermatology</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-48 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-500/10" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-7xl md:text-8xl font-light text-white mb-12 leading-tight tracking-tight">
            Stop losing revenue
          </h2>
          <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-16 py-7 rounded-full font-light tracking-wide text-xl transition-all hover:scale-105 shadow-2xl shadow-blue-500/30">
            Request Demo
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto text-center text-gray-600 text-sm font-light tracking-wide">
          <p>© 2026 Tether · Turn chaos into conversion</p>
        </div>
      </footer>
    </div>
  )
}
