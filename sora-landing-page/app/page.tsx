"use client"

import { useRef, useEffect } from 'react'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { CloudSun, Code, Smartphone, Cloud } from 'lucide-react'
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { useGSAP } from "@gsap/react"
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import ParticleSystem from './components/ParticleSystem'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const servicesRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const contactRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!mainRef.current) return

    // Hero section animation
    if (heroRef.current) {
      const heroElements = heroRef.current.children
      gsap.fromTo(
        heroElements,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.2,
          ease: "power3.out",
        }
      )
    }

    // Services section animation
    if (servicesRef.current) {
      const heading = servicesRef.current.querySelector('h2')
      const items = servicesRef.current.querySelectorAll('.service-item')

      if (heading) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: servicesRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            }
          }
        )
      }

      if (items.length) {
        items.forEach((item, index) => {
          gsap.fromTo(
            item,
            { 
              opacity: 0, 
              x: index % 2 === 0 ? -50 : 50, 
              y: 50 
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 1,
              scrollTrigger: {
                trigger: item,
                start: "top 80%",
                end: "top 50%",
                toggleActions: "play none none reverse",
              }
            }
          );
        });
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.to(entry.target, { opacity: 1, x: 0, y: 0, duration: 1 });
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });

      items.forEach(item => observer.observe(item));
    }

    // About section animation
    if (aboutRef.current) {
      const heading = aboutRef.current.querySelector('h2')
      const content = aboutRef.current.querySelector('.content')

      if (heading && content) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            }
          }
        )

        gsap.fromTo(
          content,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: aboutRef.current,
              start: "top 70%",
              end: "top 30%",
              scrub: 1,
            }
          }
        )
      }
    }

    // Contact section animation
    if (contactRef.current) {
      const heading = contactRef.current.querySelector('h2')
      const content = contactRef.current.querySelector('.content')

      if (heading && content) {
        gsap.fromTo(
          heading,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 80%",
              end: "top 50%",
              scrub: 1,
            }
          }
        )

        gsap.fromTo(
          content,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 1,
            scrollTrigger: {
              trigger: contactRef.current,
              start: "top 70%",
              end: "top 30%",
              scrub: 1,
            }
          }
        )
      }
    }

    // Parallax effect for background
    gsap.to(".tech-pattern", {
      yPercent: 30,
      ease: "none",
      scrollTrigger: {
        trigger: mainRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      }
    });

  }, [])

  useEffect(() => {
    const smoothScroll = (e: Event) => {
      e.preventDefault();
      const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href')?.slice(1);
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', smoothScroll);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', smoothScroll);
      });
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground" ref={mainRef}>
      <div className="fixed inset-0 sky-gradient"></div>
      <div className="fixed inset-0 tech-pattern opacity-30 pointer-events-none"></div>
      <header className="fixed top-0 left-0 right-0 z-50 px-4 lg:px-6 h-20 flex items-center border-b border-gray-100/10 glassmorphism">
        <Link className="flex items-center justify-center" href="/">
          <CloudSun className="h-8 w-8 mr-2 text-[#00B0FF]" />
          <span className="font-bold text-2xl text-gray-900">SORA</span>
        </Link>
        <nav className="ml-auto flex gap-8">
          <Link className="text-base font-medium text-gray-600 hover:text-[#00B0FF] transition-colors" href="#services">
            Services
          </Link>
          <Link className="text-base font-medium text-gray-600 hover:text-[#00B0FF] transition-colors" href="#about">
            About
          </Link>
          <Link className="text-base font-medium text-gray-600 hover:text-[#00B0FF] transition-colors" href="#contact">
            Contact
          </Link>
        </nav>
      </header>
      <main className="flex-1 relative">
        <section ref={heroRef} className="w-full h-screen relative overflow-hidden">
          <Canvas
            className="absolute inset-0"
            camera={{ position: [0, 0, 50], fov: 75, near: 1, far: 1000 }}
            gl={{ antialias: false, alpha: true }}
          >
            <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
            <ParticleSystem />
          </Canvas>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container px-4 md:px-6 relative z-10">
              <div className="flex flex-col items-center space-y-8 text-center">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none text-gray-900">
                  Welcome to <span className="text-[#0DA2E7]">SORA</span>
                </h1>
                <p className="mx-auto max-w-[800px] text-gray-700 text-xl md:text-2xl">
                  Elevate your digital presence with our cutting-edge web and software solutions.
                </p>
                <div className="space-x-4">
                  <Button 
                    asChild 
                    size="lg" 
                    className="text-lg bg-[#00B0FF] hover:bg-[#0099FF] text-white rounded-md px-8"
                  >
                    <Link href="https://forms.gle/S8fxx9ZHTZF5pcz37" target="_blank" rel="noopener noreferrer">
                      Book a Website
                    </Link>
                  </Button>
                  <Button 
                    variant="outline" 
                    asChild 
                    size="lg" 
                    className="text-lg text-gray-900 rounded-md px-8 border-1 border-gray-300 hover:bg-[#0099FF] hover:text-white"
                  >
                    <Link href="#contact">
                      Contact Us
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section ref={servicesRef} id="services" className="w-full py-24 md:py-32 lg:py-40 relative">
          <div className="container px-4 md:px-6 relative z-10">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              <div className="service-item flex flex-col items-center text-center space-y-4 opacity-0 transform translate-y-4">
                <Code className="h-16 w-16 text-[#00B0FF]" />
                <h3 className="text-2xl font-bold text-gray-900">Web Development</h3>
                <p className="text-gray-700 text-lg">Custom websites tailored to your needs</p>
              </div>
              <div className="service-item flex flex-col items-center text-center space-y-4 opacity-0 transform translate-y-4">
                <Smartphone className="h-16 w-16 text-[#00B0FF]" />
                <h3 className="text-2xl font-bold text-gray-900">Mobile Apps</h3>
                <p className="text-gray-700 text-lg">Native and cross-platform mobile applications</p>
              </div>
              <div className="service-item flex flex-col items-center text-center space-y-4 opacity-0 transform translate-y-4">
                <Cloud className="h-16 w-16 text-[#00B0FF]" />
                <h3 className="text-2xl font-bold text-gray-900">Cloud Solutions</h3>
                <p className="text-gray-700 text-lg">Scalable and secure cloud infrastructure</p>
              </div>
            </div>
          </div>
        </section>
        <section ref={aboutRef} id="about" className="w-full py-24 md:py-32 lg:py-40 relative overflow-hidden">
          <div className="absolute inset-0 bg-white/50"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">About SORA</h2>
            <div className="content">
              <p className="mx-auto max-w-[800px] text-gray-700 text-xl md:text-2xl text-center">
                SORA, meaning "sky" in Japanese, embodies our vision of limitless possibilities in the digital realm. 
                Just as the sky knows no boundaries, we push the limits of technology to help your business soar to new heights.
              </p>
            </div>
          </div>
        </section>
        <section ref={contactRef} id="contact" className="w-full py-24 md:py-32 lg:py-40 relative">
          <div className="container px-4 md:px-6 relative z-10">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl text-center mb-12 text-gray-900">Contact Us</h2>
            <div className="content flex flex-col items-center space-y-8 text-center">
              <p className="mx-auto max-w-[800px] text-gray-700 text-xl md:text-2xl">
                Ready to elevate your digital presence? Let's reach for the sky together!
              </p>
              <Button 
                asChild 
                size="lg" 
                className="text-lg bg-[#00B0FF] hover:bg-[#0099FF] text-white rounded-full px-8"
              >
                <Link href="https://forms.gle/S8fxx9ZHTZF5pcz37" target="_blank" rel="noopener noreferrer">
                  Book a Consultation
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="relative w-full py-6 border-t border-gray-200">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center md:text-left text-gray-600">© 2024 SORA. All rights reserved.</p>
            <nav className="flex gap-4 sm:gap-6">
              <Link className="text-gray-600 hover:text-[#00B0FF] hover:underline underline-offset-4" href="#terms">
                Terms of Service
              </Link>
              <Link className="text-gray-600 hover:text-[#00B0FF] hover:underline underline-offset-4" href="#privacy">
                Privacy
              </Link>
            </nav>
            <Link href="https://first-import.vercel.app" className="hover-glow rounded-full p-2 transition-all duration-300">
              <Cloud className="h-6 w-6 text-[#00B0FF]" />
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

