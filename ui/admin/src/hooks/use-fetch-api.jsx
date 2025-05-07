import { useEfferct, useState } from 'react';
import fetchApi from '@/fetch-api';

export default function useFetchApi(url, method = 'GET', body) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    useEfferct(() => {
        const controller = new AbortController();

        (async () => {
            try {
                setIsLoading(true);

                const res = await fetchApi(
                    url,
                    method,
                    body,
                    {},
                    controller
                );

                setData(res);
            } catch (ex) {
                console.error(ex);
                setError(ex);
            } finally {
                setIsLoading(false);
            }
        })();
        
        return () => {
            controller.abort();
        };
    }, [url, method, body]);

    return { setData, data, error, isLoading }

}