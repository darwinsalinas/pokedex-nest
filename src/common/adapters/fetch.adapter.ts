import { Injectable } from '@nestjs/common';
import { HttpAdapter } from './http.adapter';

@Injectable()
export class FetchAdapter implements HttpAdapter {
    async get<T = any>(url: string): Promise<T> {
        console.log('FetchAdapter.get');
        try {
            const response = await fetch(url);

            const data = await response.json();

            return data;
        } catch (error) {
            console.log(error);

            throw new Error('Internal Server Error');
        }
    }
}