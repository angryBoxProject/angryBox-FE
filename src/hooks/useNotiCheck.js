import { tokenURL } from '../Apis/API';
import { useQuery } from 'react-query';
import { getCookie } from '../shared/utils/Cookie';

const fetchnotiCheck = async () => {
    if (!getCookie('token')) return;
    const { data } = await tokenURL.get(`/notification/un-checked`);
    console.log(data.data);
    return data.data;
};

export const useNotiCheck = () => {
    return useQuery(['noticheck'], () => fetchnotiCheck(), {
        refetchOnWindowFocus: false,
        // refetchInterval: 2000,
        retry: 1,
    });
};
