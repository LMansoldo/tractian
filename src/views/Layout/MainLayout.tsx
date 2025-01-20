import { useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchCompanyDataThunk } from '../../store/CompanySlice';
import { fetchTreeItemsThunk } from '../../store/TreeSlice';
import { Filters, Header, Button } from '../../components';
import { ReactNode } from 'react';

import type { CompanyState, Company} from '../../types';

const NavigationComponent = ({ data, dispatch }: { data: Company[], dispatch: AppDispatch }) => {
  return data && data.map(({id, name}) => (
    <Button onClick={() => dispatch(fetchTreeItemsThunk(id))} size="small">{name}</Button>
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
      <>
        <Header>
          <NavigationComponent data={data} dispatch={dispatch} />
        </Header>
        <main className="m-4 p-4 border solid rounded-md shadow-lg bg-white h-[80vh]">
          <div className="flex flex-row justify-end items-center p-2">
            <Filters />
          </div>
          <div className="grid grid-cols-[30%_1fr] w-full gap-2">
            {children}
          </div>
        </main>
      </>

    );
  }
};


export default MainLayout;