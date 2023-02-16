import { AxiosInstance } from "axios";
import { axiosInstance } from "./axiosInstance";

interface ResidentProgramManagerInterface {
    getResidents(): Promise<any>;
    getPrograms(): Promise<any>;
    addAttendee(programId: Number, residentId: Number, status: string): Promise<any>;
    addProgram(programInfo: Object): Promise<any>;
    addResident(residentInfo: Object): Promise<any>;
}

export default class ResidentProgramManager implements ResidentProgramManagerInterface {

    protected axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = axiosInstance;
    }

    async getResidents(): Promise<any> {
        let response;
        try {
            const res = await this.axiosInstance.get('/residents');
            response = res.data;
        }
        catch (e) {
            throw (e);
        }
        return response;
    }

    async getPrograms(): Promise<any> {
        let response;
        try {
            const res = await this.axiosInstance.get('/programs');
            response = res.data;
        }
        catch (e) {
            throw (e);
        }
        return response;
    }

    async addAttendee(programId: Number, residentId: Number, status: string): Promise<any> {
        let response;
        try {
            const res = await this.axiosInstance.post(`/programs/${programId}/attend`, {
                "residentId": residentId,
                "status": status
            });
            response = res.data;
        }
        catch (e) {
            throw (e);
        }
        return response;
    }

    async addProgram(programInfo: Object): Promise<any> {
        let response;
        try {
            const res = await this.axiosInstance.post(`/programs`, programInfo);
            response = res.data;
        }
        catch (e) {
            throw (e);
        }
        return response;
    }

    async addResident(residentInfo: Object): Promise<any> {
        let response;
        try {
            const res = await this.axiosInstance.post(`/residents`, residentInfo);
            response = res.data;
        }
        catch (e) {
            throw (e);
        }
        return response;
    }
}