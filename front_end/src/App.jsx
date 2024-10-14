import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import ListDanhMuc from './component/DanhMuc/ListDanhMuc';
import DanhMucComponent from './component/DanhMuc/DanhMucComponent';
import ListThuongHieuComponent from './component/ThuongHieu/ListThuongHieuComponent';
import ThuongHieuComponent from './component/ThuongHieu/ThuongHieuComponent'
import ListSanPhamComponent from './component/SanPham/ListSanPhamComponent';
import SanPhamComponent from './component/SanPham/SanPhamComponent';
import ListMauSac from './component/MauSac/ListMauSac';
import Header from './component/header';
import MauSac from './component/MauSac/MauSac';
import ListChatLieu from './component/ChatLieu/ListChatLieu';
import ChatLieu from './component/ChatLieu/ChatLieu';
import ListSize from './component/Size/ListSize';
import SizeComponent from './component/Size/SizeComponent';
import ListDeGiay from './component/DeGiay/ListDeGiay';
import DeGiayComponent from './component/DeGiay/DeGiayComponent';
import ListChiTietSanPham from './component/ChiTietSanPham/ListChiTietSanPham';

function App() {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <div className='app-sidebar'>
          <Sidebar />
        </div>
        <div className='app-header'>
          <Header />
        </div>
        <div className='app-content'>

          <Routes>
            {/* Danh mục */}
            <Route path='/danh-muc' element={<ListDanhMuc />} />
            <Route path='/add-danh-muc' element={<DanhMucComponent />} />
            <Route path='/update-danh-muc/:id' element={<DanhMucComponent />} />

            {/*Thương hiệu */}
            <Route path='/thuong-hieu' element={<ListThuongHieuComponent />} />
            <Route path='/add-thuong-hieu' element={<ThuongHieuComponent />} />
            <Route path='/update-thuong-hieu/:id' element={<ThuongHieuComponent />} />

            {/*Sản phẩm */}
            <Route path='/san-pham' element={<ListSanPhamComponent />} />
            <Route path='/add-san-pham' element={<SanPhamComponent />} />
            <Route path='/update-san-pham/:id' element={<SanPhamComponent />} />

            {/*Màu sắc */}
            <Route path='/mau-sac' element={<ListMauSac />} />
            <Route path='/add-mau-sac' element={<MauSac />} />
            <Route path='/update-mau-sac/:id' element={<MauSac />} />

            {/*Chất liệu */}
            <Route path='/chat-lieu' element={<ListChatLieu />} />
            <Route path='/add-chat-lieu' element={<ChatLieu />} />
            <Route path='/update-chat-lieu/:id' element={<ChatLieu />} />

            {/*Size */}
            <Route path='/size' element={<ListSize />} />
            <Route path='/add-size' element={< SizeComponent />} />
            <Route path='/update-size/:id' element={<SizeComponent />} />

            {/*Đế giày */}
            <Route path='/de-giay' element={<ListDeGiay />} />
            <Route path='/add-de-giay' element={<DeGiayComponent />} />
            <Route path='/update-de-giay/:id' element={<DeGiayComponent />} />

            {/*Chi tiết sản phẩm */}
            <Route path='/san-pham/:id/chi-tiet' element={<ListChiTietSanPham />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
