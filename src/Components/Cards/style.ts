import styled from "styled-components";

export const Container = styled.section`
  margin: 0 auto;
  max-width: 900px;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  list-style: none;

  margin: 0;
  padding: 25px;
`;

export const Overlay = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: #fff;
  text-align: center;
  border-radius: 5px;
  visibility: hidden;
  opacity: 0;
  transition: visibility 0.3s, opacity 0.3s linear;

  span {
    font-style: italic;
  }

  button {
    border: 1px solid #fff;
    background: no-repeat;
    border-radius: 38px;
    padding: 10px 21px;
    margin-top: 15px;
    color: #fff;
    cursor: pointer;
  }
`;

export const OverlayTitle = styled.h3`
  font-weight: bold;
  display: flex;
  clear: both;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
  &:after {
    content: "";
    border-bottom: 2px solid #fff;
    width: 60px;
    height: 2px;
    margin-top: 7px;
  }
`;

export const ListItem = styled.li`
  width: 31%;
  height: 192px;
  margin-bottom: 3%;
  position: relative;
  box-shadow: 2px 2px 4px #8c8c8c;
  border-radius: 5px;

  &:hover {
    ${Overlay} {
      visibility: visible;
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    height: 165px;
  }

  @media (max-width: 600px) {
    width: 48%;
    height: 165px;
  }

  @media (max-width: 480px) {
    width: 100%;
    height: 200px;
    margin-bottom: 4%;
  }
`;

export const Image = styled.img`
  border-radius: 5px;
  width: 100%;
  height: 100%;
`;

export const LoderContainer = styled.div`
  text-align: center;
`;
