# Chatbase to Google Gemini Migration

This repository has been updated to replace the Chatbase AI chatbot with a custom Google Gemini-powered chatbot.

## What Changed

### Removed
- ❌ Chatbase embed script from `index.html`
- ❌ Dependency on third-party chatbot service
- ❌ Monthly subscription costs

### Added
- ✅ Custom AI chatbot powered by Google Gemini (FREE)
- ✅ Full control over system prompts and behavior
- ✅ Enhanced branding and UI customization
- ✅ Direct integration with existing Calendly booking system

## Quick Start

### 1. Get a Free Google Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API key" or "Create API key"
4. Copy the generated API key

### 2. Configure Environment Variables

Update your `.env` file with the Gemini API key:

```bash
# Google Gemini Configuration (REQUIRED)
GEMINI_API_KEY=your_actual_api_key_here

# Calendly Integration (REQUIRED for booking)
CALENDLY_ACCESS_TOKEN=your_calendly_token
CALENDLY_USER_URI=your_calendly_user_uri
```

### 3. Test the Integration

Run the test script to verify everything works:

```bash
node test-gemini-api.js
```

You should see:
```
✅ Success! Gemini API is working correctly.
```

### 4. Start the Server

```bash
npm install
node server.js
```

The chatbot will now be available on your website!

## Features

### AI-Powered Legal Assistant
- Uses Google Gemini 2.0 Flash (free tier)
- Optimized for California Real Estate Law
- Enforces "no legal advice" policy
- Professional, empathetic responses

### Smart UI Components
- Floating action button (bottom-right)
- Responsive modal design
- Suggestion chips for common questions
- Quick action links (Consultation, Pay Bill, Services, Contact)
- Professional branding with firm colors

### Integrations
- **Calendly**: Book consultations directly from chat
- **Knowledge Base**: Pre-loaded firm information
- **Zapier**: Optional lead capture (webhook)

## System Architecture

### Frontend
- `public/pslaw-chat.js` - Main chatbot widget
- `public/pslaw-chat.css` - Scoped styles
- `index.html` - Widget integration

### Backend
- `server.js` - Express server with Gemini API proxy
- `/api/gemini-chat` - Main chat endpoint
- `/api/calendly-slots` - Booking integration
- `/api/intake-webhook` - Lead capture

### Configuration
- `.env` - Environment variables
- `docs/system_instructions.md` - AI behavior guidelines
- `docs/training_script.md` - Conversation examples

## Cost Comparison

### Before (Chatbase)
- 💰 $19-$99/month subscription
- 📊 Limited customization
- 🔒 Vendor lock-in

### After (Google Gemini)
- 💚 **FREE** (Gemini API)
- 🎨 Full customization
- 🔓 Complete control

## Customization

### Modify System Prompt
Edit `docs/system_instructions.md` to change how the AI responds.

### Change Suggestion Chips
Edit `CONFIG.suggestions` in `public/pslaw-chat.js`:

```javascript
suggestions: [
  'Book A Free Consultation',
  'How Do I Pay My Bill?',
  'What Legal Services Do You Offer?',
  'Where Are You Located?'
]
```

### Update Branding Colors
Modify CSS variables in `public/pslaw-chat.css`:

```css
[data-pslaw-root] {
  --pslaw-primary: #ff4900;  /* Brand orange */
  --pslaw-navy: #001f54;     /* Brand navy */
}
```

## Troubleshooting

### Chatbot Not Appearing
1. Check that `pslaw-chat.css` and `pslaw-chat.js` are included in `index.html`
2. Open browser console (F12) and look for errors
3. Verify server is running on port 5000

### API Errors
1. Verify `GEMINI_API_KEY` is set correctly in `.env`
2. Run `node test-gemini-api.js` to test the connection
3. Check that API key hasn't expired
4. Review server logs for error messages

### Chatbot Opens But No Responses
1. Check browser console for network errors
2. Verify `/api/gemini-chat` endpoint is accessible
3. Check server logs for API errors
4. Ensure system instructions files exist in `docs/`

## Documentation

- `README_CHATBOT.md` - Detailed technical documentation
- `docs/system_instructions.md` - AI behavior guidelines
- `test-gemini-api.js` - API integration test script

## Support

For issues or questions:
- 📧 Email: info@pritsinghlaw.com
- 📞 Phone: (510) 443-2123
- 🌐 Website: https://pritsinghlaw.com

## License

Copyright © 2025 Law Offices of Pritpal Singh. All rights reserved.
