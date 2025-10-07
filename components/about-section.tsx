"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"

export function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-8">About Me</h2>
          <Card className="border-2 shadow-lg">
            <CardContent className="pt-6">
              <div className="space-y-6 text-base sm:text-lg text-muted-foreground leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-pretty"
                >
                  I'm a motivated student at{" "}
                  <span className="text-foreground font-medium">Jahangirnagar University</span>, pursuing a degree in
                  Accounting and Information Systems. My academic journey has given me a unique perspective on how
                  technology can transform business processes and financial systems.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-pretty"
                >
                  Beyond the classroom, I'm deeply passionate about{" "}
                  <span className="text-foreground font-medium">full-stack development</span>. I love building web
                  applications that solve real-world problems, combining my understanding of business logic with modern
                  programming practices. Whether it's creating intuitive user interfaces or architecting robust backend
                  systems, I'm always eager to learn and grow.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-pretty"
                >
                  I'm also a proud member of{" "}
                  <span className="text-accent font-medium">
                    AISBAC (Accounting Information Systems Business and Analytics Club)
                  </span>
                  , where I collaborate with like-minded peers to explore the intersection of accounting, technology,
                  and data analytics.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="text-pretty"
                >
                  My goal is to bridge the gap between accounting knowledge and software development, creating solutions
                  that are not only technically sound but also aligned with business objectives. I believe that the
                  intersection of these fields holds immense potential for innovation.
                </motion.p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
