import { Calendar, Clock } from "lucide-react";
import { Card } from "./ui/card";

export const MeetingCalendar = () => {
  // This will be replaced with actual API data later
  const today = new Date();
  const days = [];

  // Get yesterday, today, and next 5 days
  for (let i = -1; i <= 5; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    days.push(date);
  }

  // Mock meeting data - will be replaced with API
  const meetings = [
    { day: 0, time: "3:30 PM - 6:00 PM", type: "Build Session" },
    { day: 2, time: "3:30 PM - 6:00 PM", type: "Build Session" },
    { day: 4, time: "3:30 PM - 6:00 PM", type: "Programming" },
  ];

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const hasMeeting = (index: number) => {
    return meetings.some(m => m.day === index - 1);
  };

  const getMeeting = (index: number) => {
    return meetings.find(m => m.day === index - 1);
  };

  return (
    <section id="meetings" className="py-24 relative">
      <div className="absolute inset-0 blueprint-grid opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-4xl md:text-5xl font-mono font-bold mb-4">
            <span className="text-primary">&gt;</span> Meeting Schedule
          </h2>
          <div className="w-24 h-1 bg-primary" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-7xl mx-auto">
          {days.map((date, index) => {
            const meeting = getMeeting(index);
            const hasEvent = hasMeeting(index);
            const isCurrentDay = isToday(date);

            return (
              <Card
                key={index}
                className={`p-4 transition-all duration-300 min-h-[180px] flex flex-col ${
                  isCurrentDay
                    ? "bg-primary/10 border-primary"
                    : hasEvent
                    ? "bg-card border-primary/50 hover:border-primary"
                    : "bg-card/50 border-border hover:border-border/80"
                }`}
              >
                <div className="text-center mb-4">
                  <div className="font-mono text-xs text-muted-foreground mb-2">
                    {date.toLocaleDateString("en-US", { weekday: "short" })}
                  </div>
                  <div className={`text-3xl font-bold font-mono ${isCurrentDay ? "text-primary" : ""}`}>
                    {date.getDate()}
                  </div>
                  <div className="font-mono text-xs text-muted-foreground mt-1">
                    {date.toLocaleDateString("en-US", { month: "short" })}
                  </div>
                </div>

                {hasEvent && meeting && (
                  <div className="border-t border-border pt-3 mt-auto">
                    <div className="text-[10px] text-primary mb-2 font-mono leading-tight">
                      {meeting.time}
                    </div>
                    <div className="text-xs font-medium">{meeting.type}</div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
