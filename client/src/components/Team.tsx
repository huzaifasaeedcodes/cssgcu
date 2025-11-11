import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import presidentImg from "@assets/generated_images/President_headshot_photo_99af9a23.png";
import vpImg from "@assets/generated_images/Vice_President_headshot_photo_d2d0391a.png";
import exec1Img from "@assets/generated_images/Executive_member_headshot_photo_901ecd11.png";
import exec2Img from "@assets/generated_images/Executive_member_headshot_photo_2_5eed908f.png";
import advisorImg from "@assets/generated_images/Faculty_advisor_headshot_photo_8f64d51d.png";

//todo: remove mock functionality
const teamMembers = [
  {
    name: "Ahmed Hassan",
    role: "President",
    image: presidentImg,
    initials: "AH",
  },
  {
    name: "Fatima Khan",
    role: "Vice President",
    image: vpImg,
    initials: "FK",
  },
  {
    name: "Ali Raza",
    role: "General Secretary",
    image: exec1Img,
    initials: "AR",
  },
  {
    name: "Sara Ahmed",
    role: "Event Coordinator",
    image: exec2Img,
    initials: "SA",
  },
];

const advisor = {
  name: "Dr. Muhammad Tariq",
  role: "Faculty Advisor",
  image: advisorImg,
  initials: "MT",
};

export default function Team() {
  return (
    <section className="py-20 bg-card" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4" data-testid="text-team-title">
            Our Team
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Meet the dedicated individuals leading the Computer Science Society
          </p>
        </div>

        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6 text-center">Faculty Advisor</h3>
          <div className="flex justify-center">
            <Card className="p-6 max-w-xs w-full hover-elevate active-elevate-2" data-testid="card-advisor">
              <div className="flex flex-col items-center text-center">
                <Avatar className="w-32 h-32 mb-4 border-4 border-primary/20">
                  <AvatarImage src={advisor.image} alt={advisor.name} />
                  <AvatarFallback className="text-2xl">{advisor.initials}</AvatarFallback>
                </Avatar>
                <h4 className="text-xl font-semibold mb-1">{advisor.name}</h4>
                <p className="text-sm text-muted-foreground">{advisor.role}</p>
              </div>
            </Card>
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-semibold mb-6 text-center">Executive Members</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <Card
                key={index}
                className="p-6 hover-elevate active-elevate-2"
                data-testid={`card-team-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4 border-4 border-accent/20">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                  <h4 className="text-lg font-semibold mb-1">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
