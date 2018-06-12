import styled from 'styled-components';

const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 15px;
  width: 380px;

  & > .Section{
    border-radius: 0;
    padding: 10px 15px;
    margin: 10px 2px;

    h4{
      margin: 0 0 10px;
    }
  }
`;

export default SectionContent;
