import config from '@/config';

class FetchApi {
    constructor(abortController) {
        this.abortController = abortController;

        this.error = null;
        this.isLoading = false;
    }

    async doRequest(url, method, body, headers ={}) {
        headers['Accept'] = 'application/json';
        headers['Content-Type'] = 'application/json';

        if (window.user) {
            headers['user_id'] = window.user.id;
        }

        if (method.toLowerCase() === 'get' && body) {
            url `${url}?${new URLSearchParams(body)}`;
            body = null;
        } else {
            body = JSON.stringify(body);
        }

        const errorStack = new Error();

        try {
            this.isLoading = true;

            const response = await fetch(`${config.baseApiURL}/${url}`, {
            method: method.toUpperCase(),
            credentials: 'include',
            headers,
            body,
            signal: this.abortController?.signal
            });

            if (response.status === 403) {
                sessionsStorage.clear();
                localStorage.clear();

                window.location.href = '/auth/login';
                return;
            }

            if (response.ok) {
                if ((/json/).test(headers.Accept || '')) {
                 const json = await response.json();

                 if (json['jwt-token']) {
                    trySetToken(json['jwt-token']);
                 }

                 return json;
                }
                
                return response;
            }

            throw response;
        } catch (ex) {
            console.error(ex);
            this.error = ex;

            if (ex.body) {
                try {
                    const json =(await ex.json());
                    ex.message = json.message || json.msg;
                }catch (err) {
                    console.error(err);
                }
            }

            if (ex.status === 401 || ex.status === 403) {
                sessionStorage.clear();
                localStorage.clear();
                window.location.href = '/auth/login';
            }

            errorStack.message =ex.message || ex.statusText;
                throw errorStack; 
        }finally {
            this.isLoading = false;
        }
    }
}

export default function fetchApi(url, method, body, headers, abortController) {
    const fetchApi = new FetchApi(abortController);
    return fetchApi.doRequest(url, method, body, headers)
};