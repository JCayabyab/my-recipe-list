import React from "react";
import { TextField, Button, Box } from "@material-ui/core";
import styled from "styled-components";

const SearchButton = styled(Button)`
  margin: 0px 10px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
  margin-bottom: 20px;
`;

const TextFieldMargin = styled(TextField)`
  margin: 0px 10px !important;
  flex: 1;
`;

const RecipeSearchForm = ({ handleSearch }) => {
  const [userName, setUsername] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    // show after first submit

    handleSearch(userName);
  };

  return (
    <Form noValidate onSubmit={handleSubmit}>
      <Box justifyContent="center" display="flex">
        <TextFieldMargin
          label="Username"
          variant="outlined"
          onChange={e => setUsername(e.target.value)}
        >
          {userName}
        </TextFieldMargin>
      </Box>
      <SearchButton color="secondary" type="submit" variant="contained">
        Search
      </SearchButton>
    </Form>
  );
};

export default RecipeSearchForm;
