"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import { ExternalLink, Github } from "lucide-react"

const projects = [
  {
    title: "Full Stack Bike Rental System",
    description:
      "A comprehensive bike rental platform with real-time availability tracking, booking management, and payment processing. Features admin dashboard for fleet management.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/Erazul-Islam/bike-rental-service",
    demo: "https://auto-bike-two.vercel.app",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    title: "Pet Care Community Platform",
    description:
      "Social platform connecting pet owners with veterinarians and pet care services. Includes appointment scheduling, community forums, and pet health tracking.",
    tags: ["Next.js", "Tailwind CSS", "PostgreSQL"],
    github: "https://github.com/Erazul-Islam/Pet-Care-FrontEnd",
    demo: "https://petcareclient-phi.vercel.app",
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    title: "Personal Finance Dashboard",
    description:
      "Interactive dashboard for tracking expenses, budgeting, and visualizing financial data with charts and analytics. Helps users make informed financial decisions.",
    tags: ["Next.js", "Chart.js", "MongoDB"],
    github: "https://github.com/Erazul-Islam/meely",
    demo: "https://meely-alpha.vercel.app",
    gradient: "from-violet-500/20 to-purple-500/20",
  },
  {
    title: "Egtos",
    description:
      "Egtos is a web application that allows users to create and manage surveys, collect responses, and analyze data. It provides a user-friendly interface for survey creation and response tracking.",
    tags: ["Next.js", "Chart.js", "MongoDB"],
    github: "https://github.com/Erazul-Islam/egtos",
    demo: "https://egtos.vercel.app",
    gradient: "from-violet-500/20 to-purple-500/20",
  },

   {
    title: "Full Stack Bike Rental System",
    description:
      "A comprehensive bike rental platform with real-time availability tracking, booking management, and payment processing. Features admin dashboard for fleet management.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/Erazul-Islam/bike-rental-service",
    demo: "https://auto-bike-two.vercel.app",
    gradient: "from-cyan-500/20 to-blue-500/20",
  },

  {
    title: "Insted",
    description:
      "Insted a platform that allows users to donate to poor people",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/Erazul-Islam/insted",
    demo: "https://insted-virid.vercel.app",
    gradient: "from-orange-500/20 to-red-500/20",
  },
]

export function ProjectsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="projects" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">Projects</h2>

          <div className="grid sm:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Card className="h-full hover:shadow-2xl transition-all duration-300 border-2 overflow-hidden relative">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                  />
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-xl">{project.title}</CardTitle>
                    <CardDescription className="text-pretty">{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-accent/10 text-accent text-xs font-medium rounded-md border border-accent/20"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                        className="group-hover:border-accent transition-colors bg-transparent"
                      >
                        <a href={project.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                      <Button size="sm" asChild className="shadow-md hover:shadow-lg transition-shadow">
                        <a href={project.demo} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Demo
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
