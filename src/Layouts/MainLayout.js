import styled from "styled-components";
import theme from '../Styles/theme';

import Nav from '../shared/Nav';
import Contents from './Contents';

const MainLayout = props => {
    const {
        nav = true,
        children = null,
    } = props;

    return(
        <BaseLayout>
            {nav && <Nav/>}
            <Container>
                {children}
            </Container>
        </BaseLayout>
    )
}
const BaseLayout = styled.div`
    background-color: ${theme.color.black};
    width: 100%;
    height: 100vh;
    display: flex;
`;
const Container = styled.div`
    width: 100%;
    padding: 0 0 50px 8px;
    height: 100vh;
    
`;
export default MainLayout