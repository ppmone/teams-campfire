import React, { useEffect, useState } from "react";
import * as microsoftTeams from "@microsoft/teams-js";

export function meta() {
  return [
    { title: "Teams Campfire" },
    { name: "description", content: "Virtual campfire meeting experience for Microsoft Teams" },
  ];
}

export const clientLoader = () => {
  return null;
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [teamsContext, setTeamsContext] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const initializeTeams = async () => {
      try {
        // Initialize Teams SDK
        await microsoftTeams.app.initialize();
        
        // Get Teams context
        const context = await microsoftTeams.app.getContext();
        setTeamsContext(context);
        
        // Mock participants - in a real app, you'd get these from Teams API
        setParticipants([
          { id: 'user1', name: context.user?.displayName || 'You', isCurrentUser: true },
          { id: 'user2', name: 'Alex Chen', isCurrentUser: false },
          { id: 'user3', name: 'Sarah Johnson', isCurrentUser: false },
          { id: 'user4', name: 'Marcus Rodriguez', isCurrentUser: false },
        ]);
        
        setMounted(true);
        
        // Notify Teams that the app loaded successfully
        microsoftTeams.app.notifySuccess();
      } catch (error) {
        console.error('Failed to initialize Teams:', error);
        // Fallback for development outside Teams
        setParticipants([
          { id: 'user1', name: 'You', isCurrentUser: true },
          { id: 'user2', name: 'Alex Chen', isCurrentUser: false },
          { id: 'user3', name: 'Sarah Johnson', isCurrentUser: false },
          { id: 'user4', name: 'Marcus Rodriguez', isCurrentUser: false },
        ]);
        setMounted(true);
      }
    };

    initializeTeams();
  }, []);

  if (!mounted) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(to bottom, #1a1a2e, #16213e)', 
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '20px' }}>🔥</div>
          <div>Lighting the campfire...</div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(to bottom, #1a1a2e, #16213e)', 
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Inter, sans-serif'
    }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes flicker {
            0% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.8; transform: scale(1.05); }
            100% { opacity: 1; transform: scale(1); }
          }
          .campfire {
            animation: flicker 2s ease-in-out infinite alternate;
          }
          .participant-card {
            transition: transform 0.2s ease;
          }
          .participant-card:hover {
            transform: translateY(-2px);
          }
        `
      }} />
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>🔥 Campfire Meeting</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          {teamsContext ? `Welcome to ${teamsContext.channel?.displayName || 'Teams'} campfire` : 'A virtual campfire experience for Microsoft Teams'}
        </p>
        {teamsContext && (
          <div style={{ fontSize: '0.9rem', opacity: 0.6, marginTop: '10px' }}>
            Meeting ID: {teamsContext.meeting?.id || 'Development Mode'}
          </div>
        )}
      </div>
      
      <div className="campfire" style={{
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, #ff6b35 0%, #ff8e53 30%, #ffa726 60%, transparent 80%)',
        borderRadius: '50%',
        position: 'relative',
        marginBottom: '40px'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '4rem'
        }}>
          🔥
        </div>
        
        {/* Sparks animation */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '30%',
          fontSize: '1rem',
          animation: 'flicker 1.5s ease-in-out infinite alternate-reverse'
        }}>✨</div>
        <div style={{
          position: 'absolute',
          top: '25%',
          right: '35%',
          fontSize: '0.8rem',
          animation: 'flicker 2.5s ease-in-out infinite alternate'
        }}>✨</div>
      </div>

      <div style={{ 
        textAlign: 'center',
        maxWidth: '800px',
        width: '100%'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>
          Around the Campfire ({participants.length} participants)
        </h2>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {participants.map((participant) => (
            <div 
              key={participant.id} 
              className="participant-card"
              style={{
                background: participant.isCurrentUser 
                  ? 'linear-gradient(135deg, #ff6b35, #ff8e53)' 
                  : 'rgba(255, 255, 255, 0.1)',
                borderRadius: '15px',
                padding: '20px',
                minWidth: '140px',
                textAlign: 'center',
                border: participant.isCurrentUser ? 'none' : '1px solid rgba(255, 255, 255, 0.2)',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '2.5rem', marginBottom: '10px' }}>
                {participant.isCurrentUser ? '👤' : '👥'}
              </div>
              <div style={{ fontWeight: participant.isCurrentUser ? 'bold' : 'normal' }}>
                {participant.name}
              </div>
              {participant.isCurrentUser && (
                <div style={{ fontSize: '0.8rem', opacity: 0.8, marginTop: '5px' }}>
                  (You)
                </div>
              )}
            </div>
          ))}
        </div>
        
        <div style={{ marginTop: '30px', opacity: 0.7 }}>
          <p style={{ fontSize: '0.9rem' }}>
            💬 Share stories, ideas, and connect with your team around the virtual campfire
          </p>
        </div>
      </div>
    </div>
  );
}
