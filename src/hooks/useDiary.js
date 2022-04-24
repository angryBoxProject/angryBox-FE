import { tokenURL } from '../Apis/API';
import { useQuery } from 'react-query';

const fetchDiaryList = async lastDairyId => {
    if (!lastDairyId) return;
    const { data } = await tokenURL.get(
        `/diaries?liastDairyId=${lastDairyId}&size=10`,
    );
    console.log(data);
    return data;
};

export const useDiary = lastDairyId => {
    return useQuery(['diary', lastDairyId], () => fetchDiaryList(lastDairyId), {
        refetchOnWindowFocus: false,
        enabled: !!lastDairyId,
        // refetchInterval: 2000,
    });
};
