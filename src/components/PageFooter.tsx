import React from 'react';
import styled from 'styled-components/macro';
import { Trans, withTranslation } from 'react-i18next';
import logoSvg from '../img/tulsa-public-schools-logo.svg';

const StyledFooter = styled.div`
  flex-shrink: 0;

  display: flex;
  align-items: center;
  flex-direction: column;
  width: 100%;
  padding: 8px;

  @media screen and (min-width: 480px) {
    flex-direction: row;
  }
`;
const LogoImg = styled.img`
  height: 96px;
  margin: 8px;
`;
const Copy = styled.div`
  text-align: center;
  margin: 8px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.grey.darker};
`;

const PageFooter: React.FC = () => {
  return (
    <StyledFooter>
      <LogoImg src={logoSvg} alt='Tulsa Public Schools' />
      <Copy>
        <Trans i18nKey='footer.specialThanks'>
          Special thanks to <strong>Tulsa Public Schools</strong> for their support and partnership
          on this project. The Supplemental Nutrition Assistance Program (SNAP) is a federal
          program, administered by the office of the
          <strong>Oklahoma Department of Human Services</strong> (OKDHS). For more information about
          OKDHS, visit <a href='http://www.okdhslive.org/'>okdhslive.org</a> or call (405) 487-5483.
        </Trans>
      </Copy>
    </StyledFooter>
  );
};
// This `withTranslation` HOC is required here for some weird reason I can't figure out.
// Nowhere else is it required for translations to work properly... :/
export default withTranslation()(PageFooter);
