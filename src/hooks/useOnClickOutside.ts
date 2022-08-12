import {RefObject, useEffect} from "react";

function useOnClickOutside(ref: RefObject<HTMLElement>, handler: (e: any) => void) {
    useEffect(() => {
        const listener = (event: any) => {
            if (!ref?.current || !ref?.current?.contains(event?.target)) {
                return;
            }
            handler(event);
        };
        document.addEventListener('mousedown', listener);
        return () => {
            document.removeEventListener('mousedown', listener);
        };
    }, [ref, handler]);
}

export default useOnClickOutside;
