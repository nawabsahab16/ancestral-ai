
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UploadFlow from "@/components/UploadFlow";
import AncestorPredictor from "@/components/AncestorPredictor";

type UploadState = "upload" | "processing";

const GetStarted = () => {
  const [uploadState, setUploadState] = useState<UploadState>("upload");
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, File> | null>(null);

  const handleUploadComplete = (files: Record<string, File>) => {
    setUploadedFiles(files);
    setUploadState("processing");
  };

  const handleReset = () => {
    setUploadState("upload");
    setUploadedFiles(null);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <section className="py-32 hero-gradient">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="text-4xl font-bold mb-6">
                {uploadState === "upload" 
                  ? "Upload Your Family Photos" 
                  : "Generating Your Ancestor"}
              </h1>
              <p className="text-lg text-foreground/70">
                {uploadState === "upload"
                  ? "Our AI needs photos from three generations to predict your ancestral appearance."
                  : "Our AI is analyzing your photos to generate a prediction of your ancestor."}
              </p>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm border border-border p-6 md:p-10">
              {uploadState === "upload" ? (
                <UploadFlow onComplete={handleUploadComplete} />
              ) : (
                <AncestorPredictor 
                  files={uploadedFiles!} 
                  onReset={handleReset} 
                />
              )}
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">How Does It Work?</h2>
              <div className="grid md:grid-cols-3 gap-8 text-left">
                <div>
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl mb-4">
                    1
                  </div>
                  <h3 className="text-xl font-medium mb-2">Upload Photos</h3>
                  <p className="text-foreground/70">
                    Provide photos of your grandfather, father, and yourself (or son).
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl mb-4">
                    2
                  </div>
                  <h3 className="text-xl font-medium mb-2">AI Analysis</h3>
                  <p className="text-foreground/70">
                    Our advanced algorithms identify genetic patterns and facial traits.
                  </p>
                </div>
                <div>
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl mb-4">
                    3
                  </div>
                  <h3 className="text-xl font-medium mb-2">View Results</h3>
                  <p className="text-foreground/70">
                    Receive a visualization of your ancestor's predicted appearance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default GetStarted;
