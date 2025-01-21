import { MainLayout, TreeView, MainView } from '@views'
import './App.css'

function App() {
	return (
		<MainLayout>
			<aside className="border solid border-gray-300 rounded-sm h-[calc(100vh-185px)]">
				<TreeView />
			</aside>
			<section className="border solid border-gray-300 p-4 rounded-sm ">
				<MainView />
			</section>
		</MainLayout>
	)
}

export default App
