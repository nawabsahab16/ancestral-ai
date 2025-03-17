
import { createClient } from '@supabase/supabase-js';
import { toast } from 'sonner';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);

export const uploadImage = async (file: File, folder: string, userId: string) => {
  try {

    if (file.size > 10 * 1024 * 1024) {
      throw new Error(`${folder} image exceeds 10MB size limit`);
    }
    
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}/${folder}/${Math.random().toString(36).substring(2)}.${fileExt}`;
    
    console.log(`Uploading image for ${folder} to Supabase storage...`);
    
    const { data, error } = await supabase.storage
      .from('ancestor-photos')
      .upload(fileName, file, {
        upsert: true, 
        cacheControl: '3600'
      });
      
    if (error) {
      console.error(`Error uploading ${folder} image:`, error);
      
      // Check if it's an RLS policy error
      if (error.message?.includes('row-level security policy')) {
        throw new Error(
          `Storage permission denied. Please ensure your Supabase project has the correct RLS policies configured.`
        );
      }
      
      throw error;
    }
    
    // Get public URL
    const { data: urlData } = supabase.storage
      .from('ancestor-photos')
      .getPublicUrl(fileName);
      
    console.log(`Successfully uploaded ${folder} image`);
    return urlData.publicUrl;
  } catch (error) {
    console.error(`Failed to upload ${folder} image:`, error);
    
    // If we have RLS policy errors, use localStorage as fallback for demo purposes
    // This is temporary until Supabase permissions are properly configured
    const fallbackUrl = await storeImageLocally(file, folder);
    
    toast.error(`Using local storage for ${folder} image as fallback`, {
      description: "Images won't persist after page refresh in demo mode"
    });
    
    return fallbackUrl;
  }
};


const storeImageLocally = async (file: File, folder: string): Promise<string> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      try {
    
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
  
          let width = img.width;
          let height = img.height;
          const maxDimension = 600;
          
          if (width > height && width > maxDimension) {
            height = (height / width) * maxDimension;
            width = maxDimension;
          } else if (height > width && height > maxDimension) {
            width = (width / height) * maxDimension;
            height = maxDimension;
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);
        
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.5); 
          
         
          try {
            localStorage.setItem(`ancestor-${folder}-image`, compressedDataUrl);
            resolve(compressedDataUrl);
          } catch (storageError) {
            console.error('localStorage quota exceeded:', storageError);
            
            const furtherCompressedDataUrl = canvas.toDataURL('image/jpeg', 0.3);
            resolve(furtherCompressedDataUrl);
          }
        };
        img.src = reader.result as string;
      } catch (error) {
        console.error('Error compressing image:', error);
        
        toast.error('Failed to store image locally', {
          description: 'Using placeholder image instead'
        });
        resolve('/placeholder.svg');
      }
    };
    reader.readAsDataURL(file);
  });
};

export const processAncestorPrediction = async (photoUrls: Record<string, string>, userId: string) => {
  try {
    console.log('Starting ancestor prediction process with photos:', Object.keys(photoUrls).join(', '));
    
   
    const usingFallbackStorage = Object.values(photoUrls).some(url => url.startsWith('data:'));
    
    if (usingFallbackStorage) {
      console.log('Using fallback mode for prediction');
      toast.warning('Using demo mode for ancestor prediction', {
        description: 'This is a simulated result. Connect to Supabase properly for full functionality.'
      });
      
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      try {
        const blendedImage = await blendImagesLocally(photoUrls);
        return blendedImage;
      } catch (error) {
        console.error('Error blending images locally:', error);
        return '/placeholder.svg';
      }
    }
    
    const { data, error } = await supabase.functions.invoke('predict-ancestor', {
      body: { 
        photoUrls, 
        userId 
      }
    });
    
    if (error) {
      console.error('Edge function error:', error);
      
      toast.warning('Edge function unavailable, using local processing instead', { 
        description: 'Results may be less accurate in demo mode'
      });
      
  
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      try {
      
        const blendedImage = await blendImagesLocally(photoUrls);
        return blendedImage;
      } catch (blendError) {
        console.error('Fallback blending failed:', blendError);
        throw new Error(`Edge function error: ${error.message}`);
      }
    }
    
    if (!data || !data.resultUrl) {
      console.error('Invalid response from edge function:', data);
      throw new Error('Invalid response received from ancestor prediction function');
    }
    
    console.log('Ancestor prediction completed successfully');
    return data.resultUrl;
  } catch (error) {
    console.error('Error processing prediction:', error);
    
    toast.error('Error processing ancestor prediction', {
      description: "Using a placeholder image as fallback"
    });
    
    try {
      const blendedImage = await blendImagesLocally(photoUrls);
      return blendedImage;
    } catch (e) {
      return '/placeholder.svg';
    }
  }
};


const blendImagesLocally = async (photoUrls: Record<string, string>): Promise<string> => {
  return new Promise((resolve, reject) => {
    const images: HTMLImageElement[] = [];
    let loadedCount = 0;
    
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) {
      reject(new Error("Canvas context not available"));
      return;
    }
    
    Object.values(photoUrls).forEach((url, index) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => {
        images.push(img);
        loadedCount++;
        
        if (loadedCount === Object.keys(photoUrls).length) {
          try {
            // Fill background
            ctx.fillStyle = '#f8f8f8';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
        
            if (images[0]) {
              ctx.globalAlpha = 0.6;
              ctx.drawImage(images[0], 0, 0, canvas.width, canvas.height);
            }
            
            if (images[1]) {
              ctx.globalAlpha = 0.3;
              ctx.drawImage(images[1], 0, 0, canvas.width, canvas.height);
            }
            
            // Son (third image with least influence)
            if (images[2]) {
              ctx.globalAlpha = 0.1;
              ctx.drawImage(images[2], 0, 0, canvas.width, canvas.height);
            }
            
            ctx.globalAlpha = 0.2;
            ctx.fillStyle = '#8b4513';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            

            ctx.globalAlpha = 0.1;
            for (let i = 0; i < 5000; i++) {
              const x = Math.random() * canvas.width;
              const y = Math.random() * canvas.height;
              const gray = Math.floor(Math.random() * 255);
              ctx.fillStyle = `rgb(${gray},${gray},${gray})`;
              ctx.fillRect(x, y, 1, 1);
            }
            
           
            ctx.globalAlpha = 1.0;
            
            const dataUrl = canvas.toDataURL('image/jpeg', 0.7);
            resolve(dataUrl);
          } catch (error) {
            console.error("Error during canvas compositing:", error);
            reject(error);
          }
        }
      };
      img.onerror = (error) => {
        loadedCount++;
        console.error(`Failed to load image ${index}:`, url, error);
        
        if (loadedCount === Object.keys(photoUrls).length) {
          reject(new Error("Failed to load one or more images"));
        }
      };
      img.src = url;
    });
    
    setTimeout(() => {
      if (loadedCount < Object.keys(photoUrls).length) {
        reject(new Error("Timed out waiting for images to load"));
      }
    }, 10000);
  });
};
