import { supabase } from '../lib/supabase';

export interface BusinessData {
    nombre: string;
    descripcion_corta: string;
    descripcion_larga?: string;
    categoria_id: string; // This is the leaf category ID
    telefono?: string;
    direccion?: string;

    redes?: Record<string, string>;
    logo_url?: string;
    portada_url?: string;
    published: boolean;
}

export const createBusiness = async (data: BusinessData) => {
    // 1. Insert into 'emprendimientos'
    // Note: 'categoria_id' is also a column in 'emprendimientos' based on the schema provided by the user.
    // It seems redundant with 'emprendimiento_categorias' table, but we should populate it if it exists in the schema.

    const { data: newBusiness, error: businessError } = await supabase
        .from('emprendimientos')
        .insert({
            nombre: data.nombre,
            descripcion_corta: data.descripcion_corta,
            descripcion_larga: data.descripcion_larga,
            categoria_id: data.categoria_id, // Setting the main category
            telefono: data.telefono,
            direccion: data.direccion,
            redes: data.redes,
            logo_url: data.logo_url,
            portada_url: data.portada_url,
            published: data.published,
        })
        .select()
        .single();

    if (businessError) throw businessError;

    // 2. Insert into 'emprendimiento_categorias'
    // The user schema shows a many-to-many relation table. Even if we only select one category now,
    // we should populate this table to maintain consistency.
    const { error: relationError } = await supabase
        .from('emprendimiento_categorias')
        .insert({
            emprendimiento_id: newBusiness.id,
            categoria_id: data.categoria_id,
        });

    if (relationError) {
        // Optional: Rollback business creation if relation fails? 
        // For now, just throw error.
        console.error('Error linking category:', relationError);
        throw relationError;
    }

    return newBusiness;
};

export const uploadImage = async (file: File, bucket: string = 'emprendimientos') => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

    if (uploadError) {
        throw uploadError;
    }

    const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
    return data.publicUrl;
};
