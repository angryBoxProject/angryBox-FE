import { tokenURL } from '../Apis/API';
import { useQuery } from 'react-query';

const fetchDiaryList = async date => {
    if (!date) return;
    const { data } = await tokenURL.get(`/diaries/${date}`);

    return data.data;
};

export const usePostDetail = date => {
    return useQuery(['PostDetail', date], () => fetchDiaryList(date), {
        refetchOnWindowFocus: false,
        // enabled: !!date,
        // refetchInterval: 2000,
    });
};

//useMonthchart
