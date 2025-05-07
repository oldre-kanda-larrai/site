import { RouterProvider } from 'react-router-dom';

import { Toaster } from "@/components/ui/sonner"
import router from './router';
import { Provider as HooksProvider } from './hooks';

function App() {
  return (<HooksProvider>
  <>  
    <RouterProvider router={router} />
    <Toaster />
  </>  
  </HooksProvider>
  )
}

export default App;