import '../../styles/layout.css';

export const SidebarHeader = () => {
    return (
        <div className="sidebar-header" style={{ display: 'flex', justifyContent: 'space-between', padding: '0 16px', height: '52px', alignItems: 'center' }}>
            <div className="window-controls" style={{ display: 'flex', gap: '8px' }}>
                {/* Mac Traffic Lights Placeholder - Decorative */}
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ff5f56', opacity: 0.2 }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#ffbd2e', opacity: 0.2 }}></div>
                <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: '#27c93f', opacity: 0.2 }}></div>
            </div>
        </div>
    );
};
