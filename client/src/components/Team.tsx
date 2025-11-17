import { useQuery } from "@tanstack/react-query";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { TeamMember } from "@shared/schema";

async function fetchTeamMembers() {
  const response = await fetch('/api/team-members');
  if (!response.ok) {
    throw new Error('Failed to fetch team members');
  }
  return response.json();
}

function getInitials(name: string) {
  return name
    .split(' ')
    .map(part => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export default function Team() {
  const { data: teamMembers = [], isLoading } = useQuery<TeamMember[]>({
    queryKey: ['teamMembers'],
    queryFn: fetchTeamMembers,
  });

  const sortedMembers = [...teamMembers].sort((a, b) => a.order - b.order);

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

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading team members...</p>
          </div>
        ) : sortedMembers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No team members to display.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedMembers.map((member) => (
              <Card
                key={member.id}
                className="p-6 hover-elevate active-elevate-2"
                data-testid={`card-team-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
              >
                <div className="flex flex-col items-center text-center">
                  <Avatar className="w-24 h-24 mb-4 border-4 border-accent/20">
                    {member.image && <AvatarImage src={member.image} alt={member.name} />}
                    <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                  </Avatar>
                  <h4 className="text-lg font-semibold mb-1">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                  {member.bio && (
                    <p className="text-xs text-muted-foreground mt-2 line-clamp-3">{member.bio}</p>
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
