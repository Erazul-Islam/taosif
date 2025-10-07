"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GraduationCap, Briefcase, Award, ExternalLink } from "lucide-react"

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section
      id="experience"
      className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background via-muted/20 to-background"
    >
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-12 text-center">
            Experience & Education
          </h2>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-accent hidden md:block" />

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative"
              >
                <Card className="border-2 shadow-lg md:ml-20">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-accent to-primary rounded-xl shadow-md">
                        <GraduationCap className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle>BBA in Accounting & Information Systems</CardTitle>
                        <CardDescription className="mt-1">Jahangirnagar University • Ongoing</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-pretty">
                      Pursuing a comprehensive education in accounting principles, information systems, and business
                      analytics. Developing expertise in financial reporting, auditing, and the integration of
                      technology in business processes.
                    </p>
                  </CardContent>
                </Card>
                {/* Timeline dot */}
                <div className="absolute left-[-3.5rem] top-8 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-lg hidden md:block" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative"
              >
                <Card className="border-2 shadow-lg md:ml-20">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl shadow-md">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle>Full Stack Developer</CardTitle>
                        <CardDescription className="mt-1">Norway-based Company • Remote</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-pretty">
                      Developing and maintaining full-stack web applications using modern technologies including React,
                      Next.js, Node.js, and MongoDB. Collaborating with international teams to deliver scalable
                      solutions and implementing best practices in code quality and user experience.
                    </p>
                  </CardContent>
                </Card>
                {/* Timeline dot */}
                <div className="absolute left-[-3.5rem] top-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg hidden md:block" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="relative"
              >
                <Card className="border-2 shadow-lg md:ml-20">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-primary to-accent rounded-xl shadow-md">
                        <Briefcase className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle>Freelance Full Stack Developer</CardTitle>
                        <CardDescription className="mt-1">
                          Personal Development Projects • 2022 - Present
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed text-pretty">
                      Building modern web applications using React, Next.js, and Node.js. Experienced in developing
                      full-stack solutions from concept to deployment, with a focus on clean code, user experience, and
                      scalable architecture.
                    </p>
                  </CardContent>
                </Card>
                {/* Timeline dot */}
                <div className="absolute left-[-3.5rem] top-8 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg hidden md:block" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="relative"
              >
                <Card className="border-2 shadow-lg md:ml-20">
                  <CardHeader>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-accent to-primary rounded-xl shadow-md">
                        <Award className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <CardTitle>Certifications</CardTitle>
                        <CardDescription className="mt-1">Professional Development</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start justify-between gap-4 p-4 bg-gradient-to-br from-accent/5 to-primary/5 rounded-lg border border-accent/20">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">Programming Certificate</h4>
                          <p className="text-sm text-muted-foreground">
                            Comprehensive training in software development and programming fundamentals
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="shrink-0 bg-transparent">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>

                      <div className="flex items-start justify-between gap-4 p-4 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/20">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">QuickBooks Proficiency</h4>
                          <p className="text-sm text-muted-foreground">
                            Comprehensive training in accounting software and financial management
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="shrink-0 bg-transparent">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>

                      <div className="flex items-start justify-between gap-4 p-4 bg-gradient-to-br from-accent/5 to-primary/5 rounded-lg border border-accent/20">
                        <div className="flex-1">
                          <h4 className="font-semibold text-foreground mb-1">Xero Accounting Software Training</h4>
                          <p className="text-sm text-muted-foreground">
                            Advanced cloud-based accounting and bookkeeping
                          </p>
                        </div>
                        <Button variant="outline" size="sm" className="shrink-0 bg-transparent">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                {/* Timeline dot */}
                <div className="absolute left-[-3.5rem] top-8 w-4 h-4 bg-accent rounded-full border-4 border-background shadow-lg hidden md:block" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
