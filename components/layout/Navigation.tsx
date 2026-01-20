'use client'

import { MessageSquare, Menu, X } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'motion/react'
import { mainNavigation } from '@/content/navigation'

export function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg py-3' 
        : 'bg-transparent py-6'
    } ${isMobileMenuOpen ? 'bg-white shadow-none' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 lg:-ml-1 transform hover:scale-105 transition-transform duration-300 relative z-50">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 222.74109 24.139114" className="h-5 sm:h-6 w-auto">
              <path d="m 107.0816,18.281801 h 10.6069 v -2.6981 h -5.7674 v -2e-4 h -5.2474 V 7.0371017 h 6.1563 v 0.4079 7.0071993 h 4.8585 V 4.3391017 H 106.6737 V 0.97150171 h -4.8585 V 4.3391017 H 90.800894 V 18.281801 H 101.8152 v 5.3001 h 4.8585 v -5.3001 z M 101.8152,7.4450017 V 15.583501 H 95.659394 V 7.0371017 h 6.155806 z m 30.5006,11.5978993 h 7.3619 v -8.5838 h -15.1055 v 13.1228 h 16.4405 v -2.6983 h -11.582 v -7.7265 h 5.4551 v 3.3048 h -2.57 z m 5.0793,-17.4857993 h -10.4832 l -2.8853,7.3834 h 5.0638 l 1.7688,-4.6851 h 2.5762 l 1.5685,4.6851 h 5.0363 z m 8.2905,1.5813 h -3.4567 V 18.896601 h 3.4567 z m 2.1435,17.7451993 h -2.1958 v 2.6983 h 7.3954 V 1.0008017 H 148.237 V 20.883601 Z M 172.381,1.6156017 h -8.9294 l 0.1669,-0.64409999 h -4.0067 L 158.576,4.6066017 h 3.9923 l 0.1669,-0.5854 h 1.2158 v 2.0747 h -5.5741 v 2.4053 h 3.5123 l -2.7038,3.3675993 h 4.8266 c 1.0305,-1.3327 1.7755,-2.2965993 2.6037,-3.3675993 h 6.0324 v -2.4053 h -3.8386 v -2.0747 h 3.5715 z m 13.551,11.8302993 h -24.985 v 5.9699 c 6.7086,0 13.4159,-0.003 20.1268,-0.003 v -0.1225 1.6516 c -6.7089,0 -13.4179,0 -20.1268,0 v 2.6398 h 24.985 z m -4.8582,2.9889 v 1.3927 h -15.2683 v -1.8005 h 15.2683 z m -8.1857,-4.566 -1.0141,-1.9661993 h -4.7515 l 1.038,1.9661993 z m 14.7131,-10.4027993 -13.6035,-0.0552 v 6.6282 h 4.8585 v -3.9008 h 3.8865 v 0.4078 4.6245 h -3.0932 -0.7933 -4.8585 v 2.6982993 h 13.6035 z m 14.7128,2.8731 h -2.0696 V 0.97150171 h -4.8585 V 4.3391017 h -2.2028 v 2.698 h 2.2028 v 5.7962993 l -2.403,0.3515 v 2.7494 l 2.403,-0.3517 v 5.301 h -1.8691 v 2.6983 h 6.7276 v -8.7276 l 2.1362,-0.3221 v -2.7482 l -2.1362,0.322 V 7.0371017 h 2.0696 z m 8.218,16.5444993 h -6.8684 v 2.6983 h 19.0775 v -2.6983 h -6.9427 v -5.5008 h 6.0079 v -2.6983 h -17.2081 v 2.6983 h 6.3417 v 5.5008 z M 210.1982,2.2600017 h -6.3677 v 5.7434 h 2.2433 l -1.7358,2.9282993 h 4.8648 l 2.1066,-3.4593993 h -2.8874 v -2.69 h 9.6941 v 2.69 h -2.8539 l 2.1066,3.4593993 h 4.8647 l -1.7354,-2.9282993 h 2.2094 v -5.7434 h -7.1073 l -0.2337,-1.28849999 h -4.9149 l 0.2335,1.28849999 z" style={{fill: (scrolled || isMobileMenuOpen) ? '#11345b' : '#ffffff', fillRule: 'evenodd'}}/>
              <path d="M 21.950494,23.733601 H 3.1864939 v -4.2667 c 5.9587,0 12.8054001,0 18.7640001,0 z m 41.5679,0 h -18.8002 v -3.0278 l 2.5026,-3.3546 c 2.0378,0.0197 4.049,0.0498 6.0324,0.0919 l -1.4681,2.0238 h 11.7333 z m -13.2291,-10.4956 3.328,-4.4609993 h 5.9228 l -3.5466,4.8887993 c -1.8648,-0.1737 -3.768,-0.3168 -5.7042,-0.4278 z m -4.7099,-8.6581993 V 0.39440171 h 17.8856 V 4.5798017 Z m 33.8485,19.1537993 h -6.6445 l -2.8616,-4.2667 h 6.4163 z m -12.4239,-8.6171 -1.0207,-1.5219 c -1.0542,-1.5362 -0.7782,-1.9767 0.0333,-3.4668 l 6.4446,-9.73339929 h 6.2667 l -8.1391,11.13349929 3.6859,5.0898 c -2.3005,-0.5578 -4.7297,-1.0603 -7.2707,-1.5012 z M 7.7925939,14.483001 15.111494,4.6722017 H 4.0114939 V 0.39440171 H 21.917194 V 3.3389017 l -8.0844,11.1440993 z" style={{fill: (scrolled || isMobileMenuOpen) ? '#11345b' : '#ffffff', fillRule: 'evenodd'}}/>
              <path d="m 42.195694,22.905801 c -1.6999,0.8222 -3.9277,1.2333 -6.6721,1.2333 -3.5779,0 -6.3945,-1.05 -8.4445,-3.1554 -0.6686,-0.685 -1.2279,-1.444 -1.6782,-2.2771 l -9.3277,-0.6348 8.8421,-0.3942 v 0 c 2.1158,-0.0943 4.2317,-0.1886 6.3476,-0.283 l -0.003,0.002 0.005,-10e-5 c 0.0571,0.0651 0.1155,0.1292 0.1753,0.1922 0.7084,0.7488 1.556,1.2892 2.5415,1.6199 1.2997,0.5773 2.7768,0.904 4.3435,0.904 1.3795,0 2.6897,-0.2531 3.8705,-0.7077 z m -18.1535,-9.1535 c -0.0272,-0.3859 -0.041,-0.781 -0.041,-1.1855 0,-3.7332993 1.1501,-6.7610993 3.4555,-9.0834993 2.3057,-2.3222 5.3001,-3.4832999945893 8.9781,-3.4832999945893 2.2777,0 4.1999,0.2890000045893 5.7609,0.8667000045893 V 4.7338017 c -1.1808,-0.4545 -2.491,-0.7076 -3.8705,-0.7076 -5.2048,0 -9.4241,3.6011 -9.4241,8.0433993 0,0.4321 0.0401,0.8561 0.117,1.2697 -1.6865,0.1136 -3.3464,0.2516 -4.9759,0.413 z" style={{fill: '#fdbd00', fillRule: 'evenodd'}}/>
              <path d="m 40.450594,13.960501 c 16.0067,0 30.3527,1.794 40.0644,4.6292 -11.594,-1.2197 -25.1873,-1.9219 -39.725,-1.9219 -14.9851,0 -28.9669,0.7462 -40.7900000405513,2.0361 C 9.7153939,15.802901 24.230294,13.960501 40.450594,13.960501 Z" style={{fill: '#fdbd00', fillRule: 'evenodd'}}/>
            </svg>
          </Link>

          {/* Main Navigation - Desktop */}
          <div className="hidden lg:flex items-center space-x-1">
            {mainNavigation.map((item) => (
              <Link 
                key={item.label}
                href={item.href} 
                className={`relative px-4 py-2 text-sm font-medium group transition-colors duration-300 ${
                  scrolled ? 'text-[#11345b]' : 'text-white'
                }`}
              >
                <span className="relative z-10">{item.label}</span>
                <span className="absolute bottom-1 left-4 right-4 h-0.5 bg-[#fdbd00] scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center"></span>
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link href="/contact" className={`group relative hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-xl overflow-hidden transition-all duration-300 transform hover:-translate-y-0.5 ${
              scrolled 
                ? 'bg-[#11345b] text-white shadow-lg shadow-[#11345b]/20' 
                : 'bg-white/10 backdrop-blur-md text-white border border-white/20'
            }`}>
              <span className="absolute inset-0 bg-gradient-to-r from-[#fdbd00] to-[#ffd700] translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              <MessageSquare className={`w-4 h-4 relative z-10 transform group-hover:rotate-12 group-hover:text-[#11345b] transition-all duration-300`} />
              <span className="relative z-10 font-bold group-hover:text-[#11345b] transition-colors duration-300 text-sm">立即咨询</span>
            </Link>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-xl transition-all duration-300 relative z-50 ${
                (scrolled || isMobileMenuOpen) ? 'text-[#11345b] hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-100 overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-8 space-y-4">
              {mainNavigation.map((item, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={item.label}
                >
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 text-lg font-medium text-[#11345b] hover:bg-[#11345b]/5 rounded-xl transition-colors"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-4 px-4"
              >
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-[#11345b] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-[#11345b]/20">
                  <MessageSquare className="w-5 h-5" />
                  立即咨询
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
