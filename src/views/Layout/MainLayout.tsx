import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTreeItemsThunk, fetchCompanyDataThunk, AppDispatch } from "@store";
import { Filters, Header, Button, SearchInput, Skeleton } from "@components";
import { ReactNode } from "react";
import { CompanyIcon } from "@assets";

import type { CompanyState, Company } from "@types";

const NavigationComponent = ({
  data,
  onSelectCompany,
}: {
  data: Company[] | null;
  onSelectCompany: (company: Company) => void;
}) => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <>
      {data &&
        data.map(({ id, name }) => (
          <Button
            key={id}
            onClick={() => {
              dispatch(fetchTreeItemsThunk(id));
              onSelectCompany({ id, name });
            }}
            size="small"
          >
            <CompanyIcon />
            {name}
          </Button>
        ))}
    </>
  );
};

const MainLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);

  const { data, isLoading, error } = useSelector(
    (state: CompanyState) => state.company || {}
  );

  useEffect(() => {
    const handleFetch = async () => {
      if (!data) {
        await dispatch(fetchCompanyDataThunk());
      }
    };

    handleFetch();
  }, [data, dispatch]);

	if (isLoading) {
		return (
			<div className="p-4">
				<div className="flex flex-col gap-4">

					<Skeleton className="h-6 w-1/3" />
					<Skeleton className="h-8 w-full" />
	
					<div className="flex gap-2">
						<Skeleton className="h-10 w-20" />
						<Skeleton className="h-10 w-20" />
						<Skeleton className="h-10 w-20" />
					</div>
	

					<div className="grid grid-cols-[30vw_1fr] gap-2 mt-4">
						<Skeleton className="h-[300px] w-full" />
						<Skeleton className="h-[300px] w-full" />
					</div>
				</div>
			</div>
		);
	}

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Header>
        <NavigationComponent
          data={data}
          onSelectCompany={(company) => setSelectedCompany(company)}
        />
      </Header>
      <main className="border solid rounded-md shadow-lg bg-white p-4 m-4 h-[calc(100vh-100px)]">
        <div className="flex flex-row items-center pb-4 justify-between">
          <div className="flex flex-row gap-1 items-center">
            <h1 className="font-semibold text-lg">Ativos </h1>
            <p className="font-thin text-sm">
              / {selectedCompany ? selectedCompany.name : ""} Unit
            </p>
          </div>
          <SearchInput />
          <Filters />
        </div>
        <div className="grid grid-cols-[30vw_1fr] w-full gap-2">{children}</div>
      </main>
    </>
  );
};

export default MainLayout;