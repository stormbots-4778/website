
export const About = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4">
            <span className="text-primary">&gt;</span> About
          </h2>
          <div className="w-24 h-1 bg-primary" />
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <p className="text-lg text-muted-foreground leading-relaxed">
            We're FRC Team 4778 Stormbots, a high school robotics team based in Chanhassen, Minnesota. 
            We participate in the FIRST Robotics Competition (FRC), a global program that challenges students 
            to design, build, and program robots to compete in various games.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our team combines programming, mechanical engineering, and problem-solving to build 
            competition-ready robots each season. By participating in the Stormbots, students have 
            the opportunity to develop skills in engineering, programming, teamwork, and problem-solving, 
            all while engaging in a competitive and collaborative environment.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Beyond competition, we engage with our community through outreach programs, workshops, 
            and mentoring. We focus on practical solutions, rigorous testing, and learning from 
            every challenge we face.
          </p>
        </div>
      </div>
    </section>
  );
};
