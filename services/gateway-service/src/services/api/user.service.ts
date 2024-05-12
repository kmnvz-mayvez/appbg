import axios, { AxiosResponse } from 'axios';
import { AxiosService } from '@gateway/services/axios';
import { config } from '@gateway/config';
import { IUserDocument } from 'interface/user.interface';

export let axiosUserInstance: ReturnType<typeof axios.create>;

class UserService {
    constructor() {
        const axiosService: AxiosService = new AxiosService(`${config.USER_BASE_URL}/api/v1/user`, 'user');
        axiosUserInstance = axiosService.axios;
    }

    async getCurrentUserByUsername(): Promise<AxiosResponse> {
        const response: AxiosResponse = await axiosUserInstance.get('/username');
        return response;
    }

    async getUserByUsername(username: string): Promise<AxiosResponse> {
        const response: AxiosResponse = await axiosUserInstance.get(`/${username}`);
        return response;
    }

    async getUserByEmail(): Promise<AxiosResponse> {
        const response: AxiosResponse = await axiosUserInstance.get('/email');
        return response;
    }

    async getUserByPlate(plate: string): Promise<AxiosResponse> {
        const response: AxiosResponse = await axiosUserInstance.get(`/username/${plate}`);
        return response;
    }

    async getUserByStay(hour: number): Promise<AxiosResponse> {
        const response: AxiosResponse = await axiosUserInstance.get(`/username/plate/${hour}`);
        return response;
    }

    async updateUser(userId: string, body: IUserDocument): Promise<AxiosResponse> {
        const response: AxiosResponse = await axiosUserInstance.put(`/${userId}`, body);
        return response;
    }

    async seed(count: string): Promise<AxiosResponse> {
        const response: AxiosResponse = await axiosUserInstance.put(`/seed/${count}`);
        return response;
    }
}

export const userService: UserService = new UserService();
