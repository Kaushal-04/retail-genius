import React from 'react';
import { CheckCircle2, AlertTriangle, XCircle } from 'lucide-react';

export function CompliancePanel({ results, onExport }) {
    const passedCount = results.filter(r => r.status === 'pass').length;
    const totalCount = results.length;

    return (
        <div className="glass-panel" style={{ width: '320px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
            <div>
                <h3 style={{ marginBottom: '8px' }}>Compliance Check</h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: 'var(--color-text-muted)' }}>
                    <span>Retailer Guidelines (Tesco)</span>
                    <span style={{ color: passedCount === totalCount ? 'var(--color-accent)' : 'orange' }}>
                        {passedCount}/{totalCount} Passed
                    </span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.1)', marginTop: '8px', borderRadius: '2px' }}>
                    <div style={{
                        width: `${(passedCount / totalCount) * 100}%`,
                        height: '100%',
                        background: passedCount === totalCount ? 'var(--color-accent)' : 'orange',
                        borderRadius: '2px',
                        transition: 'width 0.5s ease'
                    }} />
                </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto' }}>
                {results.map(rule => (
                    <div key={rule.id} style={{
                        padding: '12px',
                        background: rule.status === 'fail' ? 'rgba(255, 59, 48, 0.1)' : 'rgba(255,255,255,0.03)',
                        border: `1px solid ${rule.status === 'fail' ? 'rgba(255, 59, 48, 0.3)' : 'transparent'}`,
                        borderRadius: '8px'
                    }}>
                        <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                            {rule.status === 'pass' && <CheckCircle2 size={18} color="#4cd964" style={{ marginTop: '2px' }} />}
                            {rule.status === 'fail' && <XCircle size={18} color="#ff3b30" style={{ marginTop: '2px' }} />}

                            <div>
                                <div style={{ fontWeight: 500, fontSize: '14px' }}>{rule.label}</div>
                                {rule.message && (
                                    <div style={{ fontSize: '12px', color: '#ff3b30', marginTop: '4px' }}>
                                        {rule.message}
                                    </div>
                                )}
                                {!rule.message && rule.description && (
                                    <div style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '4px' }}>
                                        {rule.description}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 'auto' }}>
                <button
                    className="glass-button"
                    onClick={() => {
                        if (passedCount === totalCount && onExport) {
                            onExport();
                        }
                    }}
                    style={{
                        width: '100%',
                        padding: '12px',
                        borderRadius: '8px',
                        background: 'var(--color-primary)',
                        opacity: passedCount === totalCount ? 1 : 0.5,
                        cursor: passedCount === totalCount ? 'pointer' : 'not-allowed'
                    }}>
                    {passedCount === totalCount ? 'Export Creative' : 'Fix Violations to Export'}
                </button>
            </div>
        </div>
    );
}
