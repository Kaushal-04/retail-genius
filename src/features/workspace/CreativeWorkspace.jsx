import React, { useState, useEffect, useRef } from 'react';
import Draggable from 'react-draggable';
import html2canvas from 'html2canvas';
import { CompliancePanel } from '../compliance/CompliancePanel';
import { validateCreative } from '../compliance/rules';
import { BrandPalette } from './BrandPalette';
import { Sparkles, Image as ImageIcon, Type, Download, Move, RotateCw, Maximize, Upload, Smartphone, Monitor } from 'lucide-react';

const CANVASES = {
    SQUARE: { width: 400, height: 400, label: 'Post 1:1' },
    STORY: { width: 300, height: 533, label: 'Story 9:16' }, // Scaled down for view
    LANDSCAPE: { width: 500, height: 261, label: 'Ad 1.91:1' }
};

export function CreativeWorkspace({ prompt, onBack }) {
    const [format, setFormat] = useState('SQUARE');

    // Layers with more properties for manipulation
    const [layers, setLayers] = useState([
        {
            id: 'bg',
            type: 'image',
            src: `https://image.pollinations.ai/prompt/professional%20product%20photography%20of%20${encodeURIComponent(prompt)}?width=1080&height=1080&nologo=true&seed=${Math.floor(Math.random() * 1000)}`,
            x: 0,
            y: 0,
            width: '100%',
            height: '100%',
            rotate: 0,
            zIndex: 0
        },
        { id: 'headline', type: 'text', text: prompt || 'New Product Launch', fontSize: 24, x: 20, y: 40, rotate: 0, color: '#000000', zIndex: 10 },
        { id: 'subhead', type: 'text', text: 'Summer vibes. 50% discount!', fontSize: 16, x: 20, y: 80, rotate: 0, color: '#333333', zIndex: 10 },
        { id: 'cta', type: 'text', text: 'Buy Now', fontSize: 14, x: 20, y: 150, rotate: 0, color: '#ffffff', bg: '#00539f', padding: '8px 16px', borderRadius: '4px', zIndex: 10 },
        { id: 'tag', type: 'text', text: 'Available at Tesco', fontSize: 12, x: 20, y: 350, rotate: 0, color: '#333333', zIndex: 10 },
    ]);

    const [validationResults, setValidationResults] = useState([]);
    const [selectedLayerId, setSelectedLayerId] = useState(null);
    const [brandColors, setBrandColors] = useState(['#00539f', '#d6001c', '#ffffff', '#000000']);

    const canvasRef = useRef(null);

    useEffect(() => {
        const results = validateCreative(layers, prompt, format);
        setValidationResults(results);
    }, [layers, prompt, format]);

    const updateLayer = (id, updates) => {
        setLayers(layers.map(l => l.id === id ? { ...l, ...updates } : l));
    };

    const handleDrag = (id, e, data) => {
        // In a real app we'd map pixels to percentages for responsiveness, 
        // but for prototype we just track x/y relative to container
        updateLayer(id, { x: data.x, y: data.y });
    };

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const newId = `img_${Date.now()}`;
            setLayers([...layers, {
                id: newId,
                type: 'image',
                src: url,
                x: 50,
                y: 50,
                width: 100,
                height: 100,
                rotate: 0,
                zIndex: 5
            }]);
            setSelectedLayerId(newId);
        }
    };

    const handleDownload = async () => {
        if (canvasRef.current) {
            try {
                const canvas = await html2canvas(canvasRef.current, { backgroundColor: null, useCORS: true });
                const link = document.createElement('a');
                link.download = `creative_${format.toLowerCase()}.png`;
                link.href = canvas.toDataURL();
                link.click();
            } catch (err) {
                console.error("Export failed:", err);
            }
        }
    };

    const handleAutoFix = () => {
        setLayers(layers.map(l => {
            if (l.id === 'subhead') {
                return { ...l, text: l.text.replace('50% discount!', 'Great value') };
            }
            return l;
        }));
    };

    const selectedLayer = layers.find(l => l.id === selectedLayerId);

    return (
        <div style={{ height: 'calc(100vh - 100px)', display: 'flex', gap: '24px' }}>

            {/* Left Sidebar - Tools */}
            <div className="glass-panel" style={{ width: '80px', padding: '16px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <label className="glass-button" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', cursor: 'pointer' }}>
                        <Upload size={20} />
                        <input type="file" style={{ display: 'none' }} onChange={handleUpload} accept="image/*" />
                    </label>
                    <span style={{ fontSize: '10px', color: 'var(--color-text-muted)' }}>Upload</span>
                </div>

                <div style={{ width: '80%', height: '1px', background: 'rgba(255,255,255,0.1)' }} />

                <button
                    onClick={() => setFormat('SQUARE')}
                    style={{ opacity: format === 'SQUARE' ? 1 : 0.5 }}
                    className="flex-center"
                    title="Square (1:1)"
                >
                    <div style={{ width: '24px', height: '24px', border: '2px solid white', borderRadius: '2px' }} />
                </button>
                <button
                    onClick={() => setFormat('STORY')}
                    style={{ opacity: format === 'STORY' ? 1 : 0.5 }}
                    className="flex-center"
                    title="Story (9:16)"
                >
                    <div style={{ width: '16px', height: '28px', border: '2px solid white', borderRadius: '2px' }} />
                </button>
                <button
                    onClick={() => setFormat('LANDSCAPE')}
                    style={{ opacity: format === 'LANDSCAPE' ? 1 : 0.5 }}
                    className="flex-center"
                    title="Landscape (1.91:1)"
                >
                    <div style={{ width: '32px', height: '18px', border: '2px solid white', borderRadius: '2px' }} />
                </button>
            </div>

            {/* Main Center Area */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>

                {/* Toolbar */}
                <div style={{ marginBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <button onClick={onBack} style={{ color: 'var(--color-text-muted)', fontSize: '14px' }}>&larr; Back</button>
                        <h2 style={{ fontSize: '18px', fontWeight: 500 }}>{prompt}</h2>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        {validationResults.some(r => r.status === 'fail') && (
                            <button
                                onClick={handleAutoFix}
                                className="glass-button"
                                style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', color: '#ffcc00' }}
                            >
                                <Sparkles size={14} /> Auto-Fix Violations
                            </button>
                        )}
                        <button
                            onClick={handleDownload}
                            className="glass-button"
                            style={{ padding: '8px 16px', borderRadius: '20px', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px', background: 'var(--color-primary)' }}
                        >
                            <Download size={14} /> Export {CANVASES[format].label}
                        </button>
                    </div>
                </div>

                <div style={{ flex: 1, display: 'flex', gap: '24px', overflow: 'hidden' }}>

                    {/* Canvas Container */}
                    <div className="glass-panel" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#2a2a2a', overflow: 'auto', position: 'relative' }}>
                        <div
                            ref={canvasRef}
                            style={{
                                width: CANVASES[format].width,
                                height: CANVASES[format].height,
                                position: 'relative',
                                background: 'white',
                                boxShadow: '0 0 40px rgba(0,0,0,0.5)',
                                transition: 'width 0.3s, height 0.3s',
                                overflow: 'hidden' // Clip content
                            }}
                            onClick={() => setSelectedLayerId(null)}
                        >
                            {/* Render Layers */}
                            {layers.sort((a, b) => a.zIndex - b.zIndex).map(layer => {
                                // Logic: Draggable handles X/Y via transform: translate().
                                // Use a nested div for rotation to avoid overwrite conflicts.
                                // React Strict Mode requires nodeRef for Draggable to avoid findDOMNode deprecated error/crash.

                                const nodeRef = React.useRef(null);

                                const layerStyle = {
                                    width: layer.type === 'image' ? (typeof layer.width === 'number' ? `${layer.width}px` : layer.width) : 'auto',
                                    height: layer.type === 'image' ? (typeof layer.height === 'number' ? `${layer.height}px` : layer.height) : 'auto',
                                    cursor: 'move',
                                    border: selectedLayerId === layer.id ? '2px solid var(--color-primary)' : '2px solid transparent',
                                    zIndex: layer.zIndex,
                                    position: 'absolute', // Draggable needs this for controlled pos
                                };

                                const contentStyle = {
                                    width: '100%',
                                    height: '100%',
                                    transform: `rotate(${layer.rotate}deg)`, // Apply rotation here
                                };

                                if (layer.type === 'image') {
                                    contentStyle.objectFit = 'cover';
                                    contentStyle.pointerEvents = 'none';
                                }

                                if (layer.type === 'text') {
                                    contentStyle.fontSize = `${layer.fontSize}px`;
                                    contentStyle.color = layer.color;
                                    contentStyle.fontFamily = 'var(--font-display)';
                                    contentStyle.fontWeight = layer.id === 'headline' ? 700 : 400;
                                    contentStyle.whiteSpace = 'nowrap';
                                    if (layer.bg) contentStyle.backgroundColor = layer.bg;
                                    if (layer.padding) contentStyle.padding = layer.padding;
                                    if (layer.borderRadius) contentStyle.borderRadius = layer.borderRadius;
                                }

                                return (
                                    <Draggable
                                        key={layer.id}
                                        nodeRef={nodeRef}
                                        position={{ x: layer.x, y: layer.y }}
                                        onStop={(e, data) => handleDrag(layer.id, e, data)}
                                        onStart={() => setSelectedLayerId(layer.id)}
                                    >
                                        {/* Draggable child must forward ref */}
                                        <div
                                            ref={nodeRef}
                                            style={layerStyle}
                                            onClick={(e) => { e.stopPropagation(); setSelectedLayerId(layer.id); }}
                                        >
                                            <div style={contentStyle}>
                                                {layer.type === 'image' ? (
                                                    <img src={layer.src} alt="" style={{ width: '100%', height: '100%' }} />
                                                ) : (
                                                    layer.text
                                                )}
                                            </div>
                                        </div>
                                    </Draggable>
                                );
                            })}

                            {/* Safe Zones Overlay (Toggleable in real app, on by default here) */}
                            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '40px', borderBottom: '1px dashed rgba(255,0,0,0.3)', pointerEvents: 'none', zIndex: 100 }} title="Safe Zone Top" />
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '50px', borderTop: '1px dashed rgba(255,0,0,0.3)', pointerEvents: 'none', zIndex: 100 }} title="Safe Zone Bottom" />
                        </div>
                    </div>

                    {/* Properties Panel (Right side of canvas area) */}
                    {selectedLayer && (
                        <div className="glass-panel" style={{ width: '250px', padding: '16px', overflowY: 'auto' }}>
                            <h3 style={{ fontSize: '14px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '8px' }}>
                                Edit {selectedLayer.type === 'text' ? 'Text' : 'Image'}
                            </h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                                {/* Common: Rotate */}
                                <div>
                                    <label style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Rotate ({selectedLayer.rotate}°)</label>
                                    <input
                                        type="range" min="-180" max="180"
                                        value={selectedLayer.rotate}
                                        onChange={(e) => updateLayer(selectedLayer.id, { rotate: parseInt(e.target.value) })}
                                        style={{ width: '100%' }}
                                    />
                                </div>

                                {/* Image: Size */}
                                {selectedLayer.type === 'image' && (
                                    <div>
                                        <label style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Size ({selectedLayer.width === '100%' ? 'Full' : selectedLayer.width})</label>
                                        <input
                                            type="range" min="50" max="500"
                                            value={typeof selectedLayer.width === 'number' ? selectedLayer.width : 400}
                                            onChange={(e) => updateLayer(selectedLayer.id, { width: parseInt(e.target.value), height: parseInt(e.target.value) })} // maintain aspect ratio roughly
                                            style={{ width: '100%' }}
                                        />
                                    </div>
                                )}

                                {/* Text: Content & Style */}
                                {selectedLayer.type === 'text' && (
                                    <>
                                        <div>
                                            <label style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Content</label>
                                            <input
                                                value={selectedLayer.text}
                                                onChange={(e) => updateLayer(selectedLayer.id, { text: e.target.value })}
                                                style={{ fontSize: '14px' }}
                                            />
                                        </div>
                                        <div>
                                            <label style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>Size ({selectedLayer.fontSize}px)</label>
                                            <input
                                                type="range" min="10" max="100"
                                                value={selectedLayer.fontSize}
                                                onChange={(e) => updateLayer(selectedLayer.id, { fontSize: parseInt(e.target.value) })}
                                                style={{ width: '100%' }}
                                            />
                                        </div>

                                        {/* Brand Palette Integration */}
                                        <div style={{ marginTop: '8px' }}>
                                            <label style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginBottom: '4px', display: 'block' }}>Color</label>
                                            <BrandPalette
                                                colors={brandColors}
                                                onColorAdd={(c) => setBrandColors([...brandColors, c])}
                                                onColorSelect={(c) => updateLayer(selectedLayer.id, { color: c })}
                                            />
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Far Right Sidebar - Compliance */}
            <CompliancePanel results={validationResults} onExport={handleDownload} />

        </div>
    );
}
