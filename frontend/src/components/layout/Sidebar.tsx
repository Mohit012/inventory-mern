import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Button, Layout, Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { sidebarItems } from '../../constant/sidebarItems';
import { useAppDispatch } from '../../redux/hooks';
import { logoutUser } from '../../redux/services/authSlice';

const { Content, Sider } = Layout;

const Sidebar = () => {
  const [showLogoutBtn, setShowLogoutBtn] = useState(true);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClick = () => {
    dispatch(logoutUser());
    navigate('/');
  };

  return (
    <Layout className="h-screen">
      {/* Sider with minimalist dark grayscale background */}
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          if (type === 'responsive' || type === 'clickTrigger') {
            setShowLogoutBtn(!collapsed);
          }
        }}
        width="220px"
        className="bg-[#121212] relative"
      >
        <div className="demo-logo-vertical">
          {/* Heading that changes from white to silver (#AAAAAA) on hover */}
          <h1 className="text-white p-4 text-2xl text-center hover:text-[#AAAAAA] transition-colors duration-300">
            WELCOME
          </h1>
        </div>
        {/* Menu using the same dark background */}
        <Menu
          theme="dark"
          mode="inline"
          className="bg-[#121212] font-bold"
          defaultSelectedKeys={['Dashboard']}
          items={sidebarItems}
        />
        {showLogoutBtn && (
          <div className="absolute bottom-0 w-full p-4 flex justify-center">
            {/* Logout button with a steel gray background that lightens on hover */}
            <Button
              type="primary"
              className="w-full bg-[#555555] text-white font-semibold uppercase transition transform hover:bg-[#AAAAAA] hover:scale-105 hover:shadow-lg duration-300"
              onClick={handleClick}
            >
              <LogoutOutlined />
              Logout
            </Button>
          </div>
        )}
      </Sider>
      <Layout>
        {/* Content area with a light gray background */}
        <Content className="p-8 bg-[#F8F8F8]">
          <div className="p-4 max-h-[calc(100vh-4rem)] min-h-[calc(100vh-4rem)] bg-white rounded-lg overflow-auto hover:shadow-xl transition-shadow duration-300">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Sidebar;
