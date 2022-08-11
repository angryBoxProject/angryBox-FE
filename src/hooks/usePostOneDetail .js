import { tokenURL } from '../Apis/API';
import { useQuery } from 'react-query';

const fetchDiaryList = async date => {
    if (!date) return;
    const { data } = await tokenURL.get(`/diaries/${date}`);
    return data.data;
};

export const usePostOneDetail = date => {
    return useQuery(['PostOneDetail', date], () => fetchDiaryList(date), {
        refetchOnWindowFocus: false,
        // enabled: !!date,
        // refetchInterval: 2000,
    });
};

//useMonthchart
