import { tokenURL } from '../Apis/API';
import { useQuery } from 'react-query';

const fetchDiaryList = async date => {
    if (!date) return;
    const { data } = await tokenURL.get(
        `bank/statistics/calender?select=${date}`,
    );
    console.log(data);
    return data.data;
};

export const useMonthBankCalender = date => {
    return useQuery(['MonthBankCalender', date], () => fetchDiaryList(date), {
        refetchOnWindowFocus: false,
        enabled: !!date,
        // refetchInterval: 2000,
    });
};

//useMonthchart
