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
	mo_ta text,
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
