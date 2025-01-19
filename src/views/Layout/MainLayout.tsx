import { useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchCompanyDataThunk } from '../../store/CompanySlice';
import { fetchTreeItemsThunk } from '../../store/TreeSlice';
import { ReactNode } from 'react';

import type { CompanyState, Company} from '../../types';

const NavigationComponent = ({ data, dispatch }: { data: Company[], dispatch: AppDispatch }) => {
  return data && data.map(({id, name}) => (
    <button onClick={() => dispatch(fetchTreeItemsThunk(id))}>{name}</button>
  ))
}

const MainLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, error } = useSelector((state: CompanyState) => state.company || {});

  useEffect(() => {
    const handleFetch = async () => {
      if (!data) {
       await dispatch(fetchCompanyDataThunk());
      }
    };

    handleFetch();
  }, [data, dispatch]);

	if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  if (data) {
    return (
      <main>
        <header>
          <NavigationComponent data={data} dispatch={dispatch} />
        </header>
        {children}
      </main>
    );
  }
};


export default MainLayout;