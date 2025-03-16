
import { corsHeaders } from './config.ts';

export interface PredictionRequest {
  photoUrls: Record<string, string>;
  userId: string;
}

export const validateRequest = async (req: Request): Promise<PredictionRequest> => {

  const body = await req.json();
  const { photoUrls, userId } = body;


  if (!photoUrls || !userId) {
    throw new Error('Missing required parameters');
  }
  
  const requiredPhotos = ['grandfather', 'father', 'son'];
  for (const photo of requiredPhotos) {
    if (!photoUrls[photo]) {
      throw new Error(`Missing ${photo} photo`);
    }
  }

  return { photoUrls, userId };
};

export const createErrorResponse = (message: string, details?: any, status = 400) => {
  return new Response(
    JSON.stringify({ error: message, details }),
    {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status,
    }
  );
};
