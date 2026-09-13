import ContributionGraph from "@/components/ContributionGraph";
import ProfileHeader from "@/components/ProfileHeader";
import ProjectsSection from "@/components/ProjectsSection";
import TechStack from "@/components/TechStack";
import ElsewhereSection from "@/components/ElsewhereSection";
import Footer from "@/components/Footer";
import Oneko from "@/components/Oneko";
import LandingMusic from "@/components/LandingMusic";
import ExperienceSection from "@/components/Experience";
import LastPlayed from "@/components/LastPlayed";
import GamingCard from "@/components/GamingCard";
import AboutSection from "@/components/About";
import OpenSourceSection from "@/components/OpenSourceSection";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Oneko />
      <LandingMusic />

      <div className="relative min-h-screen bg-background text-foreground font-sans">

        {/* Left hazard-stripe divider — right edge flush with content container left edge */}
        <div
          className="fixed top-0 bottom-0 w-6 pointer-events-none z-20 hidden md:block"
          style={{
            left: "calc(50% - 21rem - 1.5rem)",
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 4px, var(--border-strong) 4px, var(--border-strong) 5px)",
            opacity: 0.4,
          }}
        />

        {/* Right hazard-stripe divider — left edge flush with content container right edge */}
        <div
          className="fixed top-0 bottom-0 w-6 pointer-events-none z-20 hidden md:block"
          style={{
            left: "calc(50% + 21rem)",
            backgroundImage:
              "repeating-linear-gradient(45deg, transparent, transparent 4px, var(--border-strong) 4px, var(--border-strong) 5px)",
            opacity: 0.4,
          }}
        />

        {/* Main Content */}
        <div className="max-w-2xl mx-auto px-3 sm:px-5 md:px-6 pb-16 relative z-10">

          {/* Mountain Hero Banner */}
          <div className="relative w-full h-28 xs:h-32 sm:h-48 md:h-64 overflow-hidden rounded-b-xl">
            <img
              src="/mountain-bg.jpg"
              alt="Mountain landscape"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/30 to-background" />
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent" />
          </div>

          <ProfileHeader />
          <div id="about" className="mt-4 sm:mt-6 scroll-mt-20">
            <AboutSection />
          </div>

          <div className="mt-6 sm:mt-10">
            <div className="mb-5">
              <p className="text-sm text-dim-foreground">
                Here are my{" "}
                <span className="font-medium text-foreground">socials</span>
              </p>
              <div className="sm:mt-2">
                <ElsewhereSection />
              </div>
            </div>
          </div>

          <div className="mt-6 sm:mt-10">
            <LastPlayed />
          </div>
          <div className="mt-4 sm:mt-6">
            <GamingCard
              artUrl="https://cdn2.unrealengine.com/twd-header-1920x1080-5c1249d4b639.jpg"
              logoUrl="https://www.shutterstock.com/image-vector/silhouette-walking-dead-logo-featuring-600w-2685969589.jpg"
              logoAlt="The Walking Dead"
              title="The Walking Dead"
              href="https://store.epicgames.com/en-US/collection/the-walking-dead"
              isActive={false}
            />
          </div>

          {/* <div className="mt-6 sm:mt-10">
            <SpotifyCard
              title="One Day"
              artist="Kodaline"
              albumImage="https://i.scdn.co/image/ab67616d0000485174b1285d420d4d8494c72df5"
              songUrl="https://open.spotify.com/track/1nqJvzF8URpip2qbg8izYb"
            />
          </div> */}

          {/* <div className="border-t border-border my-6 sm:my-8"></div>
          <div className="mt-6 sm:mt-10">
            <InfoCard />
          </div>
          <div className="border-t border-border my-6 sm:my-8"></div> */}

          <section id="experience" className="mt-10 sm:mt-12 md:mt-14 scroll-mt-20">
            <ExperienceSection />
          </section>

          <div id="projects" className="mt-10 sm:mt-12 md:mt-14 scroll-mt-20">
            <ProjectsSection />
          </div>
          <section id="contributions" className="mt-10 sm:mt-12 md:mt-14 scroll-mt-20">
            <ContributionGraph />
          </section>
          <div className="mt-10 sm:mt-12 md:mt-14">
            <OpenSourceSection />
          </div>

          <div className="mt-10 sm:mt-12 md:mt-14">
            <TechStack />
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
