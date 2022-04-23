import { tokenURL } from '../Apis/API';
import { useQuery } from 'react-query';

const fetchNotiList = async lastNotiId => {
    if (!lastNotiId) return;
    const { data } = await tokenURL.get(`/notification/${lastNotiId}/5`);
    return data.data.ntfList;
};

export const useNotification = lastNotiId => {
    return useQuery(
        ['notification', lastNotiId],
        () => fetchNotiList(lastNotiId),
        {
            refetchOnWindowFocus: false,
            enabled: !!lastNotiId,
            // refetchInterval: 2000,
        },
    );
};
