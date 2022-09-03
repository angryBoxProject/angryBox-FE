import { tokenURL } from '../Apis/API';
import { useQuery } from 'react-query';

const fetchDiaryList = async (date, isNoti) => {
    // if (!date) return;
    console.log('userPost', date, isNoti);

    if (isNoti) {
        console.log('isNoti');
        const { data } = await tokenURL.get(`/notification/${date}`);
        return data.data;
    } else {
        const { data } = await tokenURL.get(`/diaries/${date}`);
        return data.data;
    }
};

export const usePostDetail = (date, isNoti) => {
    return useQuery(['PostDetail', date], () => fetchDiaryList(date, isNoti), {
        refetchOnWindowFocus: false,
        // enabled: !!date,
        // refetchInterval: 2000,
    });
};

//useMonthchart
