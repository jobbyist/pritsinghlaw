# PSLaw AI Chatbot Documentation

## Overview
Production-ready AI chatbot for Law Offices of Pritpal Singh website with **Google Gemini** integration, knowledge base, and appointment booking capabilities.

## Features
- **Floating Action Button**: Orange rounded-square button with "P" logo at bottom-right
- **Responsive Modal**: Full-height on mobile, centered card on desktop
- **Google Gemini Integration**: Free AI model with server-side proxy for secure API calls
- **Knowledge Base**: Pre-loaded information about firm services
- **Suggestion Chips**: Quick action buttons for common queries
- **Calendly Integration**: Real-time availability and direct booking links
- **Zapier Webhook**: Lead capture for follow-up

## Environment Variables
Required in `.env` file or Replit Secrets:
- `GEMINI_API_KEY` - Your Google Gemini API key (REQUIRED) - Get free at https://aistudio.google.com/app/apikey
- `CALENDLY_ACCESS_TOKEN` - Calendly Personal Access Token (REQUIRED for booking)
- `CALENDLY_USER_URI` - Your Calendly user URI from API (REQUIRED for booking)
- `ZAPIER_WEBHOOK_URL` - For lead capture (optional)

### Setting Up Google Gemini
1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Get API key" or "Create API key"
4. Copy the API key and add it to your `.env` file as `GEMINI_API_KEY`

### Setting Up Calendly Integration
1. Get your Personal Access Token from [Calendly Developer Portal](https://developer.calendly.com/api-docs/005832c83e164-get-current-user)
2. Get your User URI by calling the `/users/me` endpoint with your token
3. Add both values to `.env` file

## Architecture

### Frontend Components
- `/public/pslaw-chat.js` - Main widget JavaScript
- `/public/pslaw-chat.css` - Scoped styles
- `/public/assets/pslaw-chat-icon.svg` - Fallback icon

### Backend Server
- `/server.js` - Express server with Gemini API proxy
- Routes:
  - `POST /api/gemini-chat` - Gemini chat endpoint (replaces OpenAI)
  - `POST /api/chat` - Legacy OpenAI streaming endpoint (deprecated)
  - `GET /api/calendly-slots` - Available appointment times
  - `POST /api/intake-webhook` - Lead capture webhook

### Documentation
- `/docs/system_instructions.md` - AI behavior guidelines
- `/docs/training_script.md` - Conversation training
- `/data/knowledge.json` - Website content for context

## Security Features
- API key never exposed client-side
- CORS locked to allowed origins
- All styles/scripts namespaced with `pslaw-` prefix
- No global CSS collisions
- Focus trap and accessibility features

## Accessibility
- ARIA attributes for screen readers
- Keyboard navigation (Tab, Escape)
- Focus management
- High contrast support

## Usage

### Opening Chat Programmatically
```javascript
window.pslawChat.open();  // Open chat
window.pslawChat.close(); // Close chat
window.pslawChat.send("message"); // Send message
```

### Analytics Events
The widget dispatches custom events:
```javascript
window.addEventListener('pslaw:chat', (e) => {
  console.log(e.detail.type); // 'open', 'close', 'send', 'tool'
});
```

## Customization

### Modify Suggestions
Edit CONFIG.suggestions in `/public/pslaw-chat.js`

### Update System Prompt
Edit `/docs/system_instructions.md`

### Change Colors
Modify CSS variables in `/public/pslaw-chat.css`:
```css
[data-pslaw-root] {
  --pslaw-primary: #ff4900;
  --pslaw-navy: #001f54;
}
```

## Testing Checklist
✅ Floating button appears bottom-right
✅ Button has orange background with "P" icon
✅ Click opens modal chat
✅ Modal is responsive (mobile/desktop)
✅ Suggestion chips work
✅ Messages received from Google Gemini API
✅ System prompt enforces no legal advice
✅ Quick action links work
✅ Escape key closes modal
✅ No layout shifts or CSS conflicts

## Maintenance
- Update knowledge base: Run `node scripts/build-knowledge.mjs`
- Check server logs: View Server workflow output
- Monitor API usage: Check [Google AI Studio dashboard](https://aistudio.google.com/)