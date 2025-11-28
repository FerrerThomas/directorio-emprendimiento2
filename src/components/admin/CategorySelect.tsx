import { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { categoriesHierarchy, CategoryNode } from '../../data/categoriesHierarchy';

interface CategorySelectProps {
    onSelect: (categoryId: string, categoryName: string) => void;
    selectedId?: string;
}

export default function CategorySelect({ onSelect, selectedId }: CategorySelectProps) {
    const [level1] = useState<CategoryNode[]>(categoriesHierarchy);
    const [level2, setLevel2] = useState<CategoryNode[]>([]);
    const [level3, setLevel3] = useState<CategoryNode[]>([]);

    const [selectedL1, setSelectedL1] = useState<string | null>(null);
    const [selectedL2, setSelectedL2] = useState<string | null>(null);

    const handleL1Click = (node: CategoryNode) => {
        setSelectedL1(node.id);
        setSelectedL2(null);
        setLevel2(node.children || []);
        setLevel3([]);
        if (!node.children || node.children.length === 0) {
            onSelect(node.id, node.nombre);
        }
    };

    const handleL2Click = (node: CategoryNode) => {
        setSelectedL2(node.id);
        setLevel3(node.children || []);
        if (!node.children || node.children.length === 0) {
            onSelect(node.id, node.nombre);
        }
    };

    const handleL3Click = (node: CategoryNode) => {
        onSelect(node.id, node.nombre);
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-200 rounded-lg p-4 bg-gray-50 h-64">
            {/* Level 1 */}
            <div className="overflow-y-auto border-r border-gray-200 pr-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Categoría Principal</h4>
                <div className="space-y-1">
                    {level1.map(node => (
                        <button
                            key={node.id}
                            type="button"
                            onClick={() => handleL1Click(node)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${selectedL1 === node.id ? 'bg-violet-100 text-violet-700 font-medium' : 'hover:bg-gray-200 text-gray-700'
                                }`}
                        >
                            {node.nombre}
                            {node.children && <ChevronRight className="w-4 h-4 opacity-50" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Level 2 */}
            <div className="overflow-y-auto border-r border-gray-200 px-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Subcategoría</h4>
                {level2.length === 0 && selectedL1 && <p className="text-xs text-gray-400 italic">Sin subcategorías</p>}
                <div className="space-y-1">
                    {level2.map(node => (
                        <button
                            key={node.id}
                            type="button"
                            onClick={() => handleL2Click(node)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${selectedL2 === node.id ? 'bg-violet-100 text-violet-700 font-medium' : 'hover:bg-gray-200 text-gray-700'
                                }`}
                        >
                            {node.nombre}
                            {node.children && <ChevronRight className="w-4 h-4 opacity-50" />}
                            {!node.children && selectedId === node.id && <Check className="w-4 h-4 text-violet-600" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Level 3 */}
            <div className="overflow-y-auto pl-2">
                <h4 className="text-xs font-semibold text-gray-500 uppercase mb-2">Específico</h4>
                {level3.length === 0 && selectedL2 && <p className="text-xs text-gray-400 italic">Selección final</p>}
                <div className="space-y-1">
                    {level3.map(node => (
                        <button
                            key={node.id}
                            type="button"
                            onClick={() => handleL3Click(node)}
                            className={`w-full text-left px-3 py-2 rounded-md text-sm flex items-center justify-between ${selectedId === node.id ? 'bg-violet-600 text-white font-medium' : 'hover:bg-gray-200 text-gray-700'
                                }`}
                        >
                            {node.nombre}
                            {selectedId === node.id && <Check className="w-4 h-4 text-white" />}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
