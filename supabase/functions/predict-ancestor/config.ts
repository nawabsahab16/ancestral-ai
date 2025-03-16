
export const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};


export const getSupabaseConfig = () => {
  
  const defaultConfig = {
    supabaseUrl: 'https://egjusjxpmhvcnifnotzc.supabase.co',
    supabaseServiceKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVnanVzanhwbWh2Y25pZm5vdHpjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0MTI4NTkxNSwiZXhwIjoyMDU2ODYxOTE1fQ.8sikgpJvhHthskD60t1A7eXGnqkQR4a4D32kl7JvGl0'
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
      apiToken: token ,
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
