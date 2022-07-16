import {api} from "./api";

interface User {
    email: string;
    password: string;
}

export const userApi = (() => {
    /*
    * @param {User} user
    * @returns {Promise<User>}
    */
    const createUser = async ({email, password}: User) => {
        return await api.post(`/users`,
            {
                'email': email,
                'password': password,
            });
    }

    return {
        createUser,
    }
})();