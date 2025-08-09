class httpService {
    uri = "https://687e3ea8c07d1a878c31e369.mockapi.io/interactive-comments/";

    async get(endpoint, filters) {
        let newUri = new URL(`${this.uri}${endpoint}`);

        if (filters) {
            for (let key in filters) {
                newUri.searchParams.append(key, filters[key]);
            }
        }
        
        return await fetch(newUri)
            .then(res => res.json())
    }

    async post(endpoint, body) {
        return await fetch(`${this.uri}${endpoint}`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
    }

    async put(endpoint, body) {
        return await fetch(`${this.uri}${endpoint}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
        })
            .then(res => res.json())
    }

    async delete(endpoint) {
        return await fetch(`${this.uri}${endpoint}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
    }
}

export default new httpService();