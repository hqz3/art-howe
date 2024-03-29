import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const StyledSearchBar = styled.input`
  border: 1px solid black;
  font-size: 1.5rem;
  grid-row: 2;
  height: 50px;
  margin: 1rem 0;
  outline: none;
  padding: 0 1rem;
  position: sticky;
  top: 1rem;
  width: 100%;
  z-index: 100;

  &::placeholder {
    font-family: "EB Garamond", serif;
    color: black;
  }

  @media screen and (max-width: 768px) {
    font-size: 1.25rem;
    height: 2.5rem;
  }
`;

export default function SearchBar() {
  const navigate = useNavigate();

  function searchHandler(e) {
    if (e.key === "Enter") {
      const query = e.target.value;
      e.target.value = "";
      navigate("/search/" + encodeURIComponent(query));
    }
  }

  return (
    <StyledSearchBar
      placeholder="Search"
      onKeyUp={searchHandler}
    ></StyledSearchBar>
  );
}
