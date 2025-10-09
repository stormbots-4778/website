import { Github, Mail, Instagram, Terminal } from "lucide-react";
export const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-card border-t border-border relative">
      <div className="absolute inset-0 blueprint-grid opacity-5" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-6 h-6 text-primary" />
              <span className="font-mono font-bold text-xl">STORMBOTS</span>
            </div>
            <p className="text-muted-foreground mb-4">
              FRC Team 4778 - Building robots, breaking limits.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="GitHub">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Email">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-mono font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {["About", "Accomplishments", "Meetings", "Schedule", "Outreach", "Sponsors"].map(item => <li key={item}>
                    <a href={`#${item.toLowerCase()}`} className="text-muted-foreground hover:text-primary transition-colors font-mono text-sm">
                      <span className="text-primary mr-2">&gt;</span>
                      {item}
                    </a>
                  </li>)}
            </ul>
          </div>

          <div>
            <h3 className="font-mono font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li className="font-mono text-sm">team@stormbots4778.org</li>
              <li className="text-sm">Meeting Location TBD</li>
              <li className="text-sm">Build Season: Sept - April</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm font-mono">
            © {currentYear} FRC Team 4778 Stormbots
          </p>
          <p className="text-muted-foreground text-sm flex items-center gap-1">
            <span className="text-primary text-xl font-mono relative">
              &gt;
              
            </span>
            Made with <span className="text-red-500">❤️</span> from Chanhassen, MN
          </p>
        </div>
      </div>
    </footer>;
};