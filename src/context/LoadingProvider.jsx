import {createContext, useCallback, useContext, useMemo, useState} from "react";
import PropTypes from "prop-types";

const LoadingContext = createContext({isLoading: false, setLoading: () => {}});

export const LoadingProvider = ({children}) => {
    const [activeLoaders, setActiveLoaders] = useState(() => new Set());
    const setLoading = useCallback((id, active) => {
        setActiveLoaders(previous => {
            if (previous.has(id) === active) return previous;
            const next = new Set(previous);
            if (active) next.add(id);
            else next.delete(id);
            return next;
        });
    }, []);
    const value = useMemo(() => ({
        isLoading: activeLoaders.size > 0,
        setLoading,
    }), [activeLoaders, setLoading]);

    return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
};

LoadingProvider.propTypes = {children: PropTypes.node.isRequired};

// Shared by the visual loader and custom cursor.
// eslint-disable-next-line react-refresh/only-export-components
export const useLoading = () => useContext(LoadingContext);
