import { tokenURL } from '../Apis/API';
import { useQuery } from 'react-query';

const fetchDiaryList = async date => {
    if (!date) return;
    const { data } = await tokenURL.get(`bank/month/${date}`);
    if (
        data.message === '월별 통계 조회 성공(해당 월에 작성한 다이어리 없음)'
    ) {
        //해당월 데이터가 없을경우
        let notdata = {
            apList: [0, 0, 0, 0, 0],
            apPerList: [1, 1, 1, 1, 1],
        };
        return notdata;
    }
    return data.data;
};

export const useMonthchart = date => {
    return useQuery(['Monthchart', date], () => fetchDiaryList(date), {
        refetchOnWindowFocus: false,
        enabled: !!date,
        // refetchInterval: 2000,
    });
};

//useMonthchart
