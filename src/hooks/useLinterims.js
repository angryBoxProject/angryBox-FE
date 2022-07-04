import { tokenURL } from '../Apis/API';
import { useQuery } from 'react-query';
import { getCookie } from '../shared/utils/Cookie';

const fetchbanks = async () => {
    if (!getCookie('token')) return;
    const { data } = await tokenURL.get(`/interim-diary/0/10`);
    return data.data.diary;
};

export const useLinterims = () => {
    return useQuery(['Linterims'], () => fetchbanks(), {
        refetchOnWindowFocus: false,
        // refetchInterval: 2000,
    });
};
