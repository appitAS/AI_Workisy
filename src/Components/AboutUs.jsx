"use client"

import { useState, useEffect, useRef } from "react"
import { Box, Typography, Card, CardContent, Chip, Stack, Button, Avatar, Paper } from "@mui/material"
import { styled } from "@mui/material/styles"
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome"
import { useSEO } from "../utils/useSEO.jsx"
import GlobalInfoSection from "./GlobalInfoSection.jsx"

// Styled components following Workisy theme
const GradientText = styled("span")({
  background: "linear-gradient(134deg, #8E2DE2 1.47%, #4A00E0 94.07%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  fontWeight: 700,
})

const WorkisyCard = styled(Card)(({ theme }) => ({
  borderRadius: "18px",
  backgroundColor: "#fff",
  boxShadow: "0px 0px 4px 3px rgba(0, 0, 0, 0.10)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0px 8px 20px rgba(123, 47, 242, 0.15)",
  },
}))

const WorkisyButton = styled(Button)({
  borderRadius: "24px",
  textTransform: "capitalize",
  fontWeight: 600,
  padding: "12px 24px",
  background: "linear-gradient(134deg, #8E2DE2 1.47%, #4A00E0 94.07%)",
  color: "#fff",
  "&:hover": {
    background: "linear-gradient(134deg, #7A29C7 1.47%, #3F00B8 94.07%)",
    transform: "scale(1.05)",
  },
})


// Custom hook for counter animation
const useCounterAnimation = (end, duration = 2000, shouldStart = false) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!shouldStart) return

    let startTime = null
    const startCount = 0

    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const currentCount = Math.floor(easeOutQuart * (end - startCount) + startCount)
      
      setCount(currentCount)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setCount(end)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, shouldStart])

  return count
}

// Animated Counter Component
const AnimatedCounter = ({ end, suffix = "", duration = 2000, shouldStart = false }) => {
  const count = useCounterAnimation(end, duration, shouldStart)
  return <span>{count}{suffix}</span>
}

