-- tạo database web_ban_giay
create database web_ban_giay;
go

-- sử dụng database web_ban_giay
use web_ban_giay;
go

-- tạo bảng thương hiệu
create table thuong_hieu(
	id int identity(1,1) primary key,
	ma_thuong_hieu varchar(30) not null unique,
	ten_thuong_hieu nvarchar(50) not null
);

-- tạo bảng đế giày
create table de_giay(
	id int identity(1,1) primary key,
	ma_de_giay varchar(30) unique not null,
	ten_de_giay nvarchar(100) not null
);

-- tạo bảng màu sắc
create table mau_sac(
	id int identity(1,1) primary key,
	ma_mau_sac varchar(30) unique not null,
	ten_mau_sac nvarchar(100) not null
);

-- tạo bảng size
create table size(
	id int identity(1,1) primary key,
	ma_size varchar(30) unique not null,
	ten_size nvarchar(100) not null
);

-- tạo bảng chất liệu
create table chat_lieu(
	id int identity(1,1) primary key,
	ma_chat_lieu varchar(30) unique not null,
	ten_chat_lieu nvarchar(100) not null
);

-- tạo bảng danh mục
create table danh_muc(
	id int identity(1,1) primary key,
	ma_danh_muc varchar(30) unique not null,
	ten_danh_muc nvarchar(100) not null
);

-- tạo bảng sản phẩm
create table san_pham(
	id int identity(1,1) primary key,
	ma_san_pham varchar(30) unique not null,
	ten_san_pham nvarchar(100) not null,
	mo_ta nvarchar(255),
	trang_thai bit default 1 not null,
	ngay_tao date not null,
	thuong_hieu_id int not null,
	danh_muc_id int not null,
	foreign key (thuong_hieu_id) references thuong_hieu(id), 
	foreign key (danh_muc_id) references danh_muc(id)
);

-- tạo bảng chi tiết sản phẩm
create table chi_tiet_san_pham(
	id int identity(1,1) primary key,
	ma_chi_tiet_san_pham varchar(50) not null,
	ten_chi_tiet_san_pham nvarchar(100) not null,
	hinh_anh nvarchar(255) not null,
	so_luong_ton int not null,
	gia decimal(10,2) not null,
	trang_thai bit not null,
	san_pham_id int not null,
	mau_sac_id int not null,
	size_id int not null,
	chat_lieu_id int not null,
	de_giay_id int not null,
	foreign key (san_pham_id) references san_pham(id),
	foreign key (mau_sac_id) references mau_sac(id),
	foreign key (size_id) references size(id),
	foreign key (chat_lieu_id) references chat_lieu(id),
	foreign key (de_giay_id) references de_giay(id)
);

-- tạo bảng khách hàng
create table khach_hang(
	id int identity(1,1) primary key,
	ma_khach_hang varchar(30) unique not null,
	ho_ten nvarchar(50) not null,
	gioi_tinh bit,
	so_dien_thoai varchar(30) unique not null,
	mat_khau varchar(50) not null,
	email varchar(50) not null unique,
	dia_chi nvarchar(255) not null
);

-- tạo bảng vai trò
create table vai_tro(
	id int identity(1,1) primary key,
	ma_vai_tro varchar(30) unique not null,
	ten_vai_tro nvarchar(100) not null
);

-- tạo bảng nhân viên
create table nhan_vien(
	id int identity(1,1) primary key,
	ma_nhan_vien varchar(30) unique not null,
	ho_ten nvarchar(100) not null,
	gioi_tinh bit,
	so_dien_thoai varchar(30) not null,
	email varchar(100) not null unique,
	mat_khau varchar(50) not null,
	dia_chi nvarchar(255) not null,
	trang_thai bit,
	vai_tro_id int not null,
	foreign key (vai_tro_id) references vai_tro(id)
);

