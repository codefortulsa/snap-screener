import React from 'react';
import styled from 'styled-components/macro';
import useFormState from '../contexts/formState';
import { useTranslation } from 'react-i18next';

const StyledBreadcrumbs = styled.div`
  padding: 12px 0;
`;
const Breadcrumb = styled.span<{ active?: boolean }>`
  color: ${({ active, theme }) => (active ? theme.colors.grey.darkest : theme.colors.grey.dark)};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
`;
const BreadcrumbArrow = styled.span`
  padding: 0 8px;
  color: ${({ theme }) => theme.colors.grey.dark};
`;

const Breadcrumbs: React.FC = () => {
  const { t } = useTranslation();
  const [{ stage }] = useFormState();

  return (
    <StyledBreadcrumbs>
      <Breadcrumb active={stage >= 1}>{t('breadcrumbs.family')}</Breadcrumb>
      <BreadcrumbArrow>></BreadcrumbArrow>

      <Breadcrumb active={stage >= 2}>{t('breadcrumbs.income')}</Breadcrumb>
      <BreadcrumbArrow>></BreadcrumbArrow>

      <Breadcrumb active={stage >= 3}>{t('breadcrumbs.contact')}</Breadcrumb>
      <BreadcrumbArrow>></BreadcrumbArrow>

      <Breadcrumb active={stage >= 4}>{t('breadcrumbs.school')}</Breadcrumb>
    </StyledBreadcrumbs>
  );
};

export default Breadcrumbs;
