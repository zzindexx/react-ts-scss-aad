export class AADHttpService {
    async get(url: string): Promise<Response> {
        const access_token = window.localStorage.getItem("access_token");
        if (access_token !== null) {
            return fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${access_token}`
                }
            });
        } else {
            throw 'User is not authenticated';
        }
        
    }
}