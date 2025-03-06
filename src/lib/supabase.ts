import { createClient } from '@supabase/supabase-js';


const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ;
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
  const fileExt = file.name.split('.').pop();
  const fileName = `${userId}/${folder}/${Math.random().toString(36).substring(2)}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('ancestor-photos')
    .upload(fileName, file);
    
  if (error) {
    throw error;
  }
  
  const { data: urlData } = supabase.storage
    .from('ancestor-photos')
    .getPublicUrl(fileName);
    
  return urlData.publicUrl;
};

export const processAncestorPrediction = async (photoUrls: Record<string, string>, userId: string) => {
  try {
  
    const { data, error } = await supabase.functions.invoke('predict-ancestor', {
      body: { 
        photoUrls, 
        userId 
      }
    });
    
    if (error) {
      throw error;
    }
    
    return data.resultUrl;
  } catch (error) {
    console.error('Error processing prediction:', error);
    throw error;
  }
};
