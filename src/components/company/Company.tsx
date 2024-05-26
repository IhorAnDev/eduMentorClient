'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Company } from '@/types';
import { setCompany } from '@/store/slices/CompanySlice';
import { AppDispatch, RootState } from '@/store/store';
import { companyMock } from '@/components/company/company-mock';

const CompanyPageClient = ({ company }: { company: Company }) => {
  const dispatch = useDispatch<AppDispatch>();
  // const companyState = useSelector((state: RootState) => state.company);
  const { companyState } = companyMock;

  useEffect(() => {
    dispatch(setCompany(company));
  }, [company, dispatch]);

  return (
    <div className="text-3xl text-red-500">
      Company: {company.companyName || companyState.companyName}
    </div>
  );
};

export default CompanyPageClient;
