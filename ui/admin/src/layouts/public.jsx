import { Outlet } from 'react-router-dom';

    function PublicLayout() {
        return  <div className="
          flex
          min-h-svh 
          w-full 
          items-center 
          justify-center 
          p-6 
          md:p-10
          bg-muted
        ">
          <div className="w-full max-w-sm">
        <Outlet />
        </div>
        </div>;
    }

export default PublicLayout;