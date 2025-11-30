import { useState } from "react";

const CanvasCalendar = () => {
  const [status, setStatus] = useState("Ready to connect");
  const [isLoading, setIsLoading] = useState(false);
  const [icsLink, setIcsLink] = useState<string | null>(null);

  const handleFetch = () => {
    setIsLoading(true);
    setStatus("Opening Canvas login window...");
    
    const popup = window.open(
      "https://canvas.umass.edu/calendar",
      "_blank",
      "width=900,height=700,scrollbars=yes,resizable=yes"
    );

    if (!popup) {
      setStatus("❌ Popup blocked! Please allow popups and try again.");
      setIsLoading(false);
      return;
    }

    const interval = setInterval(() => {
      try {
        // Check if popup is closed by user
        if (popup.closed) {
          setStatus("❌ Window closed. Please try again.");
          setIsLoading(false);
          clearInterval(interval);
          return;
        }

        // Check if we've navigated to an .ics file
        if (popup.location.href.includes(".ics")) {
          const icsUrl = popup.location.href;
          setIcsLink(icsUrl);
          
          // Copy to clipboard
          navigator.clipboard.writeText(icsUrl).then(() => {
            setStatus("✅ Canvas calendar connected! ICS link copied to clipboard.");
          }).catch(() => {
            setStatus("✅ Canvas calendar connected!");
          });

          popup.close();
          setIsLoading(false);
          clearInterval(interval);
        }
      } catch (err) {
        // Cross-origin error is expected until user navigates to .ics page
        // Just continue checking
      }
    }, 1000);

    // Cleanup after 5 minutes
    setTimeout(() => {
      if (!popup.closed) {
        popup.close();
        setStatus("❌ Timeout. Please try again.");
        setIsLoading(false);
        clearInterval(interval);
      }
    }, 300000); // 5 minutes
  };

  const resetConnection = () => {
    setIcsLink(null);
    setStatus("Ready to connect");
    setIsLoading(false);
  };

  return (
    <div style={{ 
      maxWidth: '800px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', marginBottom: '30px', color: '#333' }}>
        Canvas Calendar Integration
      </h1>

      <div style={{ 
        backgroundColor: '#f8f9fa', 
        padding: '30px', 
        borderRadius: '12px',
        border: '1px solid #e9ecef',
        marginBottom: '30px'
      }}>
        <h2 style={{ marginTop: '0', color: '#495057' }}>Connect Your UMass Canvas Calendar</h2>
        <p style={{ color: '#6c757d', lineHeight: '1.6' }}>
          This tool helps you get your private Canvas calendar feed URL. Once connected, 
          you can use this URL in any calendar application to sync your assignments and due dates.
        </p>

        <div style={{ 
          backgroundColor: '#fff', 
          padding: '20px', 
          borderRadius: '8px',
          border: '1px solid #dee2e6',
          margin: '20px 0'
        }}>
          <h3 style={{ marginTop: '0', fontSize: '18px' }}>How it works:</h3>
          <ol style={{ paddingLeft: '20px', lineHeight: '1.8' }}>
            <li>Click "Connect to Canvas" below</li>
            <li>Log in to your UMass Canvas account in the popup window</li>
            <li>Navigate to your Calendar page</li>
            <li>Click "Calendar Feed" at the bottom right of the page</li>
            <li>Your private calendar URL will be automatically captured!</li>
          </ol>
        </div>

        <button
          onClick={handleFetch}
          disabled={isLoading}
          style={{
            backgroundColor: isLoading ? '#6c757d' : '#0056b3',
            color: 'white',
            padding: '12px 24px',
            border: 'none',
            borderRadius: '6px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            fontSize: '16px',
            fontWeight: '500',
            marginRight: '10px'
          }}
        >
          {isLoading ? 'Connecting...' : 'Connect to Canvas'}
        </button>

        {icsLink && (
          <button
            onClick={resetConnection}
            style={{
              backgroundColor: '#6c757d',
              color: 'white',
              padding: '12px 24px',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            Reset Connection
          </button>
        )}
      </div>

      {/* Status Display */}
      <div style={{ 
        padding: '20px', 
        backgroundColor: status.includes('✅') ? '#d1edff' : 
                        status.includes('❌') ? '#f8d7da' : '#fff3cd',
        borderRadius: '8px',
        border: `2px solid ${status.includes('✅') ? '#0056b3' : 
                              status.includes('❌') ? '#dc3545' : '#ffc107'}`,
        marginBottom: '20px'
      }}>
        <h3 style={{ margin: '0 0 10px 0', fontSize: '18px' }}>Status</h3>
        <p style={{ margin: '0', fontSize: '16px' }}>{status}</p>
      </div>

      {/* ICS Link Display */}
      {icsLink && (
        <div style={{ 
          backgroundColor: '#d1edff', 
          padding: '20px', 
          borderRadius: '8px',
          border: '2px solid #0056b3'
        }}>
          <h3 style={{ margin: '0 0 15px 0', color: '#0056b3' }}>Your Canvas Calendar Feed</h3>
          <div style={{ 
            backgroundColor: '#fff', 
            padding: '15px', 
            borderRadius: '6px',
            border: '1px solid #ccc',
            wordBreak: 'break-all',
            fontFamily: 'monospace',
            fontSize: '14px',
            marginBottom: '15px'
          }}>
            {icsLink}
          </div>
          
          <div style={{ fontSize: '14px', color: '#495057' }}>
            <h4 style={{ marginBottom: '10px' }}>What to do with this URL:</h4>
            <ul style={{ paddingLeft: '20px', lineHeight: '1.6' }}>
              <li><strong>Google Calendar:</strong> Add by URL → Paste this link</li>
              <li><strong>Apple Calendar:</strong> File → New Calendar Subscription → Paste this link</li>
              <li><strong>Outlook:</strong> Add Calendar → From Internet → Paste this link</li>
              <li><strong>Other apps:</strong> Look for "Subscribe to calendar" or "Add calendar by URL"</li>
            </ul>
          </div>

          <button
            onClick={() => navigator.clipboard.writeText(icsLink)}
            style={{
              backgroundColor: '#28a745',
              color: 'white',
              padding: '8px 16px',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
              marginTop: '10px'
            }}
          >
            Copy URL Again
          </button>
        </div>
      )}

      <div style={{ 
        marginTop: '40px', 
        padding: '20px', 
        backgroundColor: '#fff3cd',
        border: '1px solid #ffeaa7',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#856404'
      }}>
        <h4 style={{ marginTop: '0' }}>Privacy & Security</h4>
        <p style={{ margin: '0' }}>
          This tool is completely secure. You log in directly to Canvas - no passwords 
          or personal information ever touch our servers. The calendar URL is your private 
          feed that only you can access.
        </p>
      </div>
    </div>
  );
};

export default CanvasCalendar;