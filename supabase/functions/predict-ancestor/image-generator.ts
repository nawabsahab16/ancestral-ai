

import { getReplicateConfig } from './config.ts';

export const generateAncestorImage = async (
  grandfatherImageUrl: string, 
  fatherImageUrl: string, 
  sonImageUrl: string
): Promise<string> => {
  const config = getReplicateConfig();
  
  console.log("Calling Replicate API to generate ancestor prediction");
  
  // Enhanced prompt that explains all three generations
  const promptTemplate = `Create a realistic historical portrait of a man in his 60s-70s who would be the 
                         great-grandfather of this lineage. Analyze the facial features, bone structure, 
                         and genetic traits visible in all three reference photos of the grandfather, father, 
                         and son. Maintain consistent ethnic features and family resemblance. The portrait 
                         should have authentic 1850s-1870s styling with period-appropriate clothing, facial 
                         hair, and sepia-toned photographic qualities of that era. The result should look 
                         like a genuine historical photograph discovered in a family archive.`;
  
  // First attempt using the SDXL model with multi-image influence
  // This approach passes the grandfather image as primary reference and uses a detailed prompt
  try {
    // Prepare the API payload for the primary model (SDXL)
    const payload = {
      version: config.model,
      input: {
        prompt: promptTemplate,
        image: grandfatherImageUrl, // Primary reference image (oldest generation)
        guidance_scale: 8.5,        // High guidance for prompt adherence
        num_inference_steps: 50,    // Higher quality with more steps
        negative_prompt: "unrealistic, cartoon, anime, low quality, blurry, distorted features, inconsistent with reference images, modern clothing",
        seed: Math.floor(Math.random() * 2147483647), // Random seed
        strength: 0.75, // Control how much the image influences the result
        refine: "expert_ensemble_refiner", // Use advanced refiner if available
      },
    };
    
    // Make the API call to Replicate
    const response = await fetch("https://api.replicate.com/v1/predictions", {
      method: "POST",
      headers: {
        "Authorization": `Token ${config.apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Primary model API error:", errorData);
      throw new Error(`Failed to call primary image generation API: ${JSON.stringify(errorData)}`);
    }
    
    const prediction = await response.json();
    console.log("Primary model prediction started:", prediction.id);
    
    // Poll for the result
    return await pollForResult(prediction.id, config.apiToken);
  } catch (error) {
    console.error("Primary model attempt failed:", error);
    
    // Fallback to a different approach or model if the first attempt fails
    console.log("Trying fallback model approach...");
    
    try {
      // Fallback to a different model if needed
      const fallbackModel = "stability-ai/stable-diffusion-xl-1024-v1-0:933f815b357e11039d1cc8dd339f4b82d35d5973b775addb7144c9eda74c4064";
      
      const fallbackPayload = {
        version: fallbackModel,
        input: {
          prompt: promptTemplate,
          image: grandfatherImageUrl,
          strength: 0.6,
          num_outputs: 1,
          num_inference_steps: 40,
          guidance_scale: 7.5,
        },
      };
      
      const fallbackResponse = await fetch("https://api.replicate.com/v1/predictions", {
        method: "POST",
        headers: {
          "Authorization": `Token ${config.apiToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(fallbackPayload),
      });
      
      if (!fallbackResponse.ok) {
        throw new Error("Fallback model also failed");
      }
      
      const fallbackPrediction = await fallbackResponse.json();
      console.log("Fallback prediction started:", fallbackPrediction.id);
      
      return await pollForResult(fallbackPrediction.id, config.apiToken);
    } catch (fallbackError) {
      console.error("All approaches failed:", fallbackError);
      throw new Error("Unable to generate ancestor image after multiple attempts");
    }
  }
};

async function pollForResult(predictionId: string, apiToken: string): Promise<string> {
  let resultUrl;
  let retries = 0;
  const maxRetries = 50;     // Increased max retries as enhanced models may take longer
  const pollInterval = 3000; // Poll every 3 seconds
  
  while (retries < maxRetries) {
    console.log(`Polling prediction status (attempt ${retries + 1}/${maxRetries})...`);
    
    const statusResponse = await fetch(`https://api.replicate.com/v1/predictions/${predictionId}`, {
      headers: {
        "Authorization": `Token ${apiToken}`,
        "Content-Type": "application/json",
      },
    });
    
    if (!statusResponse.ok) {
      console.error("Error checking prediction status");
      throw new Error("Failed to check prediction status");
    }
    
    const predictionStatus = await statusResponse.json();
    console.log("Current status:", predictionStatus.status);
    
    if (predictionStatus.status === "succeeded") {
      // The output is usually an array with the first element being the image URL
      resultUrl = Array.isArray(predictionStatus.output) 
        ? predictionStatus.output[0] 
        : predictionStatus.output;
        
      console.log("Generation completed:", resultUrl);
      return resultUrl;
    } else if (predictionStatus.status === "failed") {
      console.error("Prediction failed:", predictionStatus.error);
      throw new Error(`Image generation failed: ${predictionStatus.error}`);
    }
    
    // Wait before polling again
    await new Promise(resolve => setTimeout(resolve, pollInterval));
    retries++;
  }
  
  throw new Error("Could not get result after maximum retries");
}
