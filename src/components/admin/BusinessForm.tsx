import { useState } from 'react';
import { Upload, Save, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { createBusiness, uploadImage, BusinessData } from '../../services/businessService';
import CategorySelect from './CategorySelect';

export default function BusinessForm() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState<Partial<BusinessData>>({
        published: true,
        redes: { instagram: '', facebook: '', website: '', google_maps: '' },
    });

    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [selectedCategoryName, setSelectedCategoryName] = useState<string>('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSocialChange = (network: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            redes: { ...prev.redes, [network]: value }
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            if (!formData.nombre || !formData.descripcion_corta || !formData.categoria_id) {
                throw new Error('Por favor completa los campos obligatorios (Nombre, Descripción Corta, Categoría)');
            }

            let logoUrl = formData.logo_url;
            let coverUrl = formData.portada_url;

            if (logoFile) {
                logoUrl = await uploadImage(logoFile, 'emprendimientos');
            }

            if (coverFile) {
                coverUrl = await uploadImage(coverFile, 'emprendimientos');
            }

            // Clean social media data: remove empty strings
            const cleanRedes = Object.entries(formData.redes || {}).reduce((acc, [key, value]) => {
                if (value && value.trim() !== '') {
                    acc[key] = value.trim();
                }
                return acc;
            }, {} as Record<string, string>);

            await createBusiness({
                ...formData as BusinessData,
                redes: Object.keys(cleanRedes).length > 0 ? cleanRedes : undefined,
                logo_url: logoUrl,
                portada_url: coverUrl,
            });

            setSuccess(true);
            // Optional: Reset form
            setFormData({ published: true, redes: { instagram: '', facebook: '', website: '', google_maps: '' } });
            setLogoFile(null);
            setCoverFile(null);
            setSelectedCategoryName('');
            window.scrollTo(0, 0);

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Error al crear el emprendimiento');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-xl shadow-sm border border-gray-200">

            {error && (
                <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    {error}
                </div>
            )}

            {success && (
                <div className="bg-green-50 text-green-600 p-4 rounded-lg flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Emprendimiento creado exitosamente.
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Info */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Información Básica</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre *</label>
                        <input
                            type="text"
                            name="nombre"
                            required
                            value={formData.nombre || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Corta *</label>
                        <input
                            type="text"
                            name="descripcion_corta"
                            required
                            maxLength={150}
                            value={formData.descripcion_corta || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">Breve resumen para las tarjetas (máx 150 caracteres)</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Descripción Larga</label>
                        <textarea
                            name="descripcion_larga"
                            rows={4}
                            value={formData.descripcion_larga || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                    </div>
                </div>

                {/* Contact & Location */}
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Contacto y Ubicación</h3>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
                        <input
                            type="text"
                            name="direccion"
                            value={formData.direccion || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono / WhatsApp</label>
                        <input
                            type="text"
                            name="telefono"
                            value={formData.telefono || ''}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps (Pegar código iframe)</label>
                        <textarea
                            rows={3}
                            placeholder='<iframe src="https://www.google.com/maps/embed?..."></iframe>'
                            value={formData.redes?.google_maps || ''}
                            onChange={(e) => {
                                const val = e.target.value;
                                // Try to extract src if it looks like an iframe tag
                                const srcMatch = val.match(/src="([^"]+)"/);
                                const finalValue = srcMatch ? srcMatch[1] : val;
                                handleSocialChange('google_maps', finalValue);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-transparent text-xs font-mono"
                        />
                        <p className="text-xs text-gray-500 mt-1">Pega el código "Insertar un mapa" de Google Maps. Nosotros extraeremos el enlace automáticamente.</p>
                    </div>
                </div>
            </div>

            {/* Category Selection */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Categoría *</h3>
                <p className="text-sm text-gray-600">Selecciona la categoría específica donde aparecerá el emprendimiento.</p>

                <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-700">Seleccionada:</span>
                        {selectedCategoryName ? (
                            <span className="px-2 py-1 bg-violet-100 text-violet-700 rounded text-sm font-bold">
                                {selectedCategoryName}
                            </span>
                        ) : (
                            <span className="text-sm text-gray-400 italic">Ninguna</span>
                        )}
                    </div>
                    <CategorySelect
                        selectedId={formData.categoria_id}
                        onSelect={(id, name) => {
                            setFormData(prev => ({ ...prev, categoria_id: id }));
                            setSelectedCategoryName(name);
                        }}
                    />
                </div>
            </div>

            {/* Images */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Imágenes</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Logo (Cuadrado)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-violet-400 transition-colors bg-gray-50">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setLogoFile(e.target.files?.[0] || null)}
                                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                            />
                            {logoFile && <p className="mt-2 text-xs text-green-600 font-medium">{logoFile.name}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Portada (Horizontal)</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center hover:border-violet-400 transition-colors bg-gray-50">
                            <Upload className="w-8 h-8 text-gray-400 mb-2" />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                                className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
                            />
                            {coverFile && <p className="mt-2 text-xs text-green-600 font-medium">{coverFile.name}</p>}
                        </div>
                    </div>
                </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Redes Sociales</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Instagram (URL)</label>
                        <input
                            type="url"
                            placeholder="https://instagram.com/..."
                            value={formData.redes?.instagram || ''}
                            onChange={(e) => handleSocialChange('instagram', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Facebook (URL)</label>
                        <input
                            type="url"
                            placeholder="https://facebook.com/..."
                            value={formData.redes?.facebook || ''}
                            onChange={(e) => handleSocialChange('facebook', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Sitio Web (URL)</label>
                        <input
                            type="url"
                            placeholder="https://..."
                            value={formData.redes?.website || ''}
                            onChange={(e) => handleSocialChange('website', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-violet-500"
                        />
                    </div>
                </div>
            </div>

            <div className="pt-6 border-t border-gray-200 flex justify-end">
                <button
                    type="submit"
                    disabled={loading}
                    className="flex items-center gap-2 bg-violet-600 text-white px-8 py-3 rounded-xl hover:bg-violet-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold shadow-lg shadow-violet-200"
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-5 h-5 animate-spin" />
                            Guardando...
                        </>
                    ) : (
                        <>
                            <Save className="w-5 h-5" />
                            Crear Emprendimiento
                        </>
                    )}
                </button>
            </div>
        </form>
    );
}
