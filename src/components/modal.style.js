import styled from "styled-components";
import { animated } from "react-spring";
import colors from "../assets/colors.json";
export const ChatDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
export const FormFlexDiv = styled.div`
  width: ${(props) => props.width || "50%"};
  padding: 4px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
export const ImageDiv = styled.div`
  height: 40px;
  width: 40px;
  border-radius: 50%;
  position: relative;
  & > span {
    height: 12px;
    background: green;
    width: 12px;
    border-radius: 50%;
    position: absolute;
    bottom: 0;
    right: 1px;
  }
  & > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
`;
export const TabContentWrapper = styled.div`
  padding: ${(props) => props.pd || "0.8rem 1.2rem"};
  @media (max-width: 768px) {
    padding: ${(props) => props.pd || "0.4rem 0.5rem"};
  }
`;
export const ProfileImgDiv = styled.div`
  display: flex;
  align-items: center;
  background: ${(props) => props.bg || "rgba(83, 156, 8, 0.1)"} !important;
  /* opacity: 0.1; */
  padding: 0.8rem 0.5rem;
  /* border-right: 4px solid ${colors.primary}; */
  border-right: ${(props) =>
    props.hideBorder === true ? "none" : `4px solid ${colors.primary}`};
  & > p,
  & > div {
    font-size: 16px;
    margin-left: 10px;
    font-weight: bold;
  }
`;

export const ChatBoxDiv = styled.div`
  padding: 1rem;
  background: ${(props) => props.bg || "#d9d9d9"} !important;
  border-radius: 24px;
  min-height: 65vh;
  max-height: 75vh;
  overflow-y: overlay;

  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #c3c2c2;
  }

  ::-webkit-scrollbar {
    width: 3px;
    height: 7px;
  }
`;

export const ChatBox = styled.div`
  display: flex;
  justify-content: ${(props) => (props.msgType === "inbox" ? "start" : "end")};
  & > div {
    position: relative;
    max-width: 60%;
    @media (max-width: 768px) {
      max-width: 90%;
    }
    padding: 0.4rem 1.9rem 0.4rem 0.9rem;
    background: ${(props) =>
      props.msgType === "inbox" ? colors.primary : props.bg || "white"};
    color: ${(props) =>
      props.msgType === "inbox" ? "white" : props.color || colors.primary};
    font-size: 14px;
    line-height: 17px;
    border-radius: ${(props) =>
      props.msgType === "inbox" ? "0px 30px 30px 30px " : "30px 0px 30px 30px"};
    & > span {
      position: absolute;
      right: 6px;
      top: 2px;
    }
  }
  margin-top: 0.5rem;
`;

export const ModalWrapper = styled(animated.div)`
  padding-top: 1.1rem;
  padding-bottom: 1.1rem;
  position: fixed;
  display: ${(props) => (props.show === "true" ? "block" : "none")};
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  z-index: 1100;
  height: 100%;
  overflow: auto;
  display: flex;
  justify-content: center;
  align-items: ${(props) => (props.start === "true" ? "start" : "center")};
  background-color: rgba(0, 0, 0, 0.4);
  &::-webkit-scrollbar {
    width: 3px;
    height: 7px;
    visibility: hidden;
    display: none;
  }
`;

export const ModalSpace = styled.div`
  width: ${(props) => (props.spacing ? props.spacing : "319px")};
  @media (max-width: 992px) {
    display: none;
  }
`;

export const ModalContainer = styled(animated.div)`
  &::-webkit-scrollbar {
    width: 3px;
    height: 7px;
    visibility: hidden;
    display: none;
  }
  /* overflow: scroll; */
  /* overflow-x: hidden; */
  position: relative;
  margin: 0px auto;
  border-radius: 10px;
  padding: ${(props) => (props.pd ? props.pd : "10px")};
  width: 90%;
  min-height: 20vh;
  /* max-height: 80vh; */
  @media (min-width: 992px) {
    width: auto;
    /* max-height: 80vh; */
    padding: ${(props) => (props.pd ? props.pd : "40px")};
    width: ${(props) => (props.size === "large" ? "60%" : "30%")};
  }
  background: white;
  /* & > div:nth-child(2) {
    max-height: 70vh;
    overflow-y: auto;
    overflow-x: auto;
    padding-bottom: 10px;
    & > div:nth-child(1) {
      min-height: 20vh;
    }
  } */
`;

export const PositionIcon = styled.div`
  position: absolute;
  top: 15px;
  right: 20px;

  & > svg {
    fill: ${(props) => (props.iColor ? props.iColor : "black")};
    cursor: pointer;
  }
`;

export const ModalHead = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
  border-radius: 5px;
  background: ${(props) => props.style && colors.primary};
  color: ${(props) => props.style && colors.secondary};
  @media (max-width: 992px) {
    padding-top: 10px;
  }
  & > button {
    background: transparent;
    border: none;
    cursor: pointer;
  }

  & > svg {
    fill: ${(props) => (props.iColor ? props.iColor : "black")};
    cursor: pointer;
  }
`;

export const ModalTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

export const ModalFlexHeader = styled.div`
  width: ${(props) => (props.wd ? props.wd : "100%")};
  margin: 0px auto;
  border-radius: 20px;
  display: inline-flex;
  justify-content: space-around;
  align-items: center;
  background: ${colors.primary};
  padding: 10px;
  color: white;
  font-weight: bold;
  font-size: 18px;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
