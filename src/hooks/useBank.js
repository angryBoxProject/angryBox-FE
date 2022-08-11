import { tokenURL } from '../Apis/API';
import { useQuery } from 'react-query';
import { getCookie } from '../shared/utils/Cookie';

const fetchbank = async () => {
    if (!getCookie('token')) return;
    const { data } = await tokenURL.get(`/bank`);
    return data.data;
};

export const useBank = () => {
    return useQuery(['bank'], () => fetchbank(), {
        refetchOnWindowFocus: false,
        // refetchInterval: 2000,
        retry: 1,
    });
};
