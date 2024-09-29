import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Sidebar from './component/Sidebar';
import ListDanhMuc from './component/DanhMuc/ListDanhMuc';
import DanhMucComponent from './component/DanhMuc/DanhMucComponent';
import ListThuongHieuComponent from './component/ThuongHieu/ListThuongHieuComponent';
import ThuongHieuComponent from './component/ThuongHieu/ThuongHieuComponent'
import ListSanPhamComponent from './component/SanPham/ListSanPhamComponent';
import SanPhamComponent from './component/SanPham/SanPhamComponent';

function App() {
  return (
    <BrowserRouter>
      <div className='app-container'>
        <div className='app-sidebar'>
          <Sidebar />
        </div>

        <div className='app-content'>
          <Routes>
            {/* Danh mục */}
            <Route path='/danh-muc' element={<ListDanhMuc />} />
            <Route path='/add-danh-muc' element={<DanhMucComponent />} />
            <Route path='/update-danh-muc/:id' element={<DanhMucComponent />} />

            {/*Thương hiệu */}
            <Route path='/thuong-hieu' element={<ListThuongHieuComponent />} />
            <Route path='/add-thuong-hieu' element={<ThuongHieuComponent />}></Route>
            <Route path='/update-thuong-hieu/:id' element={<ThuongHieuComponent />}></Route>

            {/*Sản phẩm */}
            <Route path='/san-pham' element={<ListSanPhamComponent />}></Route>
            <Route path='/add-san-pham' element={<SanPhamComponent />} />
            <Route path='/update-san-pham/:id' element={<SanPhamComponent />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
