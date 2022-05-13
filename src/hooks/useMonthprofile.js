import { tokenURL } from '../Apis/API';
import { useQuery } from 'react-query';

const fetchDiaryList = async date => {
    // if (!date) return;
    const { data } = await tokenURL.get(`bank/statistics/profile`);
    // console.log(data);

    return data.data;
};

export const useMonthprofile = date => {
    return useQuery(['Monthprofile', date], () => fetchDiaryList(date), {
        refetchOnWindowFocus: false,
        // enabled: !!date,
        // refetchInterval: 2000,
    });
};

//useMonthchart
