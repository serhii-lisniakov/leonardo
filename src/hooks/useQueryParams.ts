import {useEffect} from "react";

function useQueryParams(searchParams: URLSearchParams, handler: () => void) {
    useEffect(() => {
        handler();
    }, [searchParams]);
}

export default useQueryParams;
