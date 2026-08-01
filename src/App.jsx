import {
  ScrollProgress, MouseGlow, AmbientBackground, Navbar, Hero, About,
  Skills, Projects, MoreProjects, Achievements, Leadership, Education, CodingProfiles,
  ResumeBanner, Contact, Footer,
} from './components.jsx'
import {
  skillGroups, projects, moreProjects, achievements, leadership, education, codingProfiles,
} from './data.js'

export default function App() {
  return (
    <div className="relative min-h-screen font-body">
      <AmbientBackground />
      <MouseGlow />
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills groups={skillGroups} />
        <Projects projects={projects} />
        <MoreProjects projects={moreProjects} />
        <Achievements items={achievements} />
        <Leadership items={leadership} />
        <Education items={education} />
        <CodingProfiles profiles={codingProfiles} />
        <ResumeBanner />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
