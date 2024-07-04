'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Company } from '@/types';
import { setCompany } from '@/store/slices/CompanySlice';
import { AppDispatch } from '@/store/store';

const CompanyPageClient = ({ company }: { company: Company }) => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(setCompany(company));
  }, [company, dispatch]);

  return <div className="text-3xl">Company: {company.companyName}</div>;
};

export default CompanyPageClient;