-- tạo bảng hóa đơn
create table hoa_don(
	id int identity(1,1) primary key,
	ma_hoa_don varchar(30) not null,
	nhan_vien_id int not null,
	khach_hang_id int not null,
	ngay_tao datetime not null,
	tong_tien decimal(10,2) not null,
	tien_thanh_toan decimal(10,2) not null,
	tien_thua decimal(10,2) not null,
	trang_thai nvarchar(50) not null,
	foreign key (nhan_vien_id) references nhan_vien(id),
	foreign key (khach_hang_id) references khach_hang(id)
);

-- tạo bảng chi tiết hóa đơn
create table chi_tiet_hoa_don (
	id int identity(1,1) primary key,
	chi_tiet_san_pham_id int not null,
	hoa_don_id int not null,
	gia decimal(10,2) not null,
	so_luong_mua int not null,
	tong_tien decimal(10,2) not null,
	foreign key (chi_tiet_san_pham_id) references chi_tiet_san_pham(id),
	foreign key (hoa_don_id) references hoa_don(id)
);

-- Thêm dữ liệu cho bảng vai trò
insert into vai_tro (ma_vai_tro, ten_vai_tro) 
values ('NV', N'Nhân viên'), 
       ('QL', N'Quản lý');

-- Thêm dữ liệu cho bảng nhân viên
insert into nhan_vien (ma_nhan_vien, ho_ten, gioi_tinh, so_dien_thoai, email, mat_khau, dia_chi, trang_thai, vai_tro_id)
values 
('NV1', N'Nguyễn Văn Tùng', 1, '0869225083', 'tungnv@gmail.com', 'qwerty', 'Hà Nội', 1, 1),
('NV2', N'Đinh Diệu Linh', 0, '0967378765', 'linhdd@gmail.com', 'adfghj', 'Hà Nội', 1, 2);

-- Thêm dữ liệu cho bảng đế giày
insert into de_giay (ma_de_giay, ten_de_giay)
values
('DG001', N'Đế cao su'),
('DG002', N'Đế da tổng hợp'),
('DG003', N'Đế EVA'),
('DG004', N'Đế PU'),
('DG005', N'Đế cao su non');

-- Thêm dữ liệu cho bảng size
insert into size (ma_size, ten_size)
values
('S01', N'36'),
('S02', N'37'),
('S03', N'38'),
('S04', N'39'),
('S05', N'40'),
('S06', N'41'),
('S07', N'42');

-- Thêm dữ liệu cho bảng chất liệu
insert into chat_lieu (ma_chat_lieu, ten_chat_lieu)
values
('CL01', N'Da thật'),
('CL02', N'Vải'),
('CL03', N'Cao su'),
('CL04', N'Nhựa'),
('CL05', N'Vải lưới'),
('CL06', N'Da tổng hợp');

-- Thêm dữ liệu cho bảng màu sắc
insert into mau_sac (ma_mau_sac, ten_mau_sac)
values
('MS01', N'Đỏ'),
('MS02', N'Xanh dương'),
('MS03', N'Xanh lá cây'),
('MS04', N'Vàng'),
('MS05', N'Đen'),
('MS06', N'Trắng'),
('MS07', N'Nâu'),
('MS08', N'Be'),
('MS09', N'Hồng'),
('MS10', N'Tím');

-- Thêm dữ liệu cho bảng thương hiệu
insert into thuong_hieu (ma_thuong_hieu, ten_thuong_hieu)
values
('TH01', N'Nike'),
('TH02', N'Adidas');

-- Thêm dữ liệu cho bảng danh mục
insert into danh_muc (ma_danh_muc, ten_danh_muc)
values
('DM01', N'Giày cổ thấp'),
('DM02', N'Giày cổ cao');

-- Thêm dữ liệu sản phẩm cho Nike
insert into san_pham (ma_san_pham, ten_san_pham, mo_ta, trang_thai, ngay_tao, thuong_hieu_id, danh_muc_id)
values
('SP01', N'Air Force 1', N'Một trong những đôi giày thể thao huyền thoại của Nike, thiết kế cổ thấp, phong cách thời trang.', 1, GETDATE(), 1, 1), 
('SP02', N'Jordan', N'Giày bóng rổ Nike Air Jordan nổi tiếng với thiết kế cổ cao, mang đậm phong cách thể thao và thời trang.', 1, GETDATE(), 1, 2);
