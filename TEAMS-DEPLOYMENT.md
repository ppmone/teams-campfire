# Teams Campfire - Deployment Guide

## 🔥 Making Your App Work in Microsoft Teams

Your Teams Campfire app is now ready for Microsoft Teams integration! Here's what you need to do:

## 1. Prerequisites Completed ✅
- ✅ React downgraded to v18 (Teams compatible)
- ✅ Microsoft Teams SDK installed
- ✅ Teams integration code added
- ✅ Teams manifest created
- ✅ Configuration page set up

## 2. Next Steps to Deploy

### A. Create Azure App Registration
1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to "Azure Active Directory" > "App registrations" > "New registration"
3. Name: "Teams Campfire"
4. Redirect URI: `https://your-domain.com/config`
5. Copy the Application ID and replace in `teams-manifest/manifest.json`:
   - Replace `12345678-1234-1234-1234-123456789012` with your App ID
   - Replace `87654321-4321-4321-4321-210987654321` with your App ID

### B. Deploy Your App
1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Deploy to a hosting service** (choose one):
   - **Azure Static Web Apps** (recommended)
   - **Netlify**
   - **Vercel** 
   - **Your own server**

3. **Update manifest with your domain:**
   - Replace `your-domain.com` in `teams-manifest/manifest.json` with your actual domain
   - Update `configurationUrl` to `https://your-domain.com/config`

### C. Create App Icons
1. Create a **192x192 color icon** and save as `teams-manifest/color.png`
2. Create a **32x32 outline icon** and save as `teams-manifest/outline.png`
3. Remove the `.txt` placeholder files

### D. Package and Upload to Teams
1. **Create app package:**
   ```bash
   cd teams-manifest
   zip -r campfire-teams-app.zip manifest.json color.png outline.png
   ```

2. **Upload to Teams:**
   - Open Microsoft Teams
   - Go to "Apps" > "Manage your apps" > "Upload an app"
   - Select "Upload a custom app"
   - Choose your `campfire-teams-app.zip` file

### E. Add to Teams Channel/Meeting
1. In any Teams channel, click the "+" tab
2. Search for "Campfire" 
3. Click "Add" and configure
4. Your campfire will now appear as a tab!

## 3. Features Ready to Use

✅ **Teams SDK Integration** - Automatically detects Teams context
✅ **Meeting Integration** - Shows meeting and channel information  
✅ **Participant Display** - Shows current user and mock participants
✅ **Animated Campfire** - Beautiful CSS animations
✅ **Mobile Responsive** - Works on all devices
✅ **Configuration Page** - Easy setup for Teams admins

## 4. Development & Testing

For local development with Teams:
1. Use ngrok or similar to expose localhost:
   ```bash
   npm install -g ngrok
   ngrok http 5173
   ```
2. Update manifest.json with the ngrok URL
3. Repackage and upload to Teams for testing

## 5. Environment Variables

Your Azure Fluid Relay credentials are set:
- `AZURE_FLUID_RELAY_TENANT_ID`: ✅ Configured
- `AZURE_FLUID_RELAY_TENANT_KEY`: ✅ Configured

## 6. Troubleshooting

- **App doesn't load in Teams**: Check console for errors, ensure HTTPS
- **Teams SDK errors**: Verify app is running inside Teams context
- **Icons not showing**: Ensure PNG files are exactly 192x192 and 32x32
- **Configuration fails**: Check Azure app registration redirect URLs

## 7. Next Steps for Enhancement

Consider adding:
- Real participant data from Teams API
- Interactive features (polls, reactions)
- Teams Live Share for real-time collaboration
- Custom background scenes
- Meeting recording integration

Your Teams Campfire app is ready to bring teams together! 🔥
