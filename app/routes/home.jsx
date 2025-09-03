import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    setMounted(true);
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
        Loading campfire...
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
        `
      }} />
      
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>🔥 Campfire Meeting</h1>
        <p style={{ fontSize: '1.2rem', opacity: 0.8 }}>
          A virtual campfire experience for Microsoft Teams
        </p>
      </div>
      
      <div className="campfire" style={{
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, #ff6b35 0%, #ff8e53 30%, #ffa726 60%, transparent 80%)',
        borderRadius: '50%',
        position: 'relative'
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
      </div>

      <div style={{ 
        marginTop: '40px', 
        textAlign: 'center',
        maxWidth: '600px'
      }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Meeting Participants</h2>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px',
          flexWrap: 'wrap'
        }}>
          {['Alex', 'Brenda', 'Carlos', 'Diana'].map((name, index) => (
            <div key={name} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              padding: '15px',
              minWidth: '120px',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>👤</div>
              <div>{name}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
