import { forwardRef } from 'react';
import styled from 'styled-components';

import Contents from './Contents';

const MainLayout = forwardRef((props, ref) => {
    const { nav = true, children = null } = props;

    return (
        <BaseLayout>
            <Container ref={ref}>{children}</Container>
        </BaseLayout>
    );
});
const BaseLayout = styled.div`
    background-color: #fff;
    width: 100%;
    display: flex;
`;
const Container = styled.div`
    width: 100%;
`;
export default MainLayout;
