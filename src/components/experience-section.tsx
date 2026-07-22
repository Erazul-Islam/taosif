"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Button } from "@/src/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/src/components/ui/dialog"
import { GraduationCap, Briefcase, Award, ExternalLink } from "lucide-react"

export function ExperienceSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [selectedCertificate, setSelectedCertificate] = useState<{
    title: string
    description: string
    image: string
  } | null>(null)

  const certificates = [
    {
      title: "Programming Certificate",
      description: "Comprehensive training in software development and programming fundamentals",
      image: "/programming-hero.png",
    },
    {
      title: "QuickBooks Proficiency",
      description: "Comprehensive training in accounting software and financial management",
      image: "/quickbooks.png",
    },
    {
      title: "Xero Accounting Software Training",
      description: "Advanced cloud-based accounting and bookkeeping",
      image: "/xero-logo.png",
    },
  ]

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
                      {certificates.map((certificate, index) => {
                        const isAccentCard = index % 2 === 0

                        return (
                          <div
                            key={certificate.title}
                            className={`flex items-start justify-between gap-4 p-4 rounded-lg border ${
                              isAccentCard
                                ? "bg-gradient-to-br from-accent/5 to-primary/5 border-accent/20"
                                : "bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20"
                            }`}
                          >
                            <div className="flex-1">
                              <h4 className="font-semibold text-foreground mb-1">{certificate.title}</h4>
                              <p className="text-sm text-muted-foreground">{certificate.description}</p>
                            </div>
                            <Dialog
                              open={selectedCertificate?.title === certificate.title}
                              onOpenChange={(open) => {
                                if (!open) setSelectedCertificate(null)
                              }}
                            >
                              <DialogTrigger asChild>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="shrink-0 bg-transparent"
                                  onClick={() => setSelectedCertificate(certificate)}
                                >
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-3xl p-0 overflow-hidden">
                                <div className="p-4 sm:p-6">
                                  <DialogHeader className="mb-4">
                                    <DialogTitle>{selectedCertificate?.title}</DialogTitle>
                                    <DialogDescription>{selectedCertificate?.description}</DialogDescription>
                                  </DialogHeader>
                                  <div className="rounded-lg border bg-muted/20 p-2">
                                    {selectedCertificate && (
                                      <img
                                        src={selectedCertificate.image}
                                        alt={selectedCertificate.title}
                                        className="w-full h-auto max-h-[70vh] object-contain rounded-md"
                                      />
                                    )}
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        )
                      })}
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
