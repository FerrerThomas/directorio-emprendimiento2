import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToAnchor() {
    const location = useLocation();
    const lastHash = useRef('');

    useEffect(() => {
        if (location.hash) {
            lastHash.current = location.hash.slice(1); // safe hash for further use after navigation
        } else {
            // Si no hay hash (ej: navegando a /categorias), subir al inicio
            window.scrollTo(0, 0);
        }

        if (lastHash.current && document.getElementById(lastHash.current)) {
            setTimeout(() => {
                document
                    .getElementById(lastHash.current)
                    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                lastHash.current = '';
            }, 100);
        }
    }, [location]);

    return null;
}

export default ScrollToAnchor;
