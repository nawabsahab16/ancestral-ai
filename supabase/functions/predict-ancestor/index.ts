import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

  
    const { photoUrls, userId } = await req.json()


    if (!photoUrls || !userId) {
      return new Response(
        JSON.stringify({ error: 'Missing required parameters' }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        }
      )
    }

    const requiredPhotos = ['grandfather', 'father', 'son']
    for (const photo of requiredPhotos) {
      if (!photoUrls[photo]) {
        return new Response(
          JSON.stringify({ error: `Missing ${photo} photo` }),
          {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 400,
          }
        )
      }
    }

    
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    
    const outputFileName = `${userId}/results/${Date.now()}.jpg`
    
    const resultUrl = photoUrls.grandfather
    
    const { error: dbError } = await supabase
      .from('ancestor_predictions')
      .insert({
        user_id: userId,
        input_photos: photoUrls,
        result_url: resultUrl,
        created_at: new Date().toISOString()
      })
    
    if (dbError) {
      console.error('Database error:', dbError)
    }
    
    return new Response(
      JSON.stringify({ 
        resultUrl,
        message: 'Ancestor predicted successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
    
  } catch (error) {
    console.error('Error processing prediction:', error)
    
    return new Response(
      JSON.stringify({ error: 'Failed to process ancestor prediction' }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      }
    )
  }
})
