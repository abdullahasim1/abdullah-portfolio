import React, { useState, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LoadingScreen from "./components/LoadingScreen";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Skills from "./pages/Skills";
import Stats from "./pages/Stats";
import Process from "./pages/Process";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import FloatingIcons from "./components/FloatingIcons";
import ParticleEffect from "./components/ParticleEffect";
import ScrollProgress from "./components/ScrollProgress";

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);
    document.documentElement.classList.toggle("dark", savedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Initialize GSAP animations after loading
    initializeAnimations();
  };

  const initializeAnimations = () => {
    // Smooth reveal animations for sections
    gsap.utils.toArray('.reveal').forEach(element => {
      gsap.fromTo(element, 
        { 
          opacity: 0, 
          y: 60,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: element,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

    // Parallax effect for background elements
    gsap.utils.toArray('.parallax').forEach(element => {
      gsap.to(element, {
        y: (i, target) => -target.offsetHeight * 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    // Stagger animations for lists
    gsap.utils.toArray('.stagger-children').forEach(container => {
      const children = container.children;
      gsap.fromTo(children,
        { 
          opacity: 0, 
          y: 30,
          rotationX: -15
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: container,
            start: "top 80%"
          }
        }
      );
    });

    // Text reveal animations
    gsap.utils.toArray('.text-reveal').forEach(element => {
      const text = element.textContent;
      element.innerHTML = '';
      
      const chars = text.split('').map(char => 
        char === ' ' ? ' ' : `<span class="char">${char}</span>`
      ).join('');
      
      element.innerHTML = chars;
      
      gsap.fromTo(element.querySelectorAll('.char'),
        { 
          opacity: 0, 
          y: 50,
          rotationX: -90
        },
        {
          opacity: 1,
          y: 0,
          rotationX: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: element,
            start: "top 80%"
          }
        }
      );
    });

    // Floating animation for cards
    gsap.utils.toArray('.float-card').forEach(card => {
      gsap.to(card, {
        y: -20,
        duration: 2,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      });
    });

    // Magnetic effect for buttons
    gsap.utils.toArray('.magnetic').forEach(button => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        gsap.to(button, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.3,
          ease: "power2.out"
        });
      });
      
      button.addEventListener('mouseleave', () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: "power2.out"
        });
      });
    });
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className={`relative min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-[#0b0b0e] dark:to-[#0a0a0c] text-gray-900 dark:text-gray-100 overflow-x-clip`}>
      <ScrollProgress />
      <FloatingIcons />
      <ParticleEffect />
      
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      
      <main>
        <Home />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Stats />
        <Process />
        <Testimonials />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
