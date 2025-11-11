import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bell, Megaphone, Calendar } from "lucide-react";

//todo: remove mock functionality
const announcements = [
  {
    id: 1,
    title: "Winter Internship Applications Open",
    date: "November 5, 2024",
    type: "Opportunity",
    content: "Applications are now open for winter internships at leading tech companies. Visit the career center for more details.",
    icon: Megaphone,
  },
  {
    id: 2,
    title: "New AI Workshop Series Announced",
    date: "November 3, 2024",
    type: "Event",
    content: "Join our comprehensive AI workshop series starting December. Limited seats available - register now!",
    icon: Calendar,
  },
  {
    id: 3,
    title: "Society Recruitment Drive",
    date: "October 28, 2024",
    type: "Notice",
    content: "Looking for passionate students to join our executive team. Applications close on November 15th.",
    icon: Bell,
  },
  {
    id: 4,
    title: "Tech Taakra Winners Announced",
    date: "October 25, 2024",
    type: "Result",
    content: "Congratulations to all participants! Check out the winning projects on our social media.",
    icon: Megaphone,
  },
];

export default function Announcements() {
  return (
    <section className="py-20" id="announcements">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-announcements-title">
            Announcements
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Stay updated with the latest news, opportunities, and important notices
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {announcements.map((announcement) => (
            <Card
              key={announcement.id}
              className="p-6 hover-elevate active-elevate-2"
              data-testid={`card-announcement-${announcement.id}`}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <announcement.icon className="h-6 w-6 text-accent-foreground" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="text-lg font-semibold">{announcement.title}</h3>
                    <Badge variant="secondary" className="flex-shrink-0">
                      {announcement.type}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{announcement.date}</p>
                  <p className="text-muted-foreground">{announcement.content}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
