import React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import logoImageHoriz from '../img/HFO_logo_horiz.png';
import logoImageVert from '../img/HFO_logo_vert.png';
import { Link } from 'react-router-dom';

const StyledHeader = styled.div`
  flex-shrink: 0;

  display: flex;
  align-items: center;
  width: 100%;
  padding: 6px 12px;
  @media screen and (min-width: 480px) {
    padding: 12px 16px;
  }

  background-color: white;
`;
const Heading = styled.h1`
  flex: 1;
  margin: 0;
  font-size: 24px;
  display: none;
  @media screen and (min-width: 720px) {
    display: block;
  }
`;
const HeaderLogo = styled.img`
  flex: 1;
  &.mobile {
    display: block;
    max-width: 96px;
    @media screen and (min-width: 480px) {
      display: none;
    }
  }
  &.desktop {
    display: none;
    width: 256px;
    max-width: 312px;
    @media screen and (min-width: 480px) {
      display: block;
    }
  }
`;
const SwitchLanguage = styled.div`
  flex: 1;
  text-align: right;
`;
const SwitchLanguageButton = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  &.active {
    font-weight: bold;
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.primary.dark};
  }
`;

const PageHeader: React.FC = () => {
  const { t, i18n } = useTranslation();

  return (
    <StyledHeader>
      <Heading>{t('header.foodAssistance')}</Heading>

      <Link to='/'>
        <HeaderLogo src={logoImageVert} alt='Hunger Free Oklahoma' className='mobile' />
        <HeaderLogo src={logoImageHoriz} alt='Hunger Free Oklahoma' className='desktop' />
      </Link>

      <SwitchLanguage>
        <SwitchLanguageButton
          className={i18n.language === 'en' ? 'active' : ''}
          onClick={() => i18n.changeLanguage('en')}
        >
          English
        </SwitchLanguageButton>
        |
        <SwitchLanguageButton
          className={i18n.language === 'es' ? 'active' : ''}
          onClick={() => i18n.changeLanguage('es')}
        >
          Español
        </SwitchLanguageButton>
      </SwitchLanguage>
    </StyledHeader>
  );
};
export default PageHeader;
