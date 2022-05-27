import { tokenURL } from '../Apis/API';
import { useQuery } from 'react-query';

const fetchDiaryList = async date => {
    console.log('date', date);
    if (!date) return;
    const { data } = await tokenURL.get(`/diaries/month/${date}/0/3`);
    console.log(data);

    return data.data.diaryListInMonth;
};

export const useBankDiarylist = date => {
    return useQuery(['BankDiarylist', date], () => fetchDiaryList(date), {
        refetchOnWindowFocus: false,
        enabled: !!date,
        // refetchInterval: 2000,
    });
};

//useMonthchart
