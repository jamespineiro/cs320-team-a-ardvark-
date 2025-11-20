import { vars } from '../../styles/theme.css';

const Launch = () => {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${vars.color.antiFlash} 0%, #b8d8e8 50%, ${vars.color.quietStorm} 100%)`,
      fontFamily: vars.typography.fontFamily,
      padding: vars.spacing.xl
    }}>
      <div style={{
        maxWidth: '900px',
        width: '100%',
        textAlign: 'center',
        animation: 'fadeIn 1s ease-in'
      }}>
        <h1 style={{
          fontSize: 'clamp(56px, 10vw, 84px)',
          fontWeight: vars.typography.fontWeight.bold,
          margin: `0 0 ${vars.spacing.md} 0`,
          letterSpacing: '-3px',
          color: vars.color.quietStorm,
          textShadow: '0 2px 10px rgba(45, 90, 108, 0.2)'
        }}>
          Synchro
        </h1>
        
        <p style={{
          fontSize: 'clamp(18px, 3vw, 26px)',
          fontWeight: vars.typography.fontWeight.regular,
          margin: `0 0 ${vars.spacing.lg} 0`,
          color: vars.color.carbon,
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Sync Your Academic Life in Perfect Harmony
        </p>

        <div style={{
          display: 'flex',
          gap: vars.spacing.md,
          justifyContent: 'center',
          flexWrap: 'wrap',
          marginBottom: vars.spacing.xl
        }}>
          <a 
            href="/signup"
            className="get-started-btn"
            style={{
              backgroundColor: vars.color.quietStorm,
              color: vars.color.white,
              padding: `${vars.spacing.md} ${vars.spacing.lg}`,
              borderRadius: vars.radii.lg,
              textDecoration: 'none',
              fontSize: vars.typography.fontSize.lg,
              fontWeight: vars.typography.fontWeight.bold,
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 20px rgba(45, 90, 108, 0.4)',
              display: 'inline-block'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(45, 90, 108, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 20px rgba(45, 90, 108, 0.4)';
            }}
          >
            Get Started
          </a>
          
          <a 
            href="/login"
            className="sign-in-btn"
            style={{
              backgroundColor: vars.color.white,
              color: vars.color.quietStorm,
              padding: `${vars.spacing.md} ${vars.spacing.lg}`,
              borderRadius: vars.radii.lg,
              textDecoration: 'none',
              fontSize: vars.typography.fontSize.lg,
              fontWeight: vars.typography.fontWeight.bold,
              border: `2px solid ${vars.color.quietStorm}`,
              transition: 'all 0.3s ease',
              display: 'inline-block'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.backgroundColor = vars.color.antiFlash;
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.backgroundColor = vars.color.white;
            }}
          >
            Sign In
          </a>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: vars.spacing.lg,
          marginTop: vars.spacing.xl,
          maxWidth: '800px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          <div style={{ 
            padding: vars.spacing.lg,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: vars.radii.lg,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${vars.color.antiFlash}`
          }}>
            <div style={{ fontSize: '56px', marginBottom: vars.spacing.md }}>📅</div>
            <h3 style={{ 
              margin: `0 0 ${vars.spacing.sm} 0`, 
              fontSize: vars.typography.fontSize.xl, 
              color: vars.color.quietStorm,
              fontWeight: vars.typography.fontWeight.bold
            }}>
              Canvas Integration
            </h3>
            <p style={{ 
              color: vars.color.carbon, 
              fontSize: vars.typography.fontSize.sm,
              margin: '0',
              lineHeight: '1.6'
            }}>
              Automatically sync your assignments and deadlines
            </p>
          </div>

          <div style={{ 
            padding: vars.spacing.lg,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: vars.radii.lg,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${vars.color.antiFlash}`
          }}>
            <div style={{ fontSize: '56px', marginBottom: vars.spacing.md }}>🎯</div>
            <h3 style={{ 
              margin: `0 0 ${vars.spacing.sm} 0`, 
              fontSize: vars.typography.fontSize.xl, 
              color: vars.color.quietStorm,
              fontWeight: vars.typography.fontWeight.bold
            }}>
              Smart Scheduling
            </h3>
            <p style={{ 
              color: vars.color.carbon, 
              fontSize: vars.typography.fontSize.sm,
              margin: '0',
              lineHeight: '1.6'
            }}>
              Organize your academic calendar effortlessly
            </p>
          </div>

          <div style={{ 
            padding: vars.spacing.lg,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            borderRadius: vars.radii.lg,
            backdropFilter: 'blur(10px)',
            border: `1px solid ${vars.color.antiFlash}`
          }}>
            <div style={{ fontSize: '56px', marginBottom: vars.spacing.md }}>🔔</div>
            <h3 style={{ 
              margin: `0 0 ${vars.spacing.sm} 0`, 
              fontSize: vars.typography.fontSize.xl, 
              color: vars.color.quietStorm,
              fontWeight: vars.typography.fontWeight.bold
            }}>
              Never Miss a Beat
            </h3>
            <p style={{ 
              color: vars.color.carbon, 
              fontSize: vars.typography.fontSize.sm,
              margin: '0',
              lineHeight: '1.6'
            }}>
              Stay on top of all your important dates
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Launch;
