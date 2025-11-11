import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users } from "lucide-react";
import codingWorkshop from "@assets/generated_images/Coding_workshop_event_photo_7009c1be.png";
import hackathon from "@assets/generated_images/Hackathon_event_photo_7f37422b.png";
import techSeminar from "@assets/generated_images/Tech_seminar_event_photo_aeb8bc06.png";
import aiWorkshop from "@assets/generated_images/AI_workshop_upcoming_event_6d681b05.png";

//todo: remove mock functionality
const pastEvents = [
  {
    id: 1,
    title: "Web Development Workshop",
    date: "October 15, 2024",
    image: codingWorkshop,
    description: "Hands-on workshop covering modern web development with React and Node.js",
    attendees: 120,
  },
  {
    id: 2,
    title: "Tech Taakra Hackathon 2024",
    date: "September 20-22, 2024",
    image: hackathon,
    description: "48-hour coding marathon where teams built innovative solutions",
    attendees: 85,
  },
  {
    id: 3,
    title: "AI & Machine Learning Seminar",
    date: "August 10, 2024",
    image: techSeminar,
    description: "Expert talk on the latest trends in artificial intelligence",
    attendees: 200,
  },
];

const upcomingEvents = [
  {
    id: 1,
    title: "Introduction to AI & ML",
    date: "December 15, 2024",
    location: "Main Auditorium",
    image: aiWorkshop,
    description: "Learn the fundamentals of artificial intelligence and machine learning",
    spots: 150,
  },
];

export default function Events() {
  const [showRegistration, setShowRegistration] = useState(false);

  return (
    <section className="py-20" id="events">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-events-title">
            Our Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From workshops to hackathons, we organize events that inspire learning and innovation
          </p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
            <TabsTrigger value="upcoming" data-testid="tab-upcoming-events">
              Upcoming Events
            </TabsTrigger>
            <TabsTrigger value="past" data-testid="tab-past-events">
              Past Events
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {upcomingEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover-elevate active-elevate-2" data-testid={`card-event-${event.id}`}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <MapPin className="h-4 w-4" />
                      <span>{event.location}</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Users className="h-4 w-4" />
                      <span>{event.spots} spots available</span>
                    </div>
                    <Button
                      className="w-full"
                      onClick={() => setShowRegistration(true)}
                      data-testid={`button-register-${event.id}`}
                    >
                      Register Now
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="past" className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.map((event) => (
                <Card key={event.id} className="overflow-hidden hover-elevate active-elevate-2" data-testid={`card-past-event-${event.id}`}>
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{event.date}</span>
                    </div>
                    <p className="text-muted-foreground mb-4">{event.description}</p>
                    <div className="flex items-center gap-2 text-sm text-accent-foreground bg-accent/10 px-3 py-1 rounded-md">
                      <Users className="h-4 w-4" />
                      <span>{event.attendees} attendees</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {showRegistration && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <Card className="max-w-md w-full p-6">
              <h3 className="text-2xl font-semibold mb-4">Event Registration</h3>
              <p className="text-muted-foreground mb-4">
                Registration form coming soon! For now, please contact us at css@gcu.edu.pk
              </p>
              <Button
                onClick={() => setShowRegistration(false)}
                className="w-full"
                data-testid="button-close-registration"
              >
                Close
              </Button>
            </Card>
          </div>
        )}
      </div>
    </section>
  );
}
