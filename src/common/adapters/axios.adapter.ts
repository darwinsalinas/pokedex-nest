import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { HttpAdapter } from './http.adapter';

@Injectable()
export class AxiosAdapter implements HttpAdapter {
    async get<T = any>(url: string): Promise<T> {
        console.log('AxiosAdapter.get');

        try {
            const { data } = await axios.get<T>(url);

            return data;
        } catch (error) {
            console.log(error);

            throw new Error('Internal Server Error');
        }
    }
}