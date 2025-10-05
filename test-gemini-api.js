// Test script to verify Gemini API integration
// Usage: GEMINI_API_KEY=your_key node test-gemini-api.js

const fetch = require('node-fetch');

async function testGeminiAPI() {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    console.error('❌ Error: GEMINI_API_KEY environment variable not set or is placeholder');
    console.log('\nTo test the Gemini API integration:');
    console.log('1. Get a free API key from: https://aistudio.google.com/app/apikey');
    console.log('2. Run: GEMINI_API_KEY=your_actual_key node test-gemini-api.js\n');
    process.exit(1);
  }

  console.log('🔄 Testing Gemini API connection...\n');

  const testMessages = [
    { role: 'user', content: 'What legal services does the Law Offices of Pritpal Singh offer?' }
  ];

  const systemPrompt = `You are the AI assistant for the Law Offices of Pritpal Singh, a California real estate law firm. 
You provide general information only - no legal advice. No attorney-client relationship is formed through this chat.
Direct users to call (510) 443-2123 or book a consultation for specific legal matters.`;

  // Convert to Gemini format
  const geminiContents = testMessages.map(msg => ({
    role: msg.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: msg.content }]
  }));

  const model = 'gemini-2.0-flash-exp';
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  
  const payload = {
    contents: geminiContents,
    systemInstruction: {
      parts: [{ text: systemPrompt }]
    },
    generationConfig: {
      temperature: 0.4,
      maxOutputTokens: 1500,
    }
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error (${response.status}): ${error}`);
    }

    const result = await response.json();
    const botText = result?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (botText) {
      console.log('✅ Success! Gemini API is working correctly.\n');
      console.log('Question:', testMessages[0].content);
      console.log('\nResponse:', botText);
      console.log('\n✅ The chatbot integration is ready to use!');
    } else {
      throw new Error('Invalid API response from Gemini - no text content returned');
    }
  } catch (error) {
    console.error('❌ Error testing Gemini API:', error.message);
    console.log('\nTroubleshooting:');
    console.log('1. Verify your API key is correct');
    console.log('2. Check that the API key has not expired');
    console.log('3. Ensure you have internet connectivity');
    console.log('4. Visit https://aistudio.google.com/app/apikey to manage your keys\n');
    process.exit(1);
  }
}

testGeminiAPI();
