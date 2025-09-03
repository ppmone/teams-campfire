// src/hooks/useTeamsLiveShare.js
import { useState, useEffect } from 'react';
import * as teamsJs from '@microsoft/teams-js';
import { LiveShareClient } from '@microsoft/live-share';
import { AzureClient } from '@fluidframework/azure-client';

// This is a custom token provider that calls our Azure Function
class AzureFunctionTokenProvider {
  constructor(functionUrl) {
    this.functionUrl = functionUrl;
  }

  async fetchToken(tenantId, documentId) {
    const context = await teamsJs.app.getContext();
    const user = await teamsJs.authentication.getProfile();

    const response = await fetch(this.functionUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userId: context.user.id,
        userName: user.name,
      }),
    });
    
    const data = await response.json();
    return data.token;
  }
}

// ---- Main Hook Logic ----
export function useTeamsLiveShare() {
  const [participants, setParticipants] = useState([]);
  // ... (keep the other state variables: localParticipant, participantsMap) ...

  useEffect(() => {
    const initialize = async () => {
      await teamsJs.app.initialize();
      const context = await teamsJs.app.getContext();
      const user = await teamsJs.authentication.getProfile();
      
      const me = { /* ... your user object ... */ };
      
      // --- UPDATED: Configure AzureClient to connect to your live service ---
      const client = new AzureClient({
        connection: {
          type: 'remote', // Use 'remote' instead of 'local'
          tenantId: process.env.REACT_APP_AZURE_FLUID_RELAY_TENANT_ID, // From Azure Portal
          endpoint: process.env.REACT_APP_AZURE_FLUID_RELAY_ENDPOINT, // From Azure Portal
          tokenProvider: new AzureFunctionTokenProvider(process.env.REACT_APP_TOKEN_FUNCTION_URL),
        },
      });

      // --- Initialize Live Share (the rest of the code is the same) ---
      const host = new LiveShareClient(client); // Pass the configured client to the host
      const { container } = await host.joinContainer(/* ... */);
      const map = container.initialObjects.participantsMap;
      
      // ... (The rest of the logic for setting and syncing state remains the same) ...
    };

    initialize().catch((error) => console.error(error));
  }, []);

  // ... (return statement is the same) ...
}