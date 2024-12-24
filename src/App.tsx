import './App.css'
import { ToastContainer } from 'react-toastify'
import useRouteElememt from './useRouteElememt'

import 'react-toastify/dist/ReactToastify.css'

function App() {
  const routeElement = useRouteElememt()
  return (
    <div>
      {routeElement}
      <ToastContainer />
    </div>
  )
}

export default App
