import React, { useState, useEffect } from 'react';
import {
    createHoaDon,
    deleteHoaDon,
    listChiTietSanPham,
    listChiTietHoaDonByHoaDonId,
    createChiTietHoaDon,
    deleteChiTietHoaDon,
    updateHoaDon
} from '../../service/BanHangService';
import ProductModal from './ProductModal';

const BanHang = () => {
    const [hoaDons, setHoaDons] = useState([]);
    const [khachHangId, setKhachHangId] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [selectedHoaDonIndex, setSelectedHoaDonIndex] = useState(null);
    const [chiTietSanPhams, setChiTietSanPhams] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [chiTietHoaDons, setChiTietHoaDons] = useState([]);
    const [tienThanhToan, setTienThanhToan] = useState(0);
    const [tienThua, setTienThua] = useState(0);

    useEffect(() => {
        const savedHoaDons = JSON.parse(localStorage.getItem('hoaDons') || '[]');
        const unPaidHoaDons = savedHoaDons.filter(hoaDon => hoaDon.trangThai !== 'Đã thanh toán');
        setHoaDons(unPaidHoaDons);

        listChiTietSanPham({ page: 0, size: 10 }, true).then(response => {
            setChiTietSanPhams(response.data.content);
        }).catch(error => {
            console.error('Error fetching products:', error);
        });
    }, []);

    useEffect(() => {
        if (selectedHoaDonIndex !== null) {
            const hoaDonId = hoaDons[selectedHoaDonIndex].id;
            listChiTietHoaDonByHoaDonId(hoaDonId).then(response => {
                console.log('Chi tiết hóa đơn:', response.data);
                setChiTietHoaDons(response.data);
            }).catch(error => {
                console.error('Error fetching invoice details:', error);
            });
        }
    }, [hoaDons, selectedHoaDonIndex]);

    const handleCreateHoaDon = async () => {
        if (hoaDons.length >= 6) {
            setErrorMessage('Đã đạt số lượng hóa đơn tối đa 6.');
            return;
        }

        try {
            const newHoaDon = { khachHangId: khachHangId || null };

            const response = await createHoaDon(newHoaDon);
            console.log('Hóa đơn mới đã được tạo:', response.data);
            const updatedHoaDons = [...hoaDons, response.data];
            setHoaDons(updatedHoaDons);
            localStorage.setItem('hoaDons', JSON.stringify(updatedHoaDons));
            setErrorMessage('');
        } catch (error) {
            console.error('Error creating invoice:', error);
        }
    };

    const handleDeleteHoaDon = async (hoaDonId) => {
        try {
            console.log('Đang xóa hóa đơn với ID:', hoaDonId);
            await deleteHoaDon(hoaDonId);
            const updatedHoaDons = hoaDons.filter(hoaDon => hoaDon.id !== hoaDonId);
            setHoaDons(updatedHoaDons);
            localStorage.setItem('hoaDons', JSON.stringify(updatedHoaDons));
            if (selectedHoaDonIndex !== null) {
                setSelectedHoaDonIndex(null);
            }
        } catch (error) {
            console.error('Error deleting invoice:', error);
        }
    };

    const handleSelectHoaDon = (index) => {
        console.log('Chọn hóa đơn:', hoaDons[index].maHoaDon);
        setSelectedHoaDonIndex(index === selectedHoaDonIndex ? null : index);
    };

    const handleAddProduct = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleAddToInvoiceDetails = async (product, soLuong) => {
        console.log('Đang thêm sản phẩm vào chi tiết hóa đơn:', product, soLuong);
        const hoaDonId = hoaDons[selectedHoaDonIndex].id;
        const newDetail = {
            hoaDonId,
            chiTietSanPhamId: product.id,
            soLuongMua: soLuong,
            donGia: product.gia,
        };

        // Tìm sản phẩm đã có trong chi tiết hóa đơn
        const existingDetailIndex = chiTietHoaDons.findIndex(detail => detail.chiTietSanPhamId === product.id);
        let updatedChiTietHoaDons = [...chiTietHoaDons]; // Sao chép mảng để cập nhật state

        if (existingDetailIndex >= 0) {
            // Nếu sản phẩm đã tồn tại, cập nhật số lượng và thành tiền
            updatedChiTietHoaDons[existingDetailIndex].soLuongMua += soLuong;
            updatedChiTietHoaDons[existingDetailIndex].thanhTien = updatedChiTietHoaDons[existingDetailIndex].soLuongMua * updatedChiTietHoaDons[existingDetailIndex].donGia;
        } else {
            // Nếu sản phẩm mới, thêm sản phẩm vào chi tiết hóa đơn
            newDetail.thanhTien = soLuong * product.gia;
            updatedChiTietHoaDons.push(newDetail);
        }

        // Cập nhật lại state của chi tiết hóa đơn
        setChiTietHoaDons(updatedChiTietHoaDons);

        try {
            // Lưu chi tiết hóa đơn lên server
            await createChiTietHoaDon(hoaDonId, newDetail);
            console.log('Chi tiết hóa đơn đã được lưu thành công');

            // Lấy lại chi tiết hóa đơn và tổng tiền từ server
            const response = await listChiTietHoaDonByHoaDonId(hoaDonId);
            console.log('Chi tiết hóa đơn sau khi lưu:', response.data);
            setChiTietHoaDons(response.data);

            // Cập nhật lại tổng tiền của hóa đơn từ server
            const updatedHoaDons = hoaDons.map(hoaDon =>
                hoaDon.id === hoaDonId ? { ...hoaDon, tongTien: response.data.tongTien } : hoaDon
            );
            setHoaDons(updatedHoaDons);
            localStorage.setItem('hoaDons', JSON.stringify(updatedHoaDons));
        } catch (error) {
            console.error('Lỗi khi lưu chi tiết hóa đơn:', error.response ? error.response.data : error.message);
        }

        setShowModal(false);
    };

    const tongTien = chiTietHoaDons.reduce((total, chiTiet) => {
        const thanhTien = chiTiet.soLuongMua * chiTiet.gia;
        return total + thanhTien;
    }, 0);

    const handleTienThanhToanChange = (e) => {
        const thanhToan = parseFloat(e.target.value);
        setTienThanhToan(thanhToan);

        const calculatedTienThua = thanhToan - tongTien;
        setTienThua(calculatedTienThua > 0 ? calculatedTienThua : 0);
    };

    useEffect(() => {
        setTienThua(tienThanhToan - tongTien > 0 ? tienThanhToan - tongTien : 0);
    }, [tongTien, tienThanhToan]);

    const handleThanhToan = async () => {
        const hoaDonId = hoaDons[selectedHoaDonIndex]?.id;

        if (!hoaDonId) {
            alert('Vui lòng chọn hóa đơn để thanh toán.');
            return;
        }

        const hoaDon = hoaDons[selectedHoaDonIndex];
        const totalAmount = hoaDon.tongTien;
        const paymentAmount = tienThanhToan;

        if (paymentAmount < totalAmount) {
            alert('Số tiền thanh toán không đủ.');
            return;
        }

        const extraAmount = paymentAmount - totalAmount;

        const updatedHoaDon = {
            ...hoaDon,
            trangThai: 'Đã thanh toán',
            tienThanhToan: paymentAmount,
            tienThua: extraAmount,
        };

        try {
            await updateHoaDon(hoaDonId, updatedHoaDon);  // Gọi API để cập nhật trạng thái hóa đơn

            console.log('Hóa đơn đã được thanh toán.');

            // Cập nhật lại danh sách hóa đơn trong state
            const updatedHoaDons = hoaDons.map((hoaDon, index) =>
                index === selectedHoaDonIndex ? updatedHoaDon : hoaDon
            );

            // Lọc lại các hóa đơn chưa thanh toán
            const unPaidHoaDons = updatedHoaDons.filter(hoaDon => hoaDon.trangThai !== 'Đã thanh toán');
            setHoaDons(unPaidHoaDons);  // Cập nhật lại state với hóa đơn chưa thanh toán

            localStorage.setItem('hoaDons', JSON.stringify(unPaidHoaDons));  // Lưu lại vào localStorage

            alert('Thanh toán thành công!');

            // Nếu không còn hóa đơn nào chưa thanh toán, tải lại trang
            if (unPaidHoaDons.length === 0) {
                window.location.reload();
            }
        } catch (error) {
            console.error('Lỗi khi thanh toán:', error);
            alert('Có lỗi xảy ra khi thanh toán.');
        }
    };

    const handleDeleteProduct = async (chiTietHoaDonId) => {
        try {
            await deleteChiTietHoaDon(chiTietHoaDonId); // Gọi API để xóa chi tiết hóa đơn trên server
            // Cập nhật lại chi tiết hóa đơn sau khi xóa
            const hoaDonId = hoaDons[selectedHoaDonIndex].id;
            const response = await listChiTietHoaDonByHoaDonId(hoaDonId);
            setChiTietHoaDons(response.data);

            // Cập nhật lại tổng tiền của hóa đơn
            const updatedHoaDons = hoaDons.map(hoaDon =>
                hoaDon.id === hoaDonId ? { ...hoaDon, tongTien: response.data.tongTien } : hoaDon
            );
            setHoaDons(updatedHoaDons);
            localStorage.setItem('hoaDons', JSON.stringify(updatedHoaDons));
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm khỏi chi tiết hóa đơn:', error);
        }
    };

    return (
        <div className='container mb-3'>
            <h5>Bán hàng</h5>
            <div className='card'>
                <div className='card-body'>
                    <button className='btn btn-outline-primary m-3' onClick={handleCreateHoaDon}>
                        Tạo hóa đơn
                    </button>
                    {errorMessage && (
                        <div className="alert alert-warning" role="alert">
                            {errorMessage}
                        </div>
                    )}
                    <ul className="nav nav-tabs" id="hoaDonTab" role="tablist">
                        {hoaDons.map((hoaDon, index) => (
                            <li className="nav-item mt-4" key={index} style={{ marginLeft: '15px', marginRight: '27px' }}>
                                <span
                                    onClick={() => handleSelectHoaDon(index)}
                                    style={{
                                        cursor: 'pointer',
                                        fontWeight: selectedHoaDonIndex === index ? 'bold' : 'normal',
                                        textDecoration: selectedHoaDonIndex === index ? 'underline' : 'none',
                                        marginRight: 'auto'
                                    }}
                                >
                                    Hóa đơn {index + 1} - {hoaDon.maHoaDon}
                                </span>
                                <span
                                    onClick={() => handleDeleteHoaDon(hoaDon.id)}
                                    style={{
                                        cursor: 'pointer',
                                        marginLeft: '2px',
                                    }}
                                >
                                    <i className='bi bi-trash'></i>
                                </span>
                            </li>
                        ))}
                    </ul>

                    {selectedHoaDonIndex !== null && (
                        <div className='mt-3'>
                            <div className='d-flex justify-content-between align-items-center'>
                                <h6 className='ms-3'>Sản phẩm</h6>
                                <button className="btn btn-outline-secondary me-5" onClick={handleAddProduct}>Thêm sản phẩm</button>
                            </div>
                            <hr />
                            {/* Danh sách chi tiết hóa đơn */}
                            <h6 className='ms-3'>Giỏ hàng</h6>
                            {chiTietHoaDons.length === 0 ? (
                                <p className='text-center'>Chưa có chi tiết hóa đơn.</p>
                            ) : (
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th scope="col">Sản phẩm</th>
                                            <th scope="col">Số lượng</th>
                                            <th scope="col">Đơn giá</th>
                                            <th scope="col">Thành tiền</th>
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {(() => {
                                            return chiTietHoaDons.map((chiTiet, index) => {
                                                const thanhTien = chiTiet.soLuongMua * chiTiet.gia;

                                                return (
                                                    <tr key={index}>
                                                        <td>{chiTiet.tenChiTietSanPham}</td>
                                                        <td>{chiTiet.soLuongMua}</td>
                                                        <td>{chiTiet.gia} VNĐ</td>
                                                        <td>{thanhTien} VNĐ</td>
                                                        <td>
                                                            <button
                                                                className="btn btn-outline-danger btn-sm"
                                                                onClick={() => handleDeleteProduct(chiTiet.id)} // Hàm xóa
                                                            >
                                                                <i className='bi bi-trash'></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                );
                                            });
                                        })()}
                                    </tbody>

                                </table>
                            )}
                            <hr />
                            <h6 className='ms-3'>Hóa đơn</h6>
                            <div style={{ float: 'right', marginRight: '20px', marginTop: '20px' }}>
                                <table className="table table-borderless">
                                    <tbody>
                                        <tr>
                                            <td>ID hóa đơn:</td>
                                            <td>{hoaDons[selectedHoaDonIndex].id}</td>
                                        </tr>
                                        <tr>
                                            <td>Mã hóa đơn:</td>
                                            <td>{hoaDons[selectedHoaDonIndex].maHoaDon}</td>
                                        </tr>
                                        <tr>
                                            <td>Ngày tạo:</td>
                                            <td>{hoaDons[selectedHoaDonIndex].ngayTao}</td>
                                        </tr>
                                        <tr>
                                            <td>Tên nhân viên:</td>
                                            <td>{hoaDons[selectedHoaDonIndex].tenNhanVien}</td>
                                        </tr>
                                        <tr>
                                            <td>Tên khách hàng:</td>
                                            <td>{hoaDons[selectedHoaDonIndex].tenKhachHang}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Tổng tiền:</b></td>
                                            <td><b>{tongTien} VNĐ</b></td>
                                        </tr>
                                        <tr>
                                            <td><b>Tiền thanh toán:</b></td>
                                            <td>
                                                <input
                                                    type="number"
                                                    value={tienThanhToan}
                                                    onChange={handleTienThanhToanChange}
                                                    className="form-control"
                                                    style={{ width: '150px' }}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><b>Tiền thừa:</b></td>
                                            <td><b>{tienThua} VNĐ</b></td>
                                        </tr>

                                    </tbody>
                                </table>
                                {chiTietHoaDons.length > 0 && (
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-outline-success me-3" style={{width: "100%"}} onClick={handleThanhToan}>Thanh toán</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <ProductModal
                showModal={showModal}
                onClose={handleCloseModal}
                onAddProduct={handleAddToInvoiceDetails}
                products={chiTietSanPhams}
            />
        </div>
    );
};

export default BanHang;
