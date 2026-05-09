"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Code2, Server, Database, Languages, GraduationCap } from "lucide-react"

const frontendSkills = [
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
  {
    name: "Tailwind CSS",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
  },
  { name: "HTML5", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
  { name: "CSS3", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
]

const backendSkills = [
  { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  { name: "NestJS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nestjs/nestjs-original.svg" },
  { name: "REST API", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { name: "AI Integration", logo: "/ai-brain-icon.png" },
]

const databaseSkills = [
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
]

const languageSkills = [
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
]

const academicSkills = [
  { name: "Accounting", logo: "/accounting-calculator-icon.jpg" },
  { name: "Financial Analysis", logo: "/financial-chart-icon.png" },
  { name: "QuickBooks", logo: "/generic-accounting-software-logo.png" },
  { name: "Xero", logo: "/xero-logo.png" },
  { name: "Business Analytics", logo: "/analytics-graph-icon.jpg" },
]

export function SkillsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="skills"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/20 to-background"
    >
      <div className="container mx-auto max-w-6xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">Skills</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="border-2 shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-gradient-to-br from-accent to-primary rounded-lg">
                      <Code2 className="h-5 w-5 text-white" />
                    </div>
                    Frontend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {frontendSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                        whileHover={{ scale: 1.05, x: 5 }}
                        className="flex items-center gap-3 px-3 py-2 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg border border-accent/20 hover:border-accent/40 transition-all cursor-default"
                      >
                        <img src={skill.logo || "/placeholder.svg"} alt={skill.name} className="h-6 w-6" />
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-2 shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
                      <Server className="h-5 w-5 text-white" />
                    </div>
                    Backend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {backendSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: 0.25 + index * 0.05 }}
                        whileHover={{ scale: 1.05, x: 5 }}
                        className="flex items-center gap-3 px-3 py-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20 hover:border-primary/40 transition-all cursor-default"
                      >
                        <img src={skill.logo || "/placeholder.svg"} alt={skill.name} className="h-6 w-6" />
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="border-2 shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-gradient-to-br from-accent to-primary rounded-lg">
                      <Database className="h-5 w-5 text-white" />
                    </div>
                    Database
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {databaseSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                        whileHover={{ scale: 1.05, x: 5 }}
                        className="flex items-center gap-3 px-3 py-2 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg border border-accent/20 hover:border-accent/40 transition-all cursor-default"
                      >
                        <img src={skill.logo || "/placeholder.svg"} alt={skill.name} className="h-6 w-6" />
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="border-2 shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg">
                      <Languages className="h-5 w-5 text-white" />
                    </div>
                    Language
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {languageSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: 0.35 + index * 0.05 }}
                        whileHover={{ scale: 1.05, x: 5 }}
                        className="flex items-center gap-3 px-3 py-2 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/20 hover:border-primary/40 transition-all cursor-default"
                      >
                        <img src={skill.logo || "/placeholder.svg"} alt={skill.name} className="h-6 w-6" />
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="md:col-span-2 lg:col-span-1"
            >
              <Card className="border-2 shadow-lg h-full">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="p-2 bg-gradient-to-br from-accent to-primary rounded-lg">
                      <GraduationCap className="h-5 w-5 text-white" />
                    </div>
                    Academic Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col gap-3">
                    {academicSkills.map((skill, index) => (
                      <motion.div
                        key={skill.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
                        whileHover={{ scale: 1.05, x: 5 }}
                        className="flex items-center gap-3 px-3 py-2 bg-gradient-to-br from-accent/10 to-primary/10 rounded-lg border border-accent/20 hover:border-accent/40 transition-all cursor-default"
                      >
                        <img src={skill.logo || "/placeholder.svg"} alt={skill.name} className="h-6 w-6" />
                        <span className="text-sm font-medium text-foreground">{skill.name}</span>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
