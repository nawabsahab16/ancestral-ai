

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1';
import { getSupabaseConfig } from './config.ts';

export const saveAncestorPrediction = async (
  userId: string, 
  inputPhotos: Record<string, string>, 
  resultUrl: string
) => {
  const config = getSupabaseConfig();
  
  const supabase = createClient(
    config.supabaseUrl,
    config.supabaseServiceKey
  );
  
  const { error } = await supabase
    .from('ancestor_predictions')
    .insert({
      user_id: userId,
      input_photos: inputPhotos,
      result_url: resultUrl,
      created_at: new Date().toISOString()
    });
  
  if (error) {
    console.error('Database error:', error);
    throw new Error(`Database error: ${error.message}`);
  }
  
  return { success: true };
};
