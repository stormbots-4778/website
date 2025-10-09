import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ScrollingLogos } from "@/components/ScrollingLogos";
import { About } from "@/components/About";
import { Accomplishments } from "@/components/Accomplishments";
import { MeetingCalendar } from "@/components/MeetingCalendar";
import { CompetitionSchedule } from "@/components/CompetitionSchedule";
import { Outreach } from "@/components/Outreach";
import { Sponsors } from "@/components/Sponsors";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-16">
        <Hero />
        <ScrollingLogos />
        <About />
        <Accomplishments />
        <MeetingCalendar />
        <CompetitionSchedule />
        <Outreach />
        <Sponsors />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
