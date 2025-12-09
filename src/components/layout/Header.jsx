import React from 'react';
import { Sparkles, Layout, Settings } from 'lucide-react';

export function Header() {
    return (
        <header className="glass-panel" style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            borderRadius: 0,
            borderLeft: 'none',
            borderRight: 'none',
            borderTop: 'none'
        }}>
            <div className="container" style={{ height: '70px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, var(--color-primary), var(--color-accent))',
                        padding: '8px',
                        borderRadius: '8px',
                        display: 'flex'
                    }}>
                        <Sparkles color="white" size={20} fill="white" fillOpacity={0.2} />
                    </div>
                    <h1 style={{ fontSize: '20px', margin: 0 }}>
                        Retail<span className="primary-gradient">Genius</span>
                    </h1>
                </div>

                <nav style={{ display: 'flex', gap: '24px' }}>
                    <button style={{ color: 'var(--color-text)', opacity: 1, fontWeight: 500 }}>Create</button>
                    <button onClick={() => alert("Library feature coming soon!")} style={{ color: 'var(--color-text-muted)' }}>Library</button>
                    <button onClick={() => alert("Guidelines feature coming soon!")} style={{ color: 'var(--color-text-muted)' }}>Guidelines</button>
                </nav>

                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                    <button className="glass-button" style={{ width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Settings size={18} />
                    </button>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 600 }}>
                        KD
                    </div>
                </div>
            </div>
        </header>
    );
}
