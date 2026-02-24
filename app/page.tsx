'use client'

import { ArrowRight, Shield, Lock, Server, Linkedin, CheckCircle2 } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [isDemoOpen, setIsDemoOpen] = useState(false)
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (statsRef.current) {
      observer.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        observer.unobserve(statsRef.current)
      }
    }
  }, [])

  // Reset form state when dialog opens/closes
  useEffect(() => {
    if (!isDemoOpen) {
      setFormErrors({})
      setShowSuccess(false)
      setIsSubmitting(false)
    }
  }, [isDemoOpen])

  const scrollToStats = () => {
    if (statsRef.current) {
      statsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const scrollToCompliance = () => {
    const complianceSection = document.getElementById('compliance-section')
    if (complianceSection) {
      complianceSection.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validateName = (name: string): boolean => {
    return name.trim().length >= 2
  }

  const validatePracticeName = (practiceName: string): boolean => {
    return practiceName.trim().length >= 2
  }

  const handleDemoSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormErrors({})

    const formData = new FormData(e.currentTarget)
    const name = (formData.get('name') as string) || ''
    const email = (formData.get('email') as string) || ''
    const practiceName = (formData.get('practiceName') as string) || ''
    const role = (formData.get('role') as string) || ''
    const message = (formData.get('message') as string) || ''

    // Validation
    const errors: { [key: string]: string } = {}

    if (!validateName(name)) {
      errors.name = 'Name must be at least 2 characters'
    }

    if (!email) {
      errors.email = 'Email is required'
    } else if (!validateEmail(email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!validatePracticeName(practiceName)) {
      errors.practiceName = 'Practice name must be at least 2 characters'
    }

    if (!role) {
      errors.role = 'Please select a role'
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)
      setIsSubmitting(false)
      return
    }

    // If validation passes, send email and show success
    const subject = encodeURIComponent('Demo Request - Tether Health')
    const body = encodeURIComponent(`Hi,

I would like to schedule a demo of Tether.

Name: ${name}
Email: ${email}
Practice name: ${practiceName}
Role (PCP/Specialist): ${role}
Best time to connect: 
${message ? `Message: ${message}` : ''}

Thanks`)
    
    // Reset form immediately before async operations
    const form = e.currentTarget as HTMLFormElement
    form.reset()
    
    window.location.href = `mailto:support@tetherhealth.co?subject=${subject}&body=${body}`
    
    // Show success message
    setShowSuccess(true)
    setIsSubmitting(false)
    
    // Close modal after 3 seconds
    setTimeout(() => {
      setShowSuccess(false)
      setIsDemoOpen(false)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-[#0a0e27] font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0a0e27]/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-blue-400/20 backdrop-blur-md rounded-xl p-2 border border-blue-500/30">
              <img src="/LOGO.jpeg" alt="" className="w-full h-full object-contain brightness-200" />
            </div>
            <span className="text-2xl font-light text-gray-300 tracking-widest uppercase">Tether</span>
          </div>
          <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
            <DialogTrigger asChild>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-8 py-3 rounded-full font-light tracking-wide transition-all hover:scale-105 hover:shadow-xl shadow-lg shadow-blue-500/20">
                Request Demo
              </button>
            </DialogTrigger>
            <DialogContent className="bg-[#0a0e27] border-white/10 text-white max-w-md">
              {showSuccess ? (
                <div className="py-8 text-center">
                  <CheckCircle2 className="w-16 h-16 mx-auto mb-4 text-green-400" />
                  <DialogTitle className="text-2xl text-white mb-2">Thank you!</DialogTitle>
                  <DialogDescription className="text-gray-300 text-base">
                    We've received your demo request and will be in touch within 24 hours.
                  </DialogDescription>
                </div>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl text-white">Request a Demo</DialogTitle>
                    <DialogDescription className="text-gray-400">
                      We'll be in touch within 24 hours to schedule your demo.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleDemoSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-300">Name</Label>
                      <Input 
                        id="name" 
                        name="name" 
                        required 
                        className={`bg-white/5 border-white/10 text-white ${formErrors.name ? 'border-red-500' : ''}`}
                        minLength={2}
                      />
                      {formErrors.name && (
                        <p className="text-red-400 text-sm">{formErrors.name}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-300">Email</Label>
                      <Input 
                        id="email" 
                        name="email" 
                        type="email" 
                        required 
                        className={`bg-white/5 border-white/10 text-white ${formErrors.email ? 'border-red-500' : ''}`}
                      />
                      {formErrors.email && (
                        <p className="text-red-400 text-sm">{formErrors.email}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="practiceName" className="text-gray-300">Practice Name</Label>
                      <Input 
                        id="practiceName" 
                        name="practiceName" 
                        required 
                        className={`bg-white/5 border-white/10 text-white ${formErrors.practiceName ? 'border-red-500' : ''}`}
                        minLength={2}
                      />
                      {formErrors.practiceName && (
                        <p className="text-red-400 text-sm">{formErrors.practiceName}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-gray-300">Role</Label>
                      <select 
                        id="role" 
                        name="role" 
                        required 
                        className={`flex h-9 w-full rounded-md border px-3 py-1 text-base text-white shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 ${
                          formErrors.role ? 'border-red-500 bg-white/5' : 'border-white/10 bg-white/5'
                        }`}
                      >
                        <option value="">Select role...</option>
                        <option value="PCP">PCP</option>
                        <option value="Specialist">Specialist</option>
                        <option value="Practice Administrator">Practice Administrator</option>
                        <option value="PE Firm">PE Firm</option>
                        <option value="Other">Other</option>
                      </select>
                      {formErrors.role && (
                        <p className="text-red-400 text-sm">{formErrors.role}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-gray-300">Message (Optional)</Label>
                      <Textarea id="message" name="message" className="bg-white/5 border-white/10 text-white" rows={3} />
                    </div>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Request'}
                    </Button>
                  </form>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex items-center justify-center px-6 relative overflow-hidden pt-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-400/15 rounded-full blur-3xl animate-pulse delay-700" />
        
        <div className="relative z-10 text-center max-w-6xl mx-auto">
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
            Turn referral chaos into revenue. The intelligent platform for specialty practices.
          </p>
          
          <button 
            onClick={scrollToStats}
            className="group bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-14 py-6 rounded-full font-light tracking-wide text-lg transition-all hover:scale-105 hover:shadow-2xl shadow-2xl shadow-blue-500/30 flex items-center gap-3 mx-auto"
          >
            See how it works
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Impact */}
      <section ref={statsRef} className="py-40 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className={`grid md:grid-cols-3 gap-8 transition-opacity duration-1000 ${statsVisible ? 'opacity-100' : 'opacity-0'}`}>
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
                className="group bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-12 hover:border-blue-500/30 transition-all text-center min-h-[280px] flex flex-col justify-center"
                style={{ 
                  animationDelay: `${i * 100}ms`,
                  animation: statsVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none'
                }}
              >
                <div className="text-5xl md:text-6xl lg:text-7xl font-light bg-gradient-to-br from-blue-400 to-blue-500 bg-clip-text text-transparent mb-4 group-hover:scale-105 transition-transform leading-tight overflow-visible whitespace-nowrap">
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
              <div key={i} className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/30 transition-all hover:scale-[1.02]">
                <h3 className="text-xl font-normal text-white mb-3 tracking-wide">{item.problem}</h3>
                <p className="text-gray-400 font-light leading-relaxed text-sm">{item.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Platform */}
      <section id="platform-section" className="py-40 px-6">
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
                <div className="p-10 rounded-3xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-blue-500/30 transition-all hover:bg-white/10 hover:scale-[1.01]">
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

      {/* Security & Compliance Section */}
      <section id="compliance-section" className="py-40 px-6 bg-gradient-to-b from-transparent via-white/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-6xl md:text-7xl font-light text-white mb-6">
              Enterprise-grade security & compliance
            </h2>
            <p className="text-xl text-gray-400 font-light">
              Your patient data is protected with bank-level security
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {[
              { 
                icon: Shield, 
                title: 'HIPAA Compliant',
                desc: 'Full compliance with healthcare data regulations'
              },
              { 
                icon: Lock, 
                title: '256-bit Encryption',
                desc: 'Bank-level encryption for all data in transit and at rest'
              },
              { 
                icon: Server, 
                title: 'Secure Cloud Infrastructure',
                desc: 'Enterprise-grade hosting with 99.9% uptime SLA'
              }
            ].map((badge, i) => (
              <div 
                key={i} 
                className="bg-gradient-to-br from-white/5 to-white/0 border border-white/10 rounded-3xl p-10 text-center hover:border-blue-500/30 transition-all hover:scale-[1.02]"
              >
                <badge.icon className="w-16 h-16 mx-auto mb-6 text-blue-400" />
                <h3 className="text-2xl font-light text-white mb-3">{badge.title}</h3>
                <p className="text-gray-400 font-light text-sm">{badge.desc}</p>
              </div>
            ))}
          </div>
          
          <p className="text-center text-gray-500 text-sm font-light">
            Built on SOC 2-certified infrastructure (Supabase + AWS). Full SOC 2 Type II certification in progress.
          </p>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-48 px-6 relative overflow-hidden bg-[#0f1529]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-blue-500/10" />
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <h2 className="text-7xl md:text-8xl font-light text-white mb-6 leading-tight tracking-tight">
            Stop losing revenue
          </h2>
          <p className="text-2xl text-gray-400 font-light mb-12 max-w-3xl mx-auto">
            See what recovering 50% of lost referrals means for your practice
          </p>
          <Dialog open={isDemoOpen} onOpenChange={setIsDemoOpen}>
            <DialogTrigger asChild>
              <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-16 py-7 rounded-full font-light tracking-wide text-xl transition-all hover:scale-105 hover:shadow-2xl shadow-2xl shadow-blue-500/30">
                Request Demo
              </button>
            </DialogTrigger>
          </Dialog>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/5 bg-[#0a0e27]">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center mb-12">
            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              {/* Column 1 - Resources */}
              <div className="text-center md:text-left">
                <h3 className="text-white font-medium mb-4 tracking-wide">Resources</h3>
                <ul className="space-y-3">
                  <li>
                    <button 
                      onClick={scrollToStats}
                      className="text-gray-400 hover:text-white transition-colors font-light text-sm"
                    >
                      How It Works
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={scrollToCompliance}
                      className="text-gray-400 hover:text-white transition-colors font-light text-sm"
                    >
                      Security
                    </button>
                  </li>
                  <li>
                    <span className="text-gray-500 font-light text-sm" aria-label="Coming soon">
                      Documentation
                    </span>
                  </li>
                </ul>
              </div>

              {/* Column 2 - Contact */}
              <div className="text-center md:text-left">
                <h3 className="text-white font-medium mb-4 tracking-wide">Questions?</h3>
                <ul className="space-y-3">
                  <li>
                    <a 
                      href="mailto:support@tetherhealth.co" 
                      className="text-blue-400 hover:text-blue-300 underline transition-colors font-light text-sm"
                    >
                      support@tetherhealth.co
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://www.linkedin.com/company/111649326" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-5 h-5" />
                      <span className="font-light text-sm">LinkedIn</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8">
            <p className="text-gray-600 text-sm font-light text-center">
              © 2026 Tether. All rights reserved.
            </p>
            <p className="text-gray-600 text-sm font-light text-center">
              Designed for healthcare. Built for scale.
            </p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  )
}
