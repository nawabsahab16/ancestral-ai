
import { useState, useEffect } from "react";
import { Download, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { useAuth } from "./auth/AuthContext";
import { uploadImage, processAncestorPrediction } from "@/lib/supabase";
import { Progress } from "@/components/ui/progress";

interface AncestorPredictorProps {
  files: Record<string, File>;
  onReset: () => void;
}

const AncestorPredictor = ({ files, onReset }: AncestorPredictorProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState<string | null>(null);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [uploadedUrls, setUploadedUrls] = useState<Record<string, string>>({});
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  useEffect(() => {
    const newPreviews: Record<string, string> = {};
    Object.entries(files).forEach(([key, file]) => {
      newPreviews[key] = URL.createObjectURL(file);
    });
    setPreviews(newPreviews);
  }, [files]);

  useEffect(() => {
    const uploadAndProcess = async () => {
      if (!user) {
        setErrorMessage("You must be logged in to use this feature");
        setLoading(false);
        return;
      }

      try {
        setProgress(10);
    
        const uploadPromises = Object.entries(files).map(async ([generation, file]) => {
          const url = await uploadImage(file, generation, user.id);
          return { generation, url };
        });

        const uploadResults = await Promise.all(uploadPromises);
        setProgress(40);
        
        const urls = uploadResults.reduce((acc, { generation, url }) => {
          acc[generation] = url;
          return acc;
        }, {} as Record<string, string>);
        
        setUploadedUrls(urls);
        setProgress(50);
        
        const resultUrl = await processAncestorPrediction(urls, user.id);
        setProgress(95);
        
        setResult(resultUrl);
        setProgress(100);
        setLoading(false);
        
        toast.success("Ancestor prediction complete!", {
          description: "We've successfully generated a prediction of your ancestor using AI."
        });
      } catch (error) {
        console.error('Error in prediction process:', error);
        setErrorMessage("There was an error processing your images. Please try again.");
        setLoading(false);
        toast.error("Prediction failed", {
          description: error instanceof Error ? error.message : "Unknown error occurred"
        });
      }
    };

    if (loading && Object.keys(previews).length === 3) {
      uploadAndProcess();
    }
  }, [loading, previews, files, user]);

  const handleDownload = () => {
    if (!result) return;
    
    const link = document.createElement('a');
    link.href = result;
    link.download = 'ancestor-prediction.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success("Image downloaded successfully!");
  };

  const handleShare = () => {
    if (navigator.share && result) {
      navigator.share({
        title: 'My Ancestor Prediction',
        text: 'Check out this prediction of my ancestor!',
        url: result
      })
      .then(() => toast.success("Shared successfully!"))
      .catch((error) => {
        console.error('Error sharing:', error);
        toast.success("Sharing link copied to clipboard!");
      });
    } else {
    
      navigator.clipboard.writeText(result || "");
      toast.success("Sharing link copied to clipboard!");
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      {errorMessage ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4 text-red-500">Error</h2>
          <p className="text-foreground/70 mb-6">{errorMessage}</p>
          <button
            onClick={onReset}
            className={cn(
              "flex items-center justify-center px-6 py-3 rounded-full mx-auto",
              "bg-primary text-white font-medium",
              "hover:bg-primary/90 transition-colors"
            )}
          >
            Try Again
          </button>
        </div>
      ) : loading ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-8">Processing Your Images</h2>
          
          <div className="max-w-md mx-auto mb-8">
            <Progress value={progress} className="h-2 w-full" />
            <div className="flex justify-between text-sm text-muted-foreground mt-2">
              <span>Analyzing facial features</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>
          
          <div className="text-foreground/70 space-y-3 max-w-lg mx-auto">
            <p className="animate-pulse">Detecting hereditary traits...</p>
            <p className="animate-pulse animate-delay-1">Identifying genetic patterns...</p>
            <p className="animate-pulse animate-delay-2">Generating ancestor model with AI...</p>
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
            <h3 className="text-xl font-semibold mb-4 text-center">About This AI Prediction</h3>
            <p className="text-foreground/70 mb-4">
              Our advanced AI model has analyzed the facial structures, traits, and genetic features from your uploaded photos 
              to generate this prediction. The image represents how your ancestor might have looked based on sophisticated 
              machine learning algorithms that identify hereditary patterns across the three generations.
            </p>
            <p className="text-foreground/70">
              The AI model identifies key facial landmarks, bone structure, and genetic traits that are passed down through 
              generations. It then uses this data to extrapolate backward, creating a scientifically informed visualization 
              of earlier ancestors based on your family's genetic traits.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AncestorPredictor;