// Reusable Team Member Component
const TeamMemberCard = ({ member, index = 0 }) => {
  return (
    <WorkisyCard
      sx={{
        p: 3,
        textAlign: "center",
        transition: "all 0.3s ease",
        "&:hover": {
          transform: "translateY(-8px)",
          boxShadow: "0px 12px 24px rgba(123, 47, 242, 0.2)",
        },
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Avatar
          src={member.image}
          sx={{
            width: 120,
            height: 120,
            mx: "auto",
            mb: 2,
            background: "linear-gradient(134deg, #8E2DE2 1.47%, #4A00E0 94.07%)",
            fontSize: "2rem",
            fontWeight: 700,
          }}
        >
          {!member.image && member.name?.[0]?.toUpperCase()}
        </Avatar>
        
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            color: "#000",
            mb: 1,
            fontSize: "1.1rem",
          }}
        >
          {member.name}
        </Typography>
        
        <Typography
          variant="body2"
          sx={{
            color: "#7b2ff2",
            mb: 2,
            fontWeight: 500,
          }}
        >
          {member.position}
        </Typography>
        
        <Stack direction="row" spacing={1} justifyContent="center">
          <Button
            href={member.linkedin || "#"}
            size="small"
            sx={{
              minWidth: 36,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#0066B3",
              color: "#fff",
              "&:hover": { background: "#004d87" },
            }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </Button>
          
          <Button
            href={member.facebook || "#"}
            size="small"
            sx={{
              minWidth: 36,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#1877f2",
              color: "#fff",
              "&:hover": { background: "#166fe5" },
            }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </Button>
          
          <Button
            href={member.twitter || "#"}
            size="small"
            sx={{
              minWidth: 36,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "#000",
              color: "#fff",
              "&:hover": { background: "#333" },
            }}
          >
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
            </svg>
          </Button>
        </Stack>
      </CardContent>
    </WorkisyCard>
  )
}

// Reusable Leadership Component
const LeadershipCard = ({ leader, index = 0 }) => {
   
                        
  return (
    <div
      className="bg-gray-900 rounded-3xl p-8 lg:p-12 relative overflow-hidden"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full bg-gradient-to-br from-purple-500 to-gray-700"></div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2">
            Meet the Minds Behind Our <span className="text-purple-400">Success!</span>
          </h2>
          <p className="text-gray-300 text-lg">{leader.role}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <h3 className="text-4xl lg:text-5xl font-bold text-white">{leader.name}</h3>

            <div className="space-y-6 text-gray-300 leading-relaxed">
              {leader.description.map((paragraph, idx) => (
                <p key={idx} className="text-lg">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Key Points */}
            <div className="space-y-4">
              {leader.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-center space-x-4">
                  <div className="w-6 h-6 text-yellow-400 flex-shrink-0">
                    <svg fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  <span className="text-white font-medium text-lg">{point}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-lg h-[450px] relative overflow-hidden rounded-3xl shadow-2xl">
              {leader.image ? (
                <img 
                  src={leader.image} 
                  alt={leader.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
              ) : null}
              <div className="text-center text-gray-500 w-full h-full flex items-center justify-center bg-gray-100" style={{ display: leader.image ? 'none' : 'flex' }}>
                <div>
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-300 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                  <p className="text-xl font-semibold mb-2">Leader Photo</p>
                <p className="text-sm opacity-75">Replace with professional headshot</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const AboutUs = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [activeTimelineItem, setActiveTimelineItem] = useState(0)
  const [shouldAnimateStats, setShouldAnimateStats] = useState(false)
  const [animatePromise, setAnimatePromise] = useState(false)
  const statsRef = useRef(null)
  const teamRef = useRef(null)
  const promiseRef = useRef(null)
  const seoComponent = useSEO({
    title: "About Us",
    description: "Learn more about APPIT Software Solutions, a leading provider of custom software and innovative IT services.",
    keywords: "about us, APPIT Software Solutions, custom software, innovative IT services",
    ogTitle: "About APPIT Software Solutions",
    ogDescription: "Discover the story behind APPIT Software Solutions, a trusted partner for digital transformation."
  });

  useEffect(() => {
    setIsVisible(true)

    // Auto-advance timeline
    const interval = setInterval(() => {
      setActiveTimelineItem((prev) => (prev + 1) % 5)
    }, 4000)

    // Intersection Observer for stats animation
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldAnimateStats) {
            setShouldAnimateStats(true)
            statsObserver.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.3, // Trigger when 30% of the element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation a bit before the element is fully visible
      }
    )

    const currentStatsRef = statsRef.current
    if (currentStatsRef) {
      statsObserver.observe(currentStatsRef)
    }

    // Intersection Observer for promise section animation
    const promiseObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setAnimatePromise(true)
            promiseObserver.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    const currentPromiseRef = promiseRef.current
    if (currentPromiseRef) {
      promiseObserver.observe(currentPromiseRef)
    }

    return () => {
      clearInterval(interval)
      if (currentStatsRef) {
        statsObserver.unobserve(currentStatsRef)
      }
      if (currentPromiseRef) {
        promiseObserver.unobserve(currentPromiseRef)
      }
    }
  }, [shouldAnimateStats])

  const timelineData = [
    {
      year: "2015",
      title: "Establishment & Foundation",
      description:
        "APPIT Software was founded with a vision to transform businesses through innovative technology solutions.",
    },
    {
      year: "2018",
      title: "Growth & Expansion",
      description: "Expanded our services and client base, establishing ourselves as a trusted technology partner.",
    },
    {
      year: "2020",
      title: "Innovation & Impact",
      description:
        "Introduced cutting-edge AI and cloud solutions, making significant impact in digital transformation.",
    },
    {
      year: "2022",
      title: "Strengthening Foundations",
      description: "Strengthened our core services and built robust partnerships with leading technology providers.",
    },
    {
      year: "2025",
      title: "A Breakthrough Year",
      description: "Pioneering next-generation solutions and expanding globally to serve diverse markets.",
    },
  ]

  const stats = [
    { number: 25, suffix: "+", label: "Number Of Projects" },
    { number: 100, suffix: "+", label: "Clients Worldwide" },
    { number: 150, suffix: "+", label: "In Business" },
    { number: 9, suffix: "+", label: "Team Members" },
  ]

  // Team members data - easily extendable
  const teamMembers = [
    { name: "Sri Lakshmi", position: "Manager", image: "/images/about-images/lakshmi.png", linkedin: "#", facebook: "#", twitter: "#" },
    { name: "MD Asif Iqbal", position: "SR.Software Lead", image: "/images/about-images/md-asif-iqbal.jpg", linkedin: "#", facebook: "#", twitter: "#" },
    { name: "Hassan", position: "Senior Talent Acquisition Specialist", image: "/images/about-images/hassan.jpg", linkedin: "#", facebook: "#", twitter: "#" },
    { name: "Shravya", position: "Sales Head", image: "/images/about-images/shravya.png", linkedin: "#", facebook: "#", twitter: "#" },
    { name: "Akhil", position: "HR Manager", image: "/images/about-images/akhil.png", linkedin: "#", facebook: "#", twitter: "#" },
    { name: "Teja", position: "Account Manager-Tag", image: "/images/about-images/teja.png", linkedin: "#", facebook: "#", twitter: "#" },
    { name: "Praveen nayak", position: "UI/UX Designer", image: "/images/about-images/praveen nayak.png", linkedin: "#", facebook: "#", twitter: "#" },
    { name: "Praveen nayak", position: "Managing Director", image: "/images/about-images/praveennayak2.png", linkedin: "#", facebook: "#", twitter: "#" },
  ]

  // Leadership data - easily extendable for more leaders
  const leaders = [
    {
      name: "Aravind Gajjela",
      role: "CEO & MD",
      image: "/images/about-images/ceo.png",
      description: [
        "Aravind Gajjela is the visionary CEO and Founder of APPIT Software Solutions, a leading provider of custom software and innovative IT services. With a strong background in technology and entrepreneurship, he has been instrumental in scaling the company and positioning it as a trusted partner for digital transformation.",
        "Under his leadership, APPIT has delivered tailored software, web, and cloud solutions that solve complex business challenges and drive operational efficiency. Aravind's expertise spans business process optimization, SDLC, and enterprise database management, all rooted in a customer-first, innovation-driven culture.",
      ],
      keyPoints: ["Visionary Leadership", "Customer-Centric Approach", "Expertise in Technology and Business"],
    },
    {
      name: "Ventaka Niranjan",
      role: "Our Advisor",
      image: "/images/about-images/ventaka_niranjan.png",
      description: [
        "A seasoned IT professional with over 30 years of experience, including 20+ years in leadership roles across IT and manufacturing sectors.",
        "He has led ERP and e-commerce implementations, upgrades, and maintenance, driving full-scale digital transformations using the latest technologies and best practices.",
        "With expertise in system integration, process optimization, and cross-functional leadership, he consistently delivers impactful, business-driven IT solutions.",
      ],
      keyPoints: [
        "Worked with TOP IT MNCs and received several awards",
        "Designed and developed Industry specific ERP customizations", 
        "Specialized in handling Corporate, On-Job and fresher's training",
        "Implemented ERP for diversified Business Verticals",
        "Chaired Smart India Hackathons as technical judge"
      ],
    },
    // Add more leaders here as needed
  ]

  // Smooth scroll to team section
  const scrollToTeam = () => {
    teamRef.current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    })
  }

  return (
    <>
    {seoComponent}
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative py-32 overflow-hidden">
        {/* Video Background */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/images/banner/about-us-banner.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.5rem", md: "4rem" },
              color: "#fff",
              mb: 2,
              letterSpacing: -1,
            }}
          >
            About <GradientText style={{ color: "#fff" }}>Workisy</GradientText>
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 18, md: 24 },
              color: "#e8f0fe",
              fontWeight: 500,
              maxWidth: 600,
              mx: "auto",
            }}
          >
            Empowering careers through AI-powered job matching and innovative technology solutions
          </Typography>
        </div>
      </div>

      {/* Company Overview Section */}
      <Box sx={{ py: 8, px: 4, background: "#f8fbff" }}>
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          {/* Section Header */}
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "2.5rem" },
                color: "#333",
                mb: 2,
              }}
            >
              Grow Your <GradientText>Career</GradientText> With Workisy
            </Typography>
            <Typography
              sx={{
                fontSize: 18,
                color: "#666",
                maxWidth: 600,
                mx: "auto",
              }}
            >
              AI-powered job matching platform delivering personalized career opportunities
            </Typography>
          </Box>

          {/* Two Column Layout */}
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 4 }}>
            {/* Left Column - Text Content */}
            <WorkisyCard sx={{ p: 4, height: "fit-content" }}>
              <CardContent sx={{ p: 0 }}>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: "#333",
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <AutoAwesomeIcon sx={{ color: "#7b2ff2" }} />
                  AI-Powered Job Discovery
                </Typography>
                <Stack spacing={3}>
                  <Typography sx={{ color: "#666", lineHeight: 1.7 }}>
                    Workisy uses advanced AI technology to match your skills, experience, and preferences with the perfect job opportunities from our database of 1.27 million+ jobs worldwide.
                  </Typography>
                  <Typography sx={{ color: "#666", lineHeight: 1.7 }}>
                    Our intelligent algorithms analyze your resume and provide personalized job recommendations that align with your career goals and aspirations.
                  </Typography>
                  <Typography sx={{ color: "#666", lineHeight: 1.7 }}>
                    Experience the future of job searching with our seamless, efficient, and highly accurate matching system.
                  </Typography>
                </Stack>
              </CardContent>
            </WorkisyCard>

            {/* Right Column - Team Image */}
            <WorkisyCard 
              sx={{ 
                p: 2, 
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0px 12px 24px rgba(123, 47, 242, 0.2)",
                }
              }}
              onClick={scrollToTeam}
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "12px",
                  overflow: "hidden",
                  minHeight: 300,
                  background: "#e8f0fe",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <img 
                  src="/images/about-images/team-work.jpg" 
                  alt="Our Team Working Together"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                
                {/* Arrow Pointer */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 16,
                    right: 16,
                    bgcolor: "#7b2ff2",
                    borderRadius: "50%",
                    p: 1,
                    boxShadow: 3,
                    animation: "bounce 1s infinite",
                    zIndex: 10,
                  }}
                >
                  <svg width="24" height="24" fill="white" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#e8f0fe",
                    display: "none"
                  }}
                >
                  <Stack alignItems="center" spacing={2}>
                    <Avatar
                      sx={{
                        width: 80,
                        height: 80,
                        background: "linear-gradient(134deg, #8E2DE2 1.47%, #4A00E0 94.07%)",
                      }}
                    >
                      <svg width="40" height="40" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    </Avatar>
                    <Typography variant="h6" color="#7b2ff2">Meet Our Team</Typography>
                  </Stack>
                </Box>
                
                {/* Overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(135deg, rgba(123, 47, 242, 0.1) 0%, rgba(0, 102, 179, 0.1) 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    "&:hover": { opacity: 1 },
                  }}
                >
                  <WorkisyButton>
                    Meet Our Team
                  </WorkisyButton>
                </Box>
              </Box>
            </WorkisyCard>
                     </Box>
         </Box>
       </Box>

      {/* Enhanced Timeline Section */}
      <div className="py-16 sm:py-20 lg:py-32 px-4 bg-gray-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-1 bg-purple-500 rounded-full transform rotate-12 opacity-60"></div>
        <div className="absolute top-32 right-20 w-24 h-1 bg-blue-500 rounded-full transform -rotate-45 opacity-60"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-1 bg-purple-500 rounded-full transform rotate-45 opacity-60"></div>
        <div className="absolute bottom-32 right-10 w-28 h-1 bg-blue-500 rounded-full transform -rotate-12 opacity-60"></div>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 lg:mb-24">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">Our Journey</h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
              From humble beginnings to industry leadership, discover the milestones that shaped our success
            </p>
          </div>

          {/* Desktop Timeline */}
          <div className="hidden lg:block relative">
            {/* Timeline Line */}
            <div className="absolute top-1/2 left-0 right-0 h-2 bg-gray-200 transform -translate-y-1/2 rounded-full"></div>

            {/* Timeline Items */}
            <div className="flex justify-between items-center relative z-10">
              {timelineData.map((item, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center cursor-pointer transition-all duration-500 ${
                    activeTimelineItem === index ? "scale-110" : "hover:scale-105"
                  }`}
                  onClick={() => setActiveTimelineItem(index)}
                >
                  {/* Timeline Image */}
                  <div
                    className={`w-20 h-20 bg-gray-100 rounded-full overflow-hidden mb-6 shadow-xl transform transition-all duration-500 border-4 ${
                      activeTimelineItem === index ? "border-purple-500 animate-pulse" : "border-gray-300"
                    }`}
                  >
                    <img 
                      src={`/images/about-images/${item.year}.${item.year === '2015' || item.year === '2022' || item.year === '2025' ? 'jpg' : 'png'}`}
                      alt={`${item.year} milestone`}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.nextSibling.style.display = 'flex'
                      }}
                    />
                    <div className="w-full h-full flex items-center justify-center text-gray-400" style={{ display: 'none' }}>
                      <div className="text-center">
                      <svg className="w-8 h-8 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <div className="text-xs font-medium">IMG</div>
                      </div>
                    </div>
                  </div>

                  {/* Year Badge */}
                  <div className="bg-purple-500 text-white px-6 py-3 rounded-full font-bold text-lg mb-4 shadow-lg">
                    {item.year}
                  </div>

                  {/* Content */}
                  <div className="text-center max-w-[220px]">
                    <h3 className="font-bold text-gray-900 mb-3 text-lg">{item.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Timeline */}
          <div className="lg:hidden space-y-8">
            {timelineData.map((item, index) => (
              <div key={index} className="flex items-start space-x-6 p-6 bg-gray-50 rounded-2xl shadow-lg">
                <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex-shrink-0 shadow-lg border-2 border-gray-300">
                  <img 
                    src={`/images/about-images/${item.year}.${item.year === '2015' || item.year === '2022' || item.year === '2025' ? 'jpg' : 'png'}`}
                    alt={`${item.year} milestone`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center text-gray-400" style={{ display: 'none' }}>
                    <div className="text-center">
                    <svg className="w-6 h-6 mx-auto mb-1" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <div className="text-xs font-medium">IMG</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="bg-purple-500 text-white px-4 py-2 rounded-full font-bold text-sm mb-3 inline-block">
                    {item.year}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-16 sm:py-20 lg:py-32 px-4 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-1 bg-purple-500 rounded-full transform rotate-12 opacity-60"></div>
        <div className="absolute top-32 right-20 w-24 h-1 bg-blue-500 rounded-full transform -rotate-45 opacity-60"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-1 bg-purple-500 rounded-full transform rotate-45 opacity-60"></div>
        <div className="absolute bottom-32 right-10 w-28 h-1 bg-blue-500 rounded-full transform -rotate-12 opacity-60"></div>

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-16 lg:mb-24">
            {/* Left Column - Text Content */}
            <div className="space-y-8 lg:space-y-12">
              <div className="space-y-8">
                <div className="flex items-start space-x-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    APPIT Software is an IT services firm that delivers and supports software technologies, business
                    management, and core infrastructure solutions for organizations spanning diverse IT technologies.
                  </p>
                </div>

                <div className="flex items-start space-x-6 p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    One-stop approach to all IT consultation services to maximize your ROI. We support services in cloud
                    migration, cloud computing, Oracle, AI, Big Data, Blockchain and mobile application platforms.
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Tech Image */}
            <div className="relative z-10">
              
              <div className="rounded-3xl overflow-hidden h-[300px] sm:h-[350px] relative shadow-2xl">
                <img 
                  src="/images/about-images/technology.png" 
                  alt="AI Technology Solutions - Brain Network"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.nextSibling.style.display = 'flex'
                  }}
                />
                
                {/* Fallback content if image fails */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-gray-900 flex items-center justify-center" style={{ display: 'none' }}>
                <div className="text-center text-white z-10">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center backdrop-blur-sm">
                    <svg className="w-10 h-10 sm:w-12 sm:h-12" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-xl sm:text-2xl font-semibold mb-2">AI/Tech Visualization</p>
                    <p className="text-sm sm:text-base opacity-75">Technology solutions</p>
                </div>

                {/* Subtle Animated Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  {[...Array(15)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute bg-blue-400 rounded-full opacity-20 animate-float"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 3 + 2}px`,
                        height: `${Math.random() * 3 + 2}px`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${Math.random() * 2 + 1}s`,
                      }}
                    />
                  ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics */}
          <Box ref={statsRef} sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }, gap: 3 }}>
            {stats.map((stat, index) => (
              <WorkisyCard
                key={index}
                sx={{
                  p: 3,
                  textAlign: "center",
                  background: "linear-gradient(134deg, #8E2DE2 1.47%, #4A00E0 94.07%)",
                  color: "#fff",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px) scale(1.05)",
                    boxShadow: "0px 16px 32px rgba(123, 47, 242, 0.3)",
                  },
                }}
              >
                <Typography
                  variant="h3"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2rem", md: "2.5rem" },
                    mb: 1,
                  }}
                >
                  <AnimatedCounter 
                    end={stat.number} 
                    suffix={stat.suffix} 
                    duration={2000 + (index * 200)} 
                    shouldStart={shouldAnimateStats}
                  />
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 500,
                    opacity: 0.9,
                    fontSize: { xs: "0.875rem", md: "1rem" },
                  }}
                >
                  {stat.label}
                </Typography>
              </WorkisyCard>
            ))}
          </Box>
        </div>
      </div>

      {/* Promise Section */}
      <div ref={promiseRef} className="py-16 sm:py-20 lg:py-32 px-4 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 relative overflow-hidden">
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 opacity-40" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-purple-500 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0s' }}></div>
        <div className="absolute top-40 right-20 w-3 h-3 bg-blue-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-cyan-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 right-10 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-60" style={{ animationDelay: '0.5s' }}></div>

        {/* Animated Lines */}
        <div className="absolute top-10 left-10 w-32 h-1 bg-gradient-to-r from-purple-500 to-transparent rounded-full transform rotate-12 opacity-80 animate-pulse"></div>
        <div className="absolute top-32 right-20 w-24 h-1 bg-gradient-to-r from-blue-400 to-transparent rounded-full transform -rotate-45 opacity-80 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-1 bg-gradient-to-r from-cyan-400 to-transparent rounded-full transform rotate-45 opacity-80 animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-16 transition-all duration-700 ${animatePromise ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              Our <span className="text-purple-400">Promise:</span> Driving Innovation with Purpose
              </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Transforming businesses through cutting-edge technology solutions and unwavering commitment to excellence
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              {/* Promise Cards */}
              <div className="space-y-6">
                                 <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 ${animatePromise ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: animatePromise ? '100ms' : '0ms' }}>
                   <div className="flex items-start space-x-4">
                     <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                       <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                       </svg>
                  </div>
                     <p className="text-white text-lg leading-relaxed">
                       At APPIT, we are committed to turning our clients' strategies into impactful digital solutions. Our expert team of engineers and professionals dives deep into your business needs to craft tailored, high-performance solutions that drive growth and efficiency.
                     </p>
              </div>
            </div>

                 <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 ${animatePromise ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: animatePromise ? '200ms' : '0ms' }}>
                   <div className="flex items-start space-x-4">
                     <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                       <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                     <p className="text-white text-lg leading-relaxed">
                       By closely collaborating with our clients, we ensure that every project meets real business goals — from optimizing infrastructure and databases to integrating seamlessly with third-party tools.
                     </p>
                   </div>
                </div>

                 <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 ${animatePromise ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: animatePromise ? '300ms' : '0ms' }}>
                   <div className="flex items-start space-x-4">
                     <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                       <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                       </svg>
                     </div>
                     <p className="text-white text-lg leading-relaxed">
                       We stay ahead of the curve by continuously evolving with the latest trends in IT, cloud, AI, and automation. This allows us to deliver agile, scalable, and future-ready solutions that go beyond expectations.
                     </p>
                   </div>
                 </div>

                 <div className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-500 transform hover:scale-105 ${animatePromise ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`} style={{ transitionDelay: animatePromise ? '400ms' : '0ms' }}>
                   <div className="flex items-start space-x-4">
                     <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                       <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                       </svg>
                     </div>
                     <p className="text-white text-lg leading-relaxed">
                       From development and deployment to maintenance and support, APPIT takes full ownership of the project lifecycle — ensuring a seamless experience across platforms with the right blend of technology and industry expertise to power your business forward.
                     </p>
                   </div>
                 </div>
              </div>
            </div>

            {/* Right Video */}
            <div className={`flex justify-center transition-all duration-700 ${animatePromise ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ transitionDelay: animatePromise ? '500ms' : '0ms' }}>
              <div className="relative group">
                <div className="w-full max-w-md h-[500px] bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm relative">
                  {/* Video Content */}
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    className="w-full h-full object-cover rounded-3xl"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  >
                    <source src="/images/about-images/techonoly loop.mp4" type="video/mp4" />
                  </video>
                  
                  {/* Fallback Content */}
                  <div className="absolute inset-0 flex items-center justify-center text-white" style={{ display: 'none' }}>
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M8 5v10l8-5z"/>
                        </svg>
                </div>
                      <h3 className="text-2xl font-bold mb-2">Technology in Motion</h3>
                      <p className="text-white/80">Innovation & Excellence</p>
              </div>
            </div>

                  {/* Overlay Effect */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent rounded-3xl"></div>
                  
                  {/* Floating Elements */}
                  <div className="absolute top-4 right-4 w-3 h-3 bg-purple-500 rounded-full animate-ping"></div>
                  <div className="absolute bottom-6 left-6 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                  <div className="absolute top-1/3 left-4 w-4 h-4 bg-purple-400 rounded-full animate-bounce opacity-60"></div>
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-3xl blur-xl scale-110 opacity-50 group-hover:opacity-75 transition-opacity duration-500"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="py-16 sm:py-20 lg:py-32 px-4 bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-1 bg-purple-500 rounded-full transform rotate-12 opacity-60"></div>
        <div className="absolute top-32 right-20 w-24 h-1 bg-blue-500 rounded-full transform -rotate-45 opacity-60"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-1 bg-purple-500 rounded-full transform rotate-45 opacity-60"></div>
        <div className="absolute bottom-32 right-10 w-28 h-1 bg-blue-500 rounded-full transform -rotate-12 opacity-60"></div>

        <div className="max-w-7xl mx-auto space-y-16">
          {leaders.map((leader, index) => (
            <LeadershipCard key={index} leader={leader} index={index} />
          ))}
        </div>
      </div>

      {/* Team Section */}
      <Box ref={teamRef} sx={{ py: 10, px: 4, background: "#f8fbff" }}>
        <Box sx={{ maxWidth: 1200, mx: "auto" }}>
          {/* Section Header */}
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2rem", md: "2.5rem" },
                color: "#333",
                mb: 2,
              }}
            >
              Meet Our <GradientText>Expert</GradientText> Team
            </Typography>
            <Typography
              sx={{
                fontSize: 18,
                color: "#666",
                maxWidth: 600,
                mx: "auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <AutoAwesomeIcon sx={{ color: "#7b2ff2" }} />
              Talented professionals dedicated to your career success
            </Typography>
          </Box>

          {/* Team Grid */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {teamMembers.map((member, index) => (
              <TeamMemberCard key={index} member={member} index={index} />
            ))}
          </Box>
        </Box>
      </Box>

      {/* Testimonials Section */}
      <div className="py-16 sm:py-20 lg:py-32 px-4 bg-gray-900 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-32 h-1 bg-purple-500 rounded-full transform rotate-12 opacity-60"></div>
        <div className="absolute top-32 right-20 w-24 h-1 bg-blue-500 rounded-full transform -rotate-45 opacity-60"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-1 bg-purple-500 rounded-full transform rotate-45 opacity-60"></div>
        <div className="absolute bottom-32 right-10 w-28 h-1 bg-blue-500 rounded-full transform -rotate-12 opacity-60"></div>

        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 lg:mb-16 animate-fade-in-up">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              What <span className="text-purple-400">Clients</span> Say About Us
            </h2>
            <p className="text-lg sm:text-xl text-gray-300">Testimonial</p>
          </div>

          {/* Main Testimonial */}
          <div className="relative">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Side - Testimonial Content */}
              <div className="space-y-6 lg:space-y-8 order-2 lg:order-1">
                {/* Large Quote Icon */}
                <div className="text-gray-600">
                  <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z"/>
                  </svg>
                </div>
                
                {/* Testimonial Text */}
                <blockquote className="text-lg sm:text-xl lg:text-2xl xl:text-3xl text-white leading-relaxed font-normal">
                  "APPIT was able to add value to my existing business with intelligent technology solutions. We were able to scale our service offerings and differentiate our business from the competition. We're very pleased with the result."
                </blockquote>
                
                {/* Client Info */}
                <div className="space-y-2">
                  <h4 className="text-xl sm:text-2xl font-bold text-purple-400">Nithin</h4>
                  <p className="text-base sm:text-lg text-gray-300">Director, Amar Solutions</p>
                </div>
              </div>

              {/* Right Side - Client Image */}
              <div className="flex justify-center order-1 lg:order-2">
                <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg xl:w-80 h-64 sm:h-80 lg:h-96 bg-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                  <img 
                    src="/images/about-images/client.png" 
                    alt="Nithin - Director, Amar Solutions"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                  <div className="w-full h-full flex items-center justify-center text-gray-400" style={{ display: 'none' }}>
                    <div className="text-center px-4">
                      <svg className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                      <p className="text-base sm:text-lg font-medium mb-2">Client Photo</p>
                      <p className="text-sm opacity-75">Replace with actual image</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows - Responsive positioning */}
            <div className="flex justify-center lg:justify-start gap-4 mt-8 lg:mt-12">
              <button className="w-10 h-10 sm:w-12 sm:h-12 bg-transparent border-2 border-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:border-purple-500 hover:text-purple-500 transition-colors duration-300">
                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button className="w-10 h-10 sm:w-12 sm:h-12 bg-transparent border-2 border-gray-600 rounded-full flex items-center justify-center text-gray-400 hover:border-purple-500 hover:text-purple-500 transition-colors duration-300">
                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Global Info Section */}
      {/* <GlobalInfoSection /> */}

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-8px) rotate(180deg); }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out 0.2s both;
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out 0.4s both;
        }
        
        @media (max-width: 640px) {
          .text-6xl { font-size: 3rem; }
          .text-7xl { font-size: 3.5rem; }
          .text-8xl { font-size: 4rem; }
          .text-9xl { font-size: 4.5rem; }
        }
      `}</style>
    </div>
    </>
  )
}

export default AboutUs
