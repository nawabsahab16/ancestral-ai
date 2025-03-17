
// Main entry point for the Predict Ancestor edge function

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "./config.ts";
import { validateRequest, createErrorResponse } from "./validator.ts";
import { generateAncestorImage } from "./image-generator.ts";
import { saveAncestorPrediction } from "./database.ts";

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Validate the request
    const { photoUrls, userId } = await validateRequest(req);
    
    console.log("Processing prediction request for user:", userId);
    console.log("Received photo URLs:", Object.keys(photoUrls));

    // Check if the photos are actually accessible URLs
    for (const [key, url] of Object.entries(photoUrls)) {
      if (url.startsWith('data:')) {
        console.warn(`Warning: ${key} image is a data URL, not a proper storage URL`);
      }
    }
    
    // Generate the ancestor image using the Replicate API with all three images
    let resultUrl;
    try {
      resultUrl = await generateAncestorImage(
        photoUrls.grandfather,
        photoUrls.father,
        photoUrls.son
      );
      console.log("Successfully generated ancestor image:", resultUrl);
    } catch (imageError) {
      console.error("Error generating image:", imageError);
      return createErrorResponse(
        'Failed to generate ancestor image', 
        imageError.message, 
        500
      );
    }
    
    // Save the prediction to the database (this is wrapped in try/catch inside the function)
    try {
      await saveAncestorPrediction(userId, photoUrls, resultUrl);
      console.log("Prediction saved to database");
    } catch (dbError) {
      // Log but don't fail if database save fails
      console.error("Failed to save to database, continuing:", dbError);
    }
    
    // Return the successful response
    return new Response(
      JSON.stringify({ 
        resultUrl,
        message: 'Ancestor predicted successfully' 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
    
  } catch (error) {
    console.error('Error processing prediction:', error);
    
    // Determine if this is a validation error or server error
    const isValidationError = error.message && (
      error.message.includes("Missing") || 
      error.message.includes("Invalid") ||
      error.message.includes("required parameter")
    );
    
    return createErrorResponse(
      'Failed to process ancestor prediction', 
      error.message, 
      isValidationError ? 400 : 500
    );
  }
});
