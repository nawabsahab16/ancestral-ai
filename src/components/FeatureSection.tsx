
import { cn } from "@/lib/utils";

const features = [
  {
    id: 1,
    title: "Photo Analysis",
    description: "Upload photos of three generations: grandfather, father, and son for our AI to analyze facial features and identify genetic patterns.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-4">
        <rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="2" />
        <circle cx="8.5" cy="8.5" r="1.5" fill="currentColor" />
        <path d="M5 15L8 12L10 14L15 9L19 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 2,
    title: "Machine Learning",
    description: "Our advanced machine learning algorithms identify hereditary traits and facial structures that persist through generations.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-4">
        <path d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" />
        <path d="M2 12H22" stroke="currentColor" strokeWidth="2" />
        <path d="M12 2C14.5013 4.73835 15.9228 8.29203 16 12C15.9228 15.708 14.5013 19.2616 12 22C9.49872 19.2616 8.07725 15.708 8 12C8.07725 8.29203 9.49872 4.73835 12 2Z" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 3,
    title: "Ancestor Prediction",
    description: "Visualize how your ancestors might have looked based on the distinctive facial characteristics passed down through your family.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mb-4">
        <path d="M9 3H5C3.89543 3 3 3.89543 3 5V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 3H19C20.1046 3 21 3.89543 21 5V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 21H5C3.89543 21 3 20.1046 3 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 21H19C20.1046 21 21 20.1046 21 19V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
      </svg>
    ),
  },
];

const FeatureSection = () => {
  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 animate-fade-in">
            How The AI{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Predicts Your Ancestry
            </span>
          </h2>
          <p className="text-lg text-foreground/70 animate-fade-in animate-delay-1">
            Our state-of-the-art technology uses generative AI to trace facial features
            back through your family tree, revealing the faces of ancestors you've never seen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={feature.id}
              className={cn(
                "bg-white p-8 rounded-2xl shadow-sm border border-border",
                "hover:shadow-md transition-all duration-300",
                "animate-fade-in",
                index === 0 ? "animate-delay-2" : index === 1 ? "animate-delay-3" : "animate-delay-4"
              )}
            >
              <div className="text-primary">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-foreground/70">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-6 animate-fade-in">
            The Science Behind Our Technology
          </h3>
          <p className="text-lg text-foreground/70 mb-6 animate-fade-in animate-delay-1">
            Our algorithm examines thousands of facial data points across generations to identify 
            genetic patterns. By analyzing these patterns, we can extrapolate backwards, 
            reconstructing faces from earlier generations with remarkable accuracy.
          </p>
          <p className="text-lg text-foreground/70 animate-fade-in animate-delay-2">
            Backed by years of research in genetic phenotyping and computer vision, 
            our technology bridges the gap between present and past.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
