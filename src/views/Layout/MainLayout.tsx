import { useEffect } from 'react';
import { useDispatch, useSelector, } from 'react-redux';
import { AppDispatch } from '../../store';
import { fetchCompanyDataThunk } from '../../store/CompanySlice';
import { fetchTreeItemsThunk } from '../../store/TreeSlice';

import type { CompanyState } from '../../types';

const MainComponent = () => {
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

  return (
    <div>
			{data && data.map(({id, name}) => (
				<button onClick={() => dispatch(fetchTreeItemsThunk(id))}>{name}</button>
			))}

			{error && <p>Error: {error}</p>}
    </div>
  );
};

export default MainComponent;