
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthContext";

const Hero = () => {
  const { user } = useAuth();
  
  return (
    <section className="w-full overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block animate-fade-in">
            <span className="inline-block bg-accent/10 text-accent text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Powered by AI
            </span>
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight mb-6 animate-fade-in animate-delay-1">
            <span className="block">Discover Your </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Ancestral Lineage
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-foreground/70 mb-12 max-w-2xl mx-auto animate-fade-in animate-delay-2">
            Our advanced AI analyzes family photos across three generations to predict your ancestral appearance with remarkable accuracy.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in animate-delay-3">
            <Link
              to={user ? "/get-started" : "/signup"}
              className={cn(
                "group bg-primary hover:bg-primary/90 text-primary-foreground font-medium",
                "px-6 py-3 rounded-full flex items-center justify-center",
                "transition-all duration-300 w-full sm:w-auto"
              )}
            >
              {user ? "Get Started" : "Sign Up & Start"}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            <Link
              to="/#features"
              className={cn(
                "border border-border bg-background/50 hover:bg-background/80 text-foreground",
                "px-6 py-3 rounded-full flex items-center justify-center",
                "transition-all duration-300 w-full sm:w-auto"
              )}
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </div>
      
      <div className="w-full h-16 bg-gradient-to-b from-transparent to-background"></div>
    </section>
  );
};

export default Hero;
