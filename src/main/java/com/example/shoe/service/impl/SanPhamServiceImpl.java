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
    public Page<SanPhamResponse> getSanPhamByStatus(Boolean trangThai, Pageable pageable) {
        Page<SanPham> sanPhamPage;

        if (trangThai == null) {
            sanPhamPage = sanPhamRepository.findAll(pageable);
        } else if (trangThai) {
            sanPhamPage = sanPhamRepository.findActiveProducts(pageable);
        } else {
            sanPhamPage = sanPhamRepository.findInactiveProducts(pageable);
        }

        return sanPhamPage.map(shoeMapper::toSanPhamResponse);
    }

    @Override
    public SanPhamResponse createSanPham(SanPhamRequest request) {
        SanPham sanPham = shoeMapper.toSanPham(request);
        SanPham saveSanPham = sanPhamRepository.save(sanPham);
        return shoeMapper.toSanPhamResponse(saveSanPham);
    }

    @Override
    public SanPhamResponse getSanPhamById(Integer id) {
        SanPham sanPham = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại!"));
        return shoeMapper.toSanPhamResponse(sanPham);
    }

    @Override
    public SanPhamResponse updateSanPham(Integer id, SanPhamRequest request) {
        SanPham sanPham = sanPhamRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Sản phẩm không tồn tại!"));

        DanhMuc danhMuc = danhMucRepository.findById(request.getDanhMucId())
                .orElseThrow(() -> new RuntimeException("Danh mục không tồn tại!"));

        ThuongHieu thuongHieu = thuongHieuRepository.findById(request.getThuongHieuId())
                .orElseThrow(() -> new RuntimeException("Thương hiệu không tồn tại!"));

        sanPham.setDanhMuc(danhMuc);
        sanPham.setThuongHieu(thuongHieu);

        shoeMapper.toUpdateSanPham(sanPham, request);
        sanPham = sanPhamRepository.save(sanPham);
        return shoeMapper.toSanPhamResponse(sanPham);
    }

    @Override
    public void deleteSanPham(Integer id) {
        if (!sanPhamRepository.existsById(id)) {
            throw new RuntimeException("Sản phẩm không tồn tại!");
        }
        sanPhamRepository.deleteById(id);
    }

    @Override
    public Page<SanPhamResponse> searchSanPham(String keyword, Boolean trangThai, Pageable pageable) {
        Page<SanPham> sanPhamPage = sanPhamRepository.search(keyword, trangThai, pageable);
        return sanPhamPage.map(shoeMapper::toSanPhamResponse);
    }

}
