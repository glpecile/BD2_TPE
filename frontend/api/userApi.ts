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

    /*
    * @param {User} user
    * @returns {Promise<User>}
     */
    const logInUser = async ({email, password}: User) => {
        const formData = new FormData();
        formData.append('username', email);
        formData.append('password', password);
        return await api.post(`/users/login`,
            formData);
    }

    return {
        createUser,
        logInUser
    }
})();