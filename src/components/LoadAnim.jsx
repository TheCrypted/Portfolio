import {useEffect, useId, useLayoutEffect, useState} from "react";
import PropTypes from "prop-types";
import {useLoading} from "../context/LoadingProvider.jsx";

const REVEAL_DURATION = 2000;

export const LoadAnim = ({loaded}) => {
    const [display, setDisplay] = useState(true);
    const id = useId();
    const {setLoading} = useLoading();
    const visible = !loaded || display;

    useEffect(() => {
        if (!loaded) {
            setDisplay(true);
            return;
        }
        const timeout = setTimeout(() => setDisplay(false), REVEAL_DURATION);
        return () => clearTimeout(timeout);
    }, [loaded]);

    useLayoutEffect(() => {
        setLoading(id, visible);
        return () => setLoading(id, false);
    }, [id, setLoading, visible]);

    return (
        <div
            aria-hidden="true"
            style={{zIndex: visible ? 1000 : -100, pointerEvents: visible ? "auto" : "none"}}
            className={`w-full h-full ${visible ? "opacity-100" : "opacity-0"} cursor-none fixed inset-0 flex`}
        >
            {Array.from({length: 16}).map((_, i) => (
                <div key={i} style={{
                    transition: `height 500ms ease-in-out ${i * 100}ms`,
                    height: loaded ? '0' : '100%',
                }} className="bg-white w-full border border-black"/>
            ))}
        </div>
    );
};

LoadAnim.propTypes = {loaded: PropTypes.bool.isRequired};
