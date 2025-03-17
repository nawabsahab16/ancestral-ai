
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export const getSupabaseConfig = () => {
  const defaultConfig = {
    supabaseUrl: 'VITE_SUPABASE_URL',
    supabaseServiceKey: 'SUPABASE_SERVICE_KEY';
  };
  
  try {
    const envUrl = Deno.env.get('SUPABASE_URL');
    const envKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    
    return {
      supabaseUrl: envUrl || defaultConfig.supabaseUrl,
      supabaseServiceKey: envKey || defaultConfig.supabaseServiceKey
    };
  } catch (error) {
    console.warn('Could not access environment variables:', error);
    return defaultConfig;
  }
};

export const getReplicateConfig = () => {
  try {
    const token = Deno.env.get('REPLICATE_API_TOKEN');
    return {
      apiToken: 'REPLICATE_API_TOKEN',
      model: "stability-ai/sdxl:c221b2b8ef527988fb59bf24a8b97c4561f1c671f73bd389f866bfb27c061316",
    };
  } catch (error) {
    console.warn('Could not access environment variables:', error);
    return {
      apiToken: 'REPLICATE_API_TOKEN',
      model: "stability-ai/sdxl:c221b2b8ef527988fb59bf24a8b97c4561f1c671f73bd389f866bfb27c061316",
    };
  }
};
