import { BoltIcon, EllipseIcon, EllipseGreenIcon, RouterIcon, SensorIcon } from "@assets";

interface MainScreenProps {
  selectedItem?: any;
}

const MainScreen: React.FC<MainScreenProps> = ({ selectedItem }) => {

	if (!selectedItem) return <div className="p-4 text-center text-slate-400 text-sm"></div>
  
	return (
    <div>
			<header className="border-b-[1px] border-solid border-grey-400 h-14 p-4 text-lg flex flex-row gap-2 items-center ">
				<h1 className="font-semibold text-xl">{selectedItem.label}</h1>
          {selectedItem.sensorType === 'energy' && <BoltIcon />}
          {selectedItem.status === 'alert' && <EllipseIcon />}
					{selectedItem.status === 'operating' && <EllipseGreenIcon />}
			</header>

			<div>
				<div className="flex flex-row gap-4 mx-4 border-b-[1px] border-solid border-grey-400 p-6">
					<div className="cursor-pointer border-2 border-dashed h-56 w-80 border-blue-400 bg-blue-200 rounded-md  flex items-center justify-center">
						<p className="text-blue-400 text-center"> Adicionar imagem do Ativo </p>
					</div>
					<div className="flex flex-col gap-4 justify-around p-6 w-full">
						<div className="flex flex-col ">
							<h5 className="text-lg font-semibold">Tipo de Equipamento</h5>
							<p className="text-slate-400 font-light">Motor Elétrico (Trifásico)</p>
						</div>
						<div className="border-b-[1px] border-solid border-grey-400 w-full " />
						<div className="flex flex-col">
							<h5 className="text-lg font-semibold">Responsáveis</h5>
							<p className="text-slate-400 font-light">Mecânica</p>
						</div>
					</div>

				</div>
				<div className="flex flex-row gap-10 justify-around p-6">
						<div className="flex flex-col">
							<h5 className="text-lg font-semibold">Sensor</h5>
							<div className="gap-2 flex"><SensorIcon /><p className="text-slate-400 font-light">RWET667</p></div>
						</div>
						<div className="flex flex-col">
							<h5 className="text-lg font-semibold">Receptor</h5>
							<div className="gap-2 flex"><RouterIcon /><p className="text-slate-400 font-light">86GTFD7</p></div>
						</div>
					</div>
			</div>
    </div>
  );
};

export default MainScreen;