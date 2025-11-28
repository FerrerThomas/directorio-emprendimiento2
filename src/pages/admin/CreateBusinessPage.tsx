import BusinessForm from '../../components/admin/BusinessForm';

export default function CreateBusinessPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">Nuevo Emprendimiento</h1>
                <p className="text-gray-500">Completa la información para registrar un nuevo negocio en el directorio.</p>
            </div>

            <BusinessForm />
        </div>
    );
}
