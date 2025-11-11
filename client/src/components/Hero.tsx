import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@assets/generated_images/GCU_Lahore_campus_hero_cf930b50.png";

export default function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 md:mb-6" data-testid="text-hero-title">
          Computer Science Society
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-3 md:mb-4">
          Government College University Lahore
        </p>
        <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 md:mb-8 max-w-2xl mx-auto px-4">
          Join us in exploring innovation, technology, and the future of computer science
        </p>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center px-4">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground border border-primary-border w-full sm:w-auto"
            onClick={() => scrollToSection("#events")}
            data-testid="button-explore-events"
          >
            Explore Events
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="bg-white/10 hover:bg-white/20 text-white border-white/30 backdrop-blur-sm w-full sm:w-auto"
            onClick={() => scrollToSection("#team")}
            data-testid="button-meet-team"
          >
            Meet the Team
          </Button>
        </div>
      </div>
    </section>
  );
}
