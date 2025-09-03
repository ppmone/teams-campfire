import React, { useEffect, useState } from "react";
import * as microsoftTeams from "@microsoft/teams-js";

export function meta() {
  return [
    { title: "Campfire Configuration" },
    { name: "description", content: "Configure your Teams Campfire experience" },
  ];
}

export default function Config() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initializeConfig = async () => {
      try {
        await microsoftTeams.app.initialize();
        
        // Configure the tab
        microsoftTeams.pages.config.registerOnSaveHandler((saveEvent) => {
          microsoftTeams.pages.config.setConfig({
            entityId: "campfire-tab",
            contentUrl: `${window.location.origin}/`,
            suggestedDisplayName: "Campfire",
            websiteUrl: `${window.location.origin}/`
          });
          saveEvent.notifySuccess();
        });

        // Enable the Save button
        microsoftTeams.pages.config.setValidityState(true);
        
        setMounted(true);
      } catch (error) {
        console.error('Failed to initialize config:', error);
        setMounted(true);
      }
    };

    initializeConfig();
  }, []);

  if (!mounted) {
    return <div>Loading configuration...</div>;
  }

  return (
    <div style={{
      padding: '20px',
      fontFamily: 'Segoe UI, sans-serif',
      textAlign: 'center'
    }}>
      <h2>🔥 Campfire Configuration</h2>
      <p>Your virtual campfire is ready to be added to this Teams channel!</p>
      <div style={{ marginTop: '20px' }}>
        <p>✅ Campfire scene configured</p>
        <p>✅ Participant seating arranged</p>
        <p>✅ Ready for team bonding</p>
      </div>
      <div style={{ 
        marginTop: '30px', 
        padding: '15px', 
        backgroundColor: '#f3f2f1', 
        borderRadius: '8px' 
      }}>
        <strong>What you'll get:</strong>
        <ul style={{ textAlign: 'left', marginTop: '10px' }}>
          <li>Animated virtual campfire atmosphere</li>
          <li>Participant cards around the fire</li>
          <li>Perfect for icebreakers and team building</li>
          <li>Integration with Teams meeting context</li>
        </ul>
      </div>
    </div>
  );
}
