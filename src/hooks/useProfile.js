import { tokenURL } from '../Apis/API';
import { useQuery } from 'react-query';
import { getCookie } from '../shared/utils/Cookie';

const ismock = true;
const fetchProfile = async () => {
    if (ismock) {
        const mockdata = {
            diaryCount: 0,
            file: '/images/661824c4-6c1f-4286-912d-c6f2b09bd23e.jpg',
            nickname: '1111',
            recieveTodakCount: 0,
            sendTodakCount: 0,
        };
        return mockdata;
    }
    if (!getCookie('token')) return;
    const { data } = await tokenURL.get(`/profile`);
    return data.data;
};

export const useProfile = () => {
    return useQuery(['profile'], () => fetchProfile(), {
        refetchOnWindowFocus: false,
        // refetchInterval: 2000,
    });
};
