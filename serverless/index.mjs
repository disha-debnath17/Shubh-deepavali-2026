/**
 * AWS Lambda Handler for Gemini Diwali Greeting Generation
 *
 * Environment Variables required in Lambda:
 * - GEMINI_API_KEY: Google Gemini API Key
 * - ALLOWED_ORIGIN: Allowed CORS Origin (e.g., https://main.d12345.amplifyapp.com or *)
 */

export const handler = async (event) => {
  const allowedOrigin = process.env.ALLOWED_ORIGIN || '*';
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Content-Type,Authorization,X-Requested-With',
    'Access-Control-Allow-Methods': 'OPTIONS,POST',
    'Content-Type': 'application/json',
  };

  // Handle HTTP OPTIONS for CORS preflight
  const httpMethod = event.httpMethod || event.requestContext?.http?.method;
  if (httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ message: 'OK' }),
    };
  }

  // Parse request body
  let body = {};
  try {
    body = typeof event.body === 'string' ? JSON.parse(event.body || '{}') : (event.body || {});
  } catch (err) {
    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        success: false,
        error: 'Invalid JSON request payload',
      }),
    };
  }

  const {
    relationship = 'family',
    recipientName = '',
    senderName = '',
    tone = 'emotional',
    language = 'en',
    state = 'All of India',
    personalMemory = '',
  } = body;

  const validLang = language === 'hi' ? 'hi' : language === 'bn' ? 'bn' : 'en';
  const cleanRecipient = typeof recipientName === 'string' ? recipientName.trim().slice(0, 50) : '';
  const cleanSender = typeof senderName === 'string' ? senderName.trim().slice(0, 50) : '';
  const cleanMemory = typeof personalMemory === 'string' ? personalMemory.trim().slice(0, 250) : '';
  const cleanRel = typeof relationship === 'string' ? relationship.trim().slice(0, 40) : 'family';

  // Fallback greeting generator in case GEMINI_API_KEY is not set or API error occurs
  const getFallbackGreeting = () => {
    if (validLang === 'hi') {
      return {
        salutation: cleanRecipient ? `प्रिय ${cleanRecipient},` : 'प्रिय परिवार,',
        p1: 'दीपों के इस पावन उत्सव पर आपके जीवन में सुख, शांति और समृद्धि का उजाला फैले।',
        p2: cleanMemory
          ? `वो प्यारी याद—"${cleanMemory}"—आज भी चेहरे पर मुस्कान ले आती है। अपनों का साथ ही हर त्योहार की असली मिठास है।`
          : 'अपनों की आत्मीयता, घर के बने स्वादिष्ट पकवान और दीपों की जगमगाहट इस त्योहार को और भी खास बना देते हैं।',
        p3: 'माता लक्ष्मी और भगवान गणेश का आशीर्वाद आप पर सदैव बना रहे। शुभ दीपावली!',
        closing: cleanSender ? `सप्रेम, ${cleanSender}` : 'सप्रेम एवं मंगलकामनाओं सहित',
      };
    } else if (validLang === 'bn') {
      return {
        salutation: cleanRecipient ? `স্নেহের ${cleanRecipient},` : 'প্রিয় পরিবার,',
        p1: 'মাটির প্রদীপের স্নিগ্ধ আলোয় আজ সারা ভুবন উদ্ভাসিত। দীপাবলির এই পুণ্য লগ্নে জানাই অনেক ভালোবাসা।',
        p2: cleanMemory
          ? `সেই সুন্দর স্মৃতি—"${cleanMemory}"—আজও মনে ভেসে ওঠে। উৎসবের আনন্দ তো প্রিয়জনদের সাথেই পূর্ণ হয়।`
          : 'মিষ্টির স্বাদ আর মাটির প্রদীপের আলোয় ভরে উঠুক আমাদের ভালোবাসার প্রতিটি মুহূর্ত।',
        p3: 'সুখ, সমৃদ্ধি, সুস্বাস্থ্য ও অফুরন্ত আনন্দে আপনার জীবন আলোকিত হোক। শুভ দীপাবলি!',
        closing: cleanSender ? `স্নেহ সহ, ${cleanSender}` : 'অনেক ভালোবাসা ও শ্রদ্ধা সহ',
      };
    } else {
      return {
        salutation: cleanRecipient ? `Dearest ${cleanRecipient},` : 'Dearest Family,',
        p1: `On this radiant festival of Deepavali, celebrating the timeless warmth of togetherness in ${state}.`,
        p2: cleanMemory
          ? `Cherishing the unforgettable memory—"${cleanMemory}"—which makes this festival all the sweeter.`
          : 'May the golden glow of earthen diyas fill your home with laughter, sweetness, and cherished memories.',
        p3: 'Wishing you vibrant health, enduring peace of mind, and radiant new beginnings.',
        closing: cleanSender ? `With all my love, ${cleanSender}` : 'With lots of love & festive blessings',
      };
    }
  };

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || !apiKey.trim()) {
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        isGemini: false,
        model: 'built-in-cultural-engine',
        greeting: getFallbackGreeting(),
      }),
    };
  }

  const prompt = `Compose an authentic, emotionally evocative, and culturally accurate Diwali greeting card letter.
GREETING PARAMETERS:
- Sender Name: ${cleanSender || 'Your Loved One'}
- Recipient Name: ${cleanRecipient || 'Dear Loved One'}
- Relationship: ${cleanRel}
- Selected Tone: ${tone} (Options: Emotional, Traditional, Heartwarming, Funny, Spiritual)
- Region: ${state}
- Target Language: ${
    validLang === 'hi'
      ? 'Hindi written naturally and gracefully in Devanagari script'
      : validLang === 'bn'
      ? 'Bengali written beautifully and warmly in Bengali script'
      : 'English with occasional graceful festive Indian words'
  }
- Optional Personal Memory from Sender: ${cleanMemory ? `"${cleanMemory}"` : 'None specified'}

RULES:
1. Focus on authentic family warmth, earthen diyas, festive sweets, and golden light.
2. If personal memory is provided, weave it naturally into paragraph 2.
3. Return STRICTLY valid JSON with fields: salutation, p1, p2, p3, closing. No markdown formatting.`;

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey.trim()}`;
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          temperature: 0.7,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Gemini API responded with status ${response.status}`);
    }

    const data = await response.json();
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (text) {
      const parsed = JSON.parse(text);
      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({
          success: true,
          isGemini: true,
          model: 'gemini-2.5-flash',
          greeting: parsed,
        }),
      };
    }

    throw new Error('No text candidate returned from Gemini');
  } catch (err) {
    console.warn('Serverless Gemini invocation error, returning graceful fallback:', err);
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        success: true,
        isGemini: false,
        model: 'built-in-cultural-engine',
        greeting: getFallbackGreeting(),
      }),
    };
  }
};
