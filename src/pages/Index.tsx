
import Hero from "@/components/Hero";
import FeatureSection from "@/components/FeatureSection";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ArrowRight } from "lucide-react";
import { useAuth } from "@/components/auth/AuthContext";
import { Link } from "react-router-dom";

const Index = () => {
  const { user } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <FeatureSection />
        
        <section className="py-20 bg-muted/30 dark:bg-muted/10">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Discover Your Ancestral Heritage?
              </h2>
              <p className="text-lg text-foreground/70 mb-8">
                Upload photos of three generations and let our AI reveal the faces of your ancestors.
              </p>
              <Link 
                to={user ? "/get-started" : "/signup"}
                className="inline-flex items-center justify-center bg-primary hover:bg-primary/90 text-primary-foreground font-medium px-8 py-3 rounded-full transition-colors group"
              >
                {user ? "Start Your Journey" : "Create Account & Start"}
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
