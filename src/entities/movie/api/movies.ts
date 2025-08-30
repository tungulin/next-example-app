import axios from 'axios';
import { GetMoviesParams, AddFavoriteParams, GetMoviesResult } from './types';
import { useQuery } from '@tanstack/react-query';

const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API + '/movies',
});

export const getMovies = async (params: GetMoviesParams) => {
    return instance
        .get<GetMoviesResult>('/', { params })
        .then(resp => resp.data);
};

export const useMovies = (page: number, search?: string) => {
    return useQuery({
        queryKey: ['movies', page, search],
        queryFn: () => getMovies({ page, search }),
    });
};

export const addFavoriteMovie = async (params: AddFavoriteParams) => {
    return instance.post<null>('/favorite/add', params).then(resp => resp.data);
};

export const removeFavoriteMovie = async (params: AddFavoriteParams) => {
    return instance
        .post<null>('/favorite/remove', params)
        .then(resp => resp.data);
};
