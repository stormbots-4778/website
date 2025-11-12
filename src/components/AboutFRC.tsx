import { ExternalLink, Code, Wrench, Users, Target, Calendar } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export const AboutFRC = () => {
  const skills = [
    { icon: Wrench, title: "Wiring, Programming, Fabrication", description: "Hands-on technical skills" },
    { icon: Code, title: "Engineering & Design Principles", description: "Learn from real-world challenges" },
    { icon: Users, title: "Teamwork & Leadership", description: "Collaborate effectively" },
    { icon: Target, title: "Time Management & Marketing", description: "Essential professional skills" },
  ];

  const resources = [
    {
      category: "From FIRST",
      links: [
        { name: "Official FRC Website", url: "https://www.firstinspires.org/" },
        { name: "Competition Manual & QA", url: "https://www.firstinspires.org/resource-library/frc/competition-manual-qa-system" },
      ],
    },
    {
      category: "From Stormbots Robotics",
      links: [
        { name: "GitHub Site", url: "#" },
        { name: "Templates", url: "#" },
        { name: "Autodesk Fusion360 (CAD)", url: "#" },
        { name: "Autodesk Synthesis (Virtual Testing)", url: "#" },
      ],
    },
  ];

  return (
    <section id="about-frc" className="py-24 bg-card/30 relative">
      <div className="absolute inset-0 blueprint-grid opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4">
            <span className="text-primary">&gt;</span> About FRC
          </h2>
          <div className="w-24 h-1 bg-primary" />
          <div className="mt-4 flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              <span className="font-mono text-sm">Grades 9-12</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span className="font-mono text-sm">Competition Season: January to April</span>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-12">
          {/* Main Description */}
          <div className="text-center space-y-6">
            <h3 className="text-2xl font-bold mb-4">What is FIRST Robotics Competition?</h3>
            <p className="text-lg text-muted-foreground leading-relaxed">
              FIRST Robotics Competition (FRC) participants work as a team to create large robots that compete 
              in unique yearly challenges. During the build season of the competition, students learn about 
              important engineering and design principles. In addition, team members can learn specific skills, 
              such as wiring, programming, fabrication, and assembly.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Students participating in FRC also improve their teamwork, time management, leadership, marketing, 
              and fundraising skills. This is why it's no surprise that high school students call FIRST Robotics 
              Competition <span className="font-bold text-primary">"the hardest fun you'll ever have."</span>
            </p>
          </div>

          {/* This Year's Game */}
          <Card className="p-8 bg-background border-primary/30">
            <div className="text-center">
              <h3 className="text-2xl font-mono font-bold mb-2 text-primary">This Year's Game</h3>
              <p className="text-4xl font-bold mb-4">REEFSCAPE</p>
              <p className="text-muted-foreground">
                The 2025 FIRST Robotics Competition game challenges teams to build robots that compete in 
                exciting underwater-themed challenges.
              </p>
            </div>
          </Card>

          {/* Skills Grid */}
          <div>
            <h3 className="text-2xl font-mono font-bold mb-6 text-center">Skills You'll Learn</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {skills.map((skill, index) => (
                <Card
                  key={index}
                  className="p-6 bg-background border-border hover:border-primary/30 transition-colors duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <skill.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-2">{skill.title}</h4>
                      <p className="text-sm text-muted-foreground">{skill.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-2xl font-mono font-bold mb-6 text-center">Resources</h3>
            <div className="grid md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="p-6 bg-background border-border">
                  <h4 className="font-mono font-bold mb-4 text-primary">{resource.category}</h4>
                  <ul className="space-y-2">
                    {resource.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-mono text-sm"
                        >
                          <span className="text-primary mr-2">&gt;</span>
                          {link.name}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>

          {/* Official FRC Link */}
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
            >
              <a
                href="https://www.firstinspires.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Official FRC Website
                <ExternalLink className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

