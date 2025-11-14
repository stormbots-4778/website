import { Mail, Users, DollarSign, FileText } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

export const Join = () => {
  const steps = [
    {
      icon: FileText,
      title: "Create a FIRST Account",
      description: "Start by creating an account on the FIRST website to register for the program.",
    },
    {
      icon: Users,
      title: "Apply to the Team",
      description: "Submit your application to join FRC Team 4778 Stormbots through the FIRST system.",
    },
    {
      icon: DollarSign,
      title: "Register with Eastern Carver County Schools",
      description: "Complete registration through Eastern Carver County Schools. The registration fee of $225 covers participation in both FIRST Tech Challenge and FIRST Robotics Competition programs.",
    },
    {
      icon: Mail,
      title: "Get in Touch",
      description: "Reach out to us at 4778@chanrobotics.org with any questions or to express your interest in joining the team.",
    },
  ];

  return (
    <section id="join" className="py-24 relative">
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4">
            <span className="text-primary">&gt;</span> Join FRC Stormbots 4778
          </h2>
          <div className="w-24 h-1 bg-primary" />
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl">
            Interested in joining our team? Follow these steps to become a member of FRC Team 4778 Stormbots.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-6 bg-background border-border hover:border-primary/30 transition-colors duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <step.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Card className="p-8 bg-card/50 border-primary/30">
            <h3 className="font-mono font-bold text-2xl mb-4">Ready to Join?</h3>
            <p className="text-muted-foreground mb-6">
              Have questions or want to learn more? Reach out to us via email or join our Discord server 
              to connect with current members and get updates on upcoming meetings and events.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-mono"
                asChild
              >
                <a href="mailto:4778@chanrobotics.org">
                  <Mail className="w-4 h-4 mr-2" />
                  Email Us
                </a>
              </Button>
            </div>
          </Card>

          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Coming to all meetings is encouraged, but not required. 
            How much you participate is completely up to you.
          </p>
        </div>
      </div>
    </section>
  );
};

