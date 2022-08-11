import { tokenURL } from '../Apis/API';
import { useQuery } from 'react-query';
import { getCookie } from '../shared/utils/Cookie';

const fetchbanks = async () => {
    if (!getCookie('token')) return;
    const { data } = await tokenURL.get(`/banks`);
    return data.data;
};

export const useBanks = () => {
    return useQuery(['banks'], () => fetchbanks(), {
        refetchOnWindowFocus: false,
        // refetchInterval: 2000,
    });
};
