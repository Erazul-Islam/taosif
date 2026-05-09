import { Navigation } from "@/src/components/navigation"
import { HeroSection } from "@/src/components/hero-section"
import { AboutSection } from "@/src/components/about-section"
import { SkillsSection } from "@/src/components/skills-section"
import { ProjectsSection } from "@/src/components/projects-section"
import { ExperienceSection } from "@/src/components/experience-section"
import { ContactSection } from "@/src/components/contact-section"
import { Footer } from "@/src/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
