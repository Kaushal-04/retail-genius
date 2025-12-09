import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

export function BrandPalette({ colors = [], onColorAdd, onColorSelect }) {
    const [newColor, setNewColor] = useState('#ffffff');
    const [showPicker, setShowPicker] = useState(false);

    const handleAdd = () => {
        onColorAdd(newColor);
        setShowPicker(false);
    };

    return (
        <div className="glass-panel" style={{ padding: '16px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '14px', marginBottom: '12px', color: 'var(--color-text-muted)' }}>Brand Colors</h3>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {colors.map((color, idx) => (
                    <button
                        key={idx}
                        onClick={() => onColorSelect(color)}
                        style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: color,
                            border: '2px solid rgba(255,255,255,0.2)',
                            cursor: 'pointer',
                            transition: 'transform 0.2s'
                        }}
                        title={color}
                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.2)'}
                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    />
                ))}

                <div style={{ position: 'relative' }}>
                    <button
                        onClick={() => setShowPicker(!showPicker)}
                        style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            border: '1px dashed var(--color-text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--color-text-muted)'
                        }}
                    >
                        <Plus size={14} />
                    </button>

                    {showPicker && (
                        <div style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            marginTop: '8px',
                            background: '#222',
                            padding: '8px',
                            borderRadius: '8px',
                            zIndex: 10,
                            display: 'flex',
                            gap: '4px'
                        }}>
                            <input
                                type="color"
                                value={newColor}
                                onChange={(e) => setNewColor(e.target.value)}
                                style={{ width: '40px', height: '40px', padding: 0, border: 'none', borderRadius: '4px' }}
                            />
                            <button onClick={handleAdd} style={{ padding: '0 8px', background: 'var(--color-primary)', borderRadius: '4px', fontSize: '12px' }}>Add</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
