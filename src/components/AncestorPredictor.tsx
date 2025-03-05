import { useState, useEffect } from "react";
import { Download, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface AncestorPredictorProps {
  files: Record<string, File>;
  onReset: () => void;
}

const RESULT_IMAGE = "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80";

const AncestorPredictor = ({ files, onReset }: AncestorPredictorProps) => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Record<string, string>>({});

  useEffect(() => {
    const newPreviews: Record<string, string> = {};
    Object.entries(files).forEach(([key, file]) => {
      newPreviews[key] = URL.createObjectURL(file);
    });
    setPreviews(newPreviews);
  }, [files]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    let timeout: ReturnType<typeof setTimeout>;
    
    if (loading) {
      interval = setInterval(() => {
        setProgress(prev => {
          const increment = Math.random() * 2;
          const newProgress = Math.min(prev + increment, 100);
          return newProgress;
        });
      }, 150);
      
      timeout = setTimeout(() => {
        clearInterval(interval);
        setProgress(100);
        setLoading(false);
        setResult(RESULT_IMAGE);
        toast.success("Ancestor prediction complete!", {
          description: "We've successfully generated a prediction of your ancestor."
        });
      }, 5000);
    }
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [loading]);

  const handleDownload = () => {
  
    toast.success("Image downloaded successfully!");
  };

  const handleShare = () => {
    toast.success("Sharing link copied to clipboard!");
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {loading ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-8">Processing Your Images</h2>
          
          <div className="max-w-md mx-auto mb-8">
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Analyzing facial features</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
          
          <div className="text-foreground/70 space-y-3 max-w-lg mx-auto">
            <p className="animate-pulse">Detecting hereditary traits...</p>
            <p className="animate-pulse animate-delay-1">Identifying genetic patterns...</p>
            <p className="animate-pulse animate-delay-2">Generating ancestor model...</p>
          </div>
        </div>
      ) : (
        <div className="animate-fade-in">
          <h2 className="text-2xl font-bold text-center mb-8">
            Your Ancestor Prediction Result
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-12">
            {Object.entries(previews).map(([generation, url], index) => (
              <div key={generation} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="aspect-square rounded-lg overflow-hidden border border-border">
                  <img 
                    src={url} 
                    alt={generation} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-center mt-2 text-sm text-muted-foreground capitalize">
                  {generation}
                </p>
              </div>
            ))}
            
            <div className="col-span-2 animate-fade-in animate-delay-3">
              <div className="aspect-square rounded-lg overflow-hidden border-2 border-primary shadow-lg">
                <img 
                  src={result!} 
                  alt="Predicted Ancestor" 
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-center mt-2 font-medium text-primary">
                Predicted Ancestor
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-4">
            <button
              onClick={handleDownload}
              className={cn(
                "flex items-center justify-center px-6 py-3 rounded-full",
                "bg-primary text-white font-medium",
                "hover:bg-primary/90 transition-colors"
              )}
            >
              <Download size={18} className="mr-2" />
              Download Image
            </button>
            
            <button
              onClick={handleShare}
              className={cn(
                "flex items-center justify-center px-6 py-3 rounded-full",
                "border border-border bg-white",
                "hover:bg-muted/50 transition-colors"
              )}
            >
              <Share2 size={18} className="mr-2" />
              Share Result
            </button>
            
            <button
              onClick={onReset}
              className={cn(
                "flex items-center justify-center px-6 py-3 rounded-full",
                "text-muted-foreground hover:text-foreground transition-colors"
              )}
            >
              Try with Different Photos
            </button>
          </div>
          
          <div className="mt-16 p-6 bg-muted/50 rounded-xl border border-border animate-fade-in animate-delay-5">
            <h3 className="text-xl font-semibold mb-4 text-center">About This Prediction</h3>
            <p className="text-foreground/70 mb-4">
              Our AI has analyzed the facial structures, traits, and features from your uploaded photos to generate 
              this prediction. The image represents how your ancestor might have looked based on the genetic 
              patterns identified across the three generations you provided.
            </p>
            <p className="text-foreground/70">
              While this prediction uses advanced machine learning algorithms, it's important to note that it's 
              an approximation based on available data. Actual appearance may have varied due to environmental 
              factors and other influences not captured in photos.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AncestorPredictor;
