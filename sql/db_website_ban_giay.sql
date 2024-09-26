-- tạo database web_ban_giay
create database web_ban_giay
go

-- sử dụng database web_ban_giay
use web_ban_giay
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

 -- tạo bảng đợt giảm giá cho sản phẩm
 create table dot_giam_gia(
	id int identity(1,1) primary key,
	ma_dot_giam_gia varchar(30) unique not null,
	ten_dot_giam_gia nvarchar(100) not null,
	gia_tri_giam int not null, --giảm theo % giá tiền sản phẩm : 10%, 20%,..
	ngay_bat_dau datetime not null,
	ngay_ket_thuc datetime not null,
	trang_thai bit not null
 );

 -- tạo bảng sản phẩm
create table san_pham(
	id int identity(1,1) primary key,
	ma_san_pham varchar(30) unique not null,
	ten_san_pham nvarchar(100) not null,
	mo_ta text,
	trang_thai bit default 1 not null,
	ngay_tao date not null,
	--Foreign key
	thuong_hieu_id int not null foreign key (thuong_hieu_id) references thuong_hieu(id), 
	danh_muc_id int not null foreign key (danh_muc_id) references danh_muc(id)
);

 --Tạo bảng khách hàng
 create table khach_hang(
	id int identity(1,1) primary key,
	ma_khach_hang varchar(30) unique not null,
	ho_ten nvarchar(50) not null,
	gioi_tinh bit,
	ngay_sinh date,
	so_dien_thoai varchar(30) not null,
	mat_khau varchar(50) not null,
	email varchar(50) not null unique,
	dia_chi nvarchar(255) not null
	
 );
 -- tạo bảng chi tiết sản phẩm
 create table chi_tiet_san_pham(
	id int identity(1,1) primary key,
	ma_chi_tiet_san_pham varchar(50) not null,
	hinh_anh nvarchar(255) not null,
	so_luong_ton int not null,
	gia decimal(10,2) not null,
	trang_thai bit not null,
	--Foreign key
	san_pham_id int not null foreign key (san_pham_id) references san_pham(id),
	mau_sac_id int not null foreign key (mau_sac_id) references mau_sac(id),
	size_id int not null foreign key (size_id) references size(id),
	chat_lieu_id int not null foreign key (chat_lieu_id) references chat_lieu(id),
	de_giay_id int not null foreign key (de_giay_id) references de_giay(id),
	dot_giam_gia_id int not null foreign key (dot_giam_gia_id) references dot_giam_gia(id)
 );

-- tạo bảng phiếu giảm giá
create table phieu_giam_gia(
	id int identity(1,1) primary key,
	ma_phieu_giam_gia varchar(30) not null,
	ten_phieu_giam_gia nvarchar(100) not null,
	ngay_bat_dau datetime not null,
	ngay_ket_thuc datetime not null,
	loai_phieu bit not null, --0 la giảm theo %, 1 là giảm theo tiền mặt
	gia_tri_giam_toi_da decimal(10,2) not null,
	gia_tri_giam_tien decimal(10,2) not null, --%, $
	dieu_kien_giam decimal(10,2) not null,
	so_luong int not null, -- số lượng phiếu giảm giá
	trang_thai bit not null
);

-- tạo bảng vai trò
create table vai_tro(
	id int identity(1,1) primary key,
	ma_vai_tro varchar(30) unique not null, --ví dụ: khách hàng (customer), nhân viên (employee),...
	ten_vai_tro nvarchar(100) not null
);

-- tạo bảng người dùng
create table nhan_vien(
	id int identity(1,1) primary key,
	ma_nhan_vien varchar(30) unique not null,
	ho_ten nvarchar(100) not null,
	gioi_tinh bit,
	so_dien_thoai varchar(30) not null,
	email varchar(100) not null unique,
	dia_chi nvarchar(255) not null,
	trang_thai bit
);

-- tạo bảng tài khoản
create table tai_khoan(
	id int identity(1,1) primary key,
	ten_tai_khoan varchar(100) not null unique, --tên tài khoản là tiếng việt không dấu và là độc nhất
	mat_khau varchar(255) not null, --mật khẩu nhập tiếng việt không dấu
	vai_tro_id int not null foreign key (vai_tro_id) references vai_tro(id),
	nhan_vien_id int not null foreign key (nhan_vien_id) references nhan_vien(id)
);

-- tạo bảng hóa đơn
create table hoa_don(
	id int identity(1,1) primary key,
	ma_hoa_don varchar(30) not null,
	tai_khoan_id int not null,
	khach_hang_id int not null,
	phieu_giam_gia_id int not null,
	ngay_tao datetime not null,
	tong_tien decimal(10,2) not null,
	phuong_thuc_thanh_toan bit,
	trang_thai nvarchar (50) not null
	FOREIGN KEY (tai_khoan_id) REFERENCES tai_khoan(id),
	foreign key (khach_hang_id) references khach_hang(id),
    FOREIGN KEY (phieu_giam_gia_id) REFERENCES phieu_giam_gia(id)
);

-- tạo bảng chi tiết hóa đơn
create table chi_tiet_hoa_don (
    id int identity(1,1) primary key,  -- ID duy nhất cho từng chi tiết hóa đơn
    chi_tiet_san_pham_id int not null, -- Khóa ngoại đến chi_tiet_san_pham
    hoa_don_id int not null,           -- Khóa ngoại đến hoa_don
    gia decimal(10,2) not null,       -- Giá của sản phẩm
    so_luong_mua int not null,         -- Số lượng mua
    tong_tien AS (gia * so_luong_mua) PERSISTED, -- Tổng tiền, tính tự động và PERSISTED lưu lại trong database
    foreign key (chi_tiet_san_pham_id) references chi_tiet_san_pham(id),
    foreign key (hoa_don_id) references hoa_don(id)
);

-- tạo bảng giao hàng
--create table giao_hang (
--    id int identity(1,1) primary key,
--    ma_giao_hang varchar(30) not null,
--    hoa_don_id int unique not null, -- Đảm bảo rằng mỗi hóa đơn chỉ có một giao hàng
--    dia_chi_giao_hang nvarchar(255) not null,
--    tien_ship decimal(10,2) not null,
--    tong_tien decimal(10,2) not null,
--    ngay_giao_hang date not null,
--    trang_thai nvarchar(50) NOT NULL,
--    FOREIGN KEY (hoa_don_id) REFERENCES hoa_don(id)
--);
