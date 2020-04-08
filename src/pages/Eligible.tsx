import React, { useMemo, Fragment } from 'react';
import styled from 'styled-components/macro';
import { useTranslation, Trans } from 'react-i18next';
import { useParams } from 'react-router-dom';
import usePageView from '../hooks/usePageView';
import kebabCase from 'lodash/kebabCase';
import { analytics } from '../lib/firebase';

import Panel from '../components/Panel';
import Heading from '../components/Heading';
import SecondaryHeading from '../components/SecondaryHeading';
import Subheading from '../components/Subheading';
import Spacer from '../components/Spacer';
import useSchoolInfo from '../contexts/schoolInfo';
import ButtonLink from '../components/ButtonLink';
import { ReactComponent as IconFamily } from '../img/icons/family.svg';
import { ReactComponent as CallSvg } from '../img/icons/call.svg';
import { ReactComponent as EmailSvg } from '../img/icons/email.svg';

const PageWrapper = styled.div`
  max-width: 1024px;
  margin: 0 auto;
  @media screen and (min-width: 720px) {
    display: flex;
  }
`;
const PrimaryPanel = styled(Panel)`
  flex: 3;
  & > svg {
    display: block;
    max-width: 64px;
    margin: 0 auto 24px;
    @media screen and (min-width: 720px) {
      max-width: 96px;
    }
    path,
    ellipse {
      fill: ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;
const SecondaryPanel = styled(Panel)`
  flex: 2;
`;
const ContactLinkRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 6px;
  margin-left: 8px;
  svg {
    width: 20px;
    height: 20px;
    margin-right: 6px;
    path {
      fill: ${({ theme }) => theme.colors.grey.dark};
    }
  }
`;
const List = styled.div`
  padding: 0;
  li {
    position: relative;
    display: block;
    margin: 0 0 16px;
    padding: 0 0 0 24px;
    &::after {
      content: '';
      position: absolute;
      left: 0;
      top: calc(50% - 5px);
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: ${({ theme }) => theme.colors.primary.dark};
    }
  }
`;

const Eligible: React.FC = () => {
  const { t } = useTranslation();
  const { school } = useParams();
  usePageView('Eligible | SNAP Screener');
  const [allSchoolContacts] = useSchoolInfo();
  const schoolContacts = useMemo(
    () =>
      allSchoolContacts.filter(
        ({ schoolName, contactFirstName }) => kebabCase(schoolName) === school && contactFirstName
      ),
    [school, allSchoolContacts]
  );

  return (
    <PageWrapper>
      <PrimaryPanel>
        <IconFamily />
        {/* Header - You may be eligible */}
        <Heading>{t('eligible.heading')}</Heading>
        <Spacer height='8px' />
        <Subheading>{t('eligible.subheading')}</Subheading>
        <Spacer height='48px' />

        {/* What happens next */}
        <SecondaryHeading>{t('eligible.whatNextHeading')}</SecondaryHeading>
        <Spacer height='8px' />
        <Subheading>{t('eligible.whatNextDescription')}</Subheading>
        <Spacer height='48px' />

        {/* Show school contacts if any */}
        {!!schoolContacts.length && (
          <>
            <SecondaryHeading>{schoolContacts[0].schoolName}</SecondaryHeading>
            <Spacer height='16px' />
            {schoolContacts.map(({ contactFirstName, contactLastName, email, phone }) => (
              <Fragment key={contactFirstName + contactLastName + email + phone}>
                <Subheading>
                  <strong>
                    {contactFirstName} {contactLastName}
                  </strong>
                </Subheading>
                <Spacer height='8px' />
                {!!phone && (
                  <ContactLinkRow>
                    <div>
                      <CallSvg />
                    </div>
                    <a href={`tel:${phone}`}>{phone}</a>
                  </ContactLinkRow>
                )}
                {!!email && (
                  <ContactLinkRow>
                    <div>
                      <EmailSvg />
                    </div>
                    <a href={`mailto:${email}`}>{email}</a>
                  </ContactLinkRow>
                )}
                <Spacer height='24px' />
              </Fragment>
            ))}
            <Spacer height='48px' />
          </>
        )}
      </PrimaryPanel>
      <Spacer width='12px' />

      {/* "You Will Need" side panel */}
      <SecondaryPanel>
        {/* You will need the following info */}
        <SecondaryHeading>{t('eligible.youWillNeedHeading')}</SecondaryHeading>
        <Spacer height='24px' />
        <List>
          {(t('eligible.youWillNeedList', { returnObjects: true }) as string[]).map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </List>
        <Spacer height='24px' />

        {/* Immediate Assistance - Call 211 */}
        <Trans i18nKey='eligible.immediateAssistance'>
          For immediate resource assistance <a href='tel:211'>Call 211</a>.
        </Trans>
        <Spacer height='16px' />

        {/* Contact WIC Office */}
        {/* prettier-ignore */}
        <Trans i18nKey='eligible.contactWICOffice'>You can also contact the <a href='https://www.tulsa-health.org/personal-and-family-health/child-health/wic'>Tulsa Health Department WIC Office</a>.</Trans>
        <Spacer height='48px' />

        {/* Apply Online */}
        {t('eligible.youCanApplyOnline')}
        <Spacer height='16px' />
        <ButtonLink
          as='a'
          href='https://www.okdhslive.org/AuthApplicantLogin.aspx'
          onClick={() => analytics.logEvent('click_application_link')}
        >
          {t('eligible.applyOnline')}
        </ButtonLink>

        <Spacer height='64px' />
      </SecondaryPanel>
    </PageWrapper>
  );
};
export default Eligible;
