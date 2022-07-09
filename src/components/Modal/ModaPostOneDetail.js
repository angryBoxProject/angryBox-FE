import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FlexDiv, ModalInput, Select } from '../../elements';
import theme from '../../Styles/theme';
import { ReactComponent as CloseButton } from '../../static/image/CloseButton.svg';
import Button from '../../elements/Button';
import { useDispatch, useSelector } from 'react-redux';
import useIsMount from '../../hooks/useIsMount';
import { getPost, setMakePost } from '../../redux/modules/bank';
import { useNavigate } from 'react-router-dom';
import { usePostOneDetail } from '../../hooks/usePostOneDetail ';
import { tokenURL } from '../../Apis/API';

const ModaPostOneDetail = props => {
    const {
        open,
        close,
        width,
        height,
        title,
        subtitle,
        bankId,
        contents,
        _onChange,
        listclick,
        coinBankId,
        data,
        is_twobutton,
        button1name,
        button2name,
        is_allclosebutton,
    } = props;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const scrollRef = useRef();
    const isMount = useIsMount();
    const ismember = useSelector(state => state.member.user_info).memberId;

    const ismy = data?.memberId === ismember;
    if (data === undefined) return null;
    const {
        status,
        data: detailList,
        error,
        isFetching,
        refetch,
    } = usePostOneDetail(data.id);

    const handlePublic = v => {
        return v ? '공개글' : '비공개';
    };
    const handleAngryState = v => {
        const list = ['', '극소노', '소노', '중노', '대노', '극대노'];

        return list[v];
    };
    const tokackhandle = async () => {
        try {
            await tokenURL.post(`/todack/${data.id}`, null);
        } catch (error) {
            await tokenURL.delete(`/todack/${data.id}`);
        }
        refetch();
    };
    return (
        <>
            {detailList && (
                <div className={open ? 'openModal modal' : 'modal'}>
                    {open
                        ? (refetch(),
                          (
                              <Section>
                                  <MainModal width={width} height={height}>
                                      <ModalPopup>
                                          <FlexDiv
                                              justify="space-between"
                                              padding="10px"
                                          >
                                              <FlexDiv>
                                                  <ModalTitle>
                                                      {title}
                                                  </ModalTitle>
                                                  <ModalSubTitle>
                                                      {subtitle}
                                                  </ModalSubTitle>
                                              </FlexDiv>
                                              <CloseButton onClick={close} />
                                          </FlexDiv>
                                          <FlexDiv
                                              justify="flex-start"
                                              padding="10px"
                                              width="100%"
                                          >
                                              <FlexDiv width="100%">
                                                  <ModalDetailTitle>
                                                      {detailList.diary.title}
                                                  </ModalDetailTitle>
                                                  <ModalDetailBox width="25%">
                                                      <p
                                                          style={{
                                                              color: `${theme.color.white}`,
                                                          }}
                                                      >
                                                          토닥 수
                                                      </p>
                                                      {
                                                          detailList.diary
                                                              .todackCount
                                                      }
                                                  </ModalDetailBox>
                                                  <ModalDetailBox width="20%">
                                                      {handlePublic(
                                                          detailList.diary
                                                              .public,
                                                      )}
                                                  </ModalDetailBox>
                                                  <ModalDetailBox width="20%">
                                                      {handleAngryState(
                                                          detailList.diary
                                                              .angryPhaseId,
                                                      )}
                                                  </ModalDetailBox>
                                              </FlexDiv>
                                          </FlexDiv>
                                          <FlexDiv
                                              justify="flex-start"
                                              padding="10px"
                                              width="100%"
                                          ></FlexDiv>
                                          <FlexDiv
                                              justify="flex-start"
                                              padding="10px"
                                              width="100%"
                                          >
                                              <FlexDiv width="100%">
                                                  <ModalDetailContentOutLine>
                                                      <ModalDetailContent>
                                                          {
                                                              detailList.diary
                                                                  .content
                                                          }
                                                      </ModalDetailContent>
                                                  </ModalDetailContentOutLine>
                                              </FlexDiv>
                                          </FlexDiv>

                                          <ModalButton>
                                              {is_allclosebutton ? (
                                                  <Button
                                                      margin="10px"
                                                      onClick={close}
                                                  >
                                                      {props.button1name}
                                                  </Button>
                                              ) : (
                                                  <>
                                                      <div
                                                          style={{
                                                              width: '50%',
                                                              marginRight:
                                                                  '30px',
                                                          }}
                                                      >
                                                          {is_twobutton ? (
                                                              <Button
                                                                  is_white
                                                                  margin="10px"
                                                                  onClick={
                                                                      close
                                                                  }
                                                              >
                                                                  {
                                                                      props.button2name
                                                                  }
                                                              </Button>
                                                          ) : (
                                                              <div
                                                                  style={{
                                                                      width: '50%',
                                                                  }}
                                                              ></div>
                                                          )}
                                                      </div>
                                                      <div
                                                          style={{
                                                              width: '50%',
                                                              marginRight:
                                                                  '30px',
                                                          }}
                                                      >
                                                          <Button
                                                              margin="10px"
                                                              onClick={close}
                                                          >
                                                              {
                                                                  props.button1name
                                                              }
                                                          </Button>
                                                      </div>
                                                  </>
                                              )}
                                          </ModalButton>
                                      </ModalPopup>
                                  </MainModal>
                              </Section>
                          ))
                        : null}
                </div>
            )}
        </>
    );
};

// 스타일 컴포넌트 작성 위치
const Section = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    z-index: 999;
    background-color: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
`;

const MainModal = styled.div`
    position: absolute;
    width: ${props => props.width};
    height: ${props => props.height};
    background-color: ${theme.color.black};
    border-radius: 20px;
`;
const ModalPopup = styled.div`
    height: 100%;
    padding: 20px;
`;
const ModalTitle = styled.div`
    font-family: 'Hanson';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 25px;
    padding-right: 16px;

    color: #f6f6f6;
`;
const ModalSubTitle = styled.div`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 25px;

    color: #f6f6f6;
`;
const ModalDetailTitle = styled.p`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 25px;
    /* identical to box height */

    width: 100%;
    padding: 13px;
    margin-right: 21px;
    box-sizing: border-box;
    background: #2e2e2e;
    border-bottom: 1px solid #f6f6f6;
    height: 60px;
    color: #f6f6f6;
`;
const ModalDetailBox = styled.p`
    width: ${props => props.width};
    margin: 10px;
    border: 1px solid #f6f6f6;
    box-sizing: border-box;
    border-radius: 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.color.red};
`;
const ModalDetailContentOutLine = styled.div`
    color: #f6f6f6;
    border: 1px solid #f6f6f6;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 20px;
    height: 50vh;
    width: 100%;
`;
const ModalDetailContent = styled.p`
    font-family: 'Noto Sans';
    font-style: normal;
    font-weight: 300;
    font-size: 16px;
    line-height: 22px;
`;
const ModalButton = styled.div`
    display: flex;
    position: absolute;
    bottom: 20px;
    width: 97.5%;
    justify-content: space-between;
`;

// default props 작성 위치
ModaPostOneDetail.defaultProps = {
    open: false,
    close: false,
    title: '',
    subtitle: '',
    contents: '',
    _onChange: () => {},
    width: '80%',
    height: '80%',
};

export default ModaPostOneDetail;
