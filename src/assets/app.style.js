import styled from "styled-components";
import colors from "../assets/colors.json";
export const Container = styled.div`
  min-height: 100vh;
  /* background-color: ${colors.primary}; */
`;

export const BigText = styled.p`
  font-size: 18px;
  color: ${colors.secondary};
`;
export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  & > div {
    width: 40%;
    @media (max-width: 992px) {
      width: 100%;
    }
  }
`;
