import { tokenURL } from '../Apis/API';
import { useQuery } from 'react-query';

const fetchNotiList = async (lastNotiId, hasMorePosts) => {
    if (lastNotiId === undefined) return;
    if (!hasMorePosts) return;

    const { data } = await tokenURL.get(`/notification/${lastNotiId}/10`);
    return data.data.ntfList;
};

export const useNotification = (lastNotiId, hasMorePosts) => {
    return useQuery(
        ['notification', lastNotiId],
        () => fetchNotiList(lastNotiId, hasMorePosts),
        {
            refetchOnWindowFocus: false,
            // enabled: !!lastNotiId,
            // refetchInterval: 2000,
        },
    );
};
