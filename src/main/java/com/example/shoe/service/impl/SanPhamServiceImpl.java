package com.example.shoe.service.impl;

import com.example.shoe.dto.request.SanPhamRequest;
import com.example.shoe.dto.response.SanPhamResponse;
import com.example.shoe.entity.DanhMuc;
import com.example.shoe.entity.SanPham;
import com.example.shoe.entity.ThuongHieu;
import com.example.shoe.mapper.ShoeMapper;
import com.example.shoe.repository.DanhMucRepository;
import com.example.shoe.repository.SanPhamRepository;
import com.example.shoe.repository.ThuongHieuRepository;
import com.example.shoe.service.SanPhamService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@RequiredArgsConstructor
public class SanPhamServiceImpl implements SanPhamService {
    SanPhamRepository sanPhamRepository;
    ShoeMapper shoeMapper;
    ThuongHieuRepository thuongHieuRepository;
    DanhMucRepository danhMucRepository;

    @Override
    public Page<SanPham> getSanPham(Pageable pageable) {
        return sanPhamRepository.findAll(pageable);
    }

    @Override
    public SanPham createSanPham(SanPhamRequest request) {

        ThuongHieu thuongHieu = thuongHieuRepository.findById(request.getThuongHieuId())
                .orElseThrow(() -> new RuntimeException("Thương hiệu không tồn tại!"));
        DanhMuc danhMuc = danhMucRepository.findById(request.getDanhMucId())
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại!"));

        SanPham sanPham = shoeMapper.toSanPham(request);
        sanPham.setThuongHieu(thuongHieu);
        sanPham.setDanhMuc(danhMuc);

        return sanPhamRepository.save(sanPham);
    }

    @Override
    public SanPhamResponse getSanPhamId(Integer id) {
        SanPham sanPham = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm có id vừa nhập!"));
        return shoeMapper.toSanPhamResponse(sanPham);
    }

    @Override
    public SanPhamResponse updateSanPham(Integer id, SanPhamRequest request) {
        SanPham sanPham = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy sản phẩm có id vừa nhập!"));

        if (request.getThuongHieuId() != null) {
            ThuongHieu thuongHieu = thuongHieuRepository.findById(request.getThuongHieuId())
                    .orElseThrow(() -> new RuntimeException("Thương hiệu không tồn tại!"));
            sanPham.setThuongHieu(thuongHieu);
        }

        if (request.getDanhMucId() != null) {
            DanhMuc danhMuc = danhMucRepository.findById(request.getDanhMucId())
                    .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại!"));
            sanPham.setDanhMuc(danhMuc);
        }

        shoeMapper.toUpdateSanPham(sanPham, request);
        return shoeMapper.toSanPhamResponse(sanPhamRepository.save(sanPham));
    }

    @Override
    public void deleteSanPham(Integer id) {
        if (!sanPhamRepository.existsById(id)) {
            throw new RuntimeException("Không tìm thấy id sản phẩm muốn xóa!");
        }
        sanPhamRepository.deleteById(id);
    }
}
