import Header from "../../components/common/Header";
import styled from "styled-components";
import NewSubsPost from "../subscribe/NewSubsPost";
import SubsBlog from "./SubsBlog";
import Footer from "../../components/common/Footer";
import { useEffect } from "react";
import { LBold32 } from "../../components/style/Styled";

const SubscribePage = () => {
    useEffect(() => {
        window.scrollTo({top:0, behavior:"smooth"});
    }, []);

    return(
        <div>
            <StickyWrap>
                <Header/>
            </StickyWrap>
            <Wrap>
                <PageName>Subscribed</PageName>
                <SubsBlog/>
                <NewSubsPost/>
            </Wrap>
            <Footer/>
        </div>
    );
};

export default SubscribePage;

const StickyWrap = styled.div`
    background-color: white;
    position: sticky;
    top: 0;
`

const Wrap = styled.div`
    padding: 0rem 8rem;
`
const PageName = styled(LBold32)`
    display: flex;
    padding: 0rem 0rem 1.25rem 0rem;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.625rem;
    align-self: stretch;
`