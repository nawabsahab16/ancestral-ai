
import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { motion } from "framer-motion";

type Generation = "grandfather" | "father" | "son";

interface UploadFlowProps {
  onComplete: (files: Record<Generation, File>) => void;
}

const generations: Generation[] = ["grandfather", "father", "son"];

const UploadFlow = ({ onComplete }: UploadFlowProps) => {
  const [uploadedFiles, setUploadedFiles] = useState<Partial<Record<Generation, File>>>({});
  const [previews, setPreviews] = useState<Partial<Record<Generation, string>>>({});
  const fileInputRefs = useRef<Record<Generation, HTMLInputElement | null>>({
    grandfather: null,
    father: null,
    son: null,
  });

  const handleFileChange = (generation: Generation, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file");
        return;
      }
      
  
      if (file.size > 5 * 1024 * 1024) {
        toast.error("File size must be less than 5MB");
        return;
      }

      const newUploadedFiles = { ...uploadedFiles, [generation]: file };
      setUploadedFiles(newUploadedFiles);
      
      const previewUrl = URL.createObjectURL(file);
      setPreviews({ ...previews, [generation]: previewUrl });
      
      if (Object.keys(newUploadedFiles).length === 3) {
        toast.success("All photos uploaded successfully!");
      } else {
        toast.success(`${capitalize(generation)}'s photo uploaded successfully!`);
      }
    }
  };

  const removeFile = (generation: Generation) => {
    const newFiles = { ...uploadedFiles };
    delete newFiles[generation];
    setUploadedFiles(newFiles);
  
    if (previews[generation]) {
      URL.revokeObjectURL(previews[generation]!);
      const newPreviews = { ...previews };
      delete newPreviews[generation];
      setPreviews(newPreviews);
    }
    
    if (fileInputRefs.current[generation]) {
      fileInputRefs.current[generation]!.value = "";
    }
    
    toast.info(`${capitalize(generation)}'s photo removed`);
  };

  const handleSubmit = () => {
    if (generations.every(gen => uploadedFiles[gen])) {
      onComplete(uploadedFiles as Record<Generation, File>);
    } else {
      toast.error("Please upload all three photos");
    }
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  const allUploaded = generations.every(gen => !!uploadedFiles[gen]);

  return (
    <motion.div 
      className="w-full max-w-4xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-2xl font-bold text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Upload Family Photos
      </motion.h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {generations.map((generation, index) => (
          <motion.div
            key={generation}
            className={cn(
              "border rounded-xl overflow-hidden transition-all duration-300",
              uploadedFiles[generation] ? "border-primary shadow-sm" : "border-border"
            )}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
          >
            <div className="p-4 border-b bg-muted">
              <h3 className="font-medium text-center capitalize">{generation}</h3>
            </div>
            
            <div className="p-6">
              {previews[generation] ? (
                <motion.div 
                  className="relative aspect-square mb-4"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={previews[generation]}
                    alt={`Preview of ${generation}`}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <motion.button
                    type="button"
                    onClick={() => removeFile(generation)}
                    className="absolute top-2 right-2 bg-white/80 hover:bg-white text-red-500 p-1 rounded-full shadow-sm transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={16} />
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  onClick={() => fileInputRefs.current[generation]?.click()}
                  className={cn(
                    "aspect-square border-2 border-dashed rounded-lg mb-4",
                    "flex flex-col items-center justify-center cursor-pointer",
                    "hover:border-primary hover:bg-primary/5 transition-colors",
                    "border-border bg-muted/50"
                  )}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <ImageIcon className="w-12 h-12 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground text-center">
                    Click to upload
                  </p>
                </motion.div>
              )}
              
              <input
                type="file"
                accept="image/*"
                className="hidden"
                ref={el => fileInputRefs.current[generation] = el}
                onChange={e => handleFileChange(generation, e)}
              />
              
              <motion.button
                type="button"
                onClick={() => fileInputRefs.current[generation]?.click()}
                className={cn(
                  "w-full py-2 px-4 rounded-lg text-sm font-medium flex items-center justify-center",
                  "transition-colors",
                  uploadedFiles[generation]
                    ? "bg-primary/10 text-primary hover:bg-primary/20"
                    : "bg-primary text-white hover:bg-primary/90"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {uploadedFiles[generation] ? (
                  <>
                    <Check size={16} className="mr-2" />
                    Change Photo
                  </>
                ) : (
                  <>
                    <Upload size={16} className="mr-2" />
                    Upload Photo
                  </>
                )}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex justify-center">
        <motion.button
          type="button"
          onClick={handleSubmit}
          disabled={!allUploaded}
          className={cn(
            "py-3 px-8 rounded-full font-medium text-white",
            "transition-all duration-300 flex items-center",
            allUploaded 
              ? "bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg" 
              : "bg-gray-400 cursor-not-allowed"
          )}
          whileHover={allUploaded ? { scale: 1.05 } : {}}
          whileTap={allUploaded ? { scale: 0.95 } : {}}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          {allUploaded ? "Generate Ancestor Prediction" : "Upload All Photos to Continue"}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default UploadFlow;
