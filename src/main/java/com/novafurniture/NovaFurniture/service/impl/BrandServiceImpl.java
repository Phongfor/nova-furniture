package com.novafurniture.NovaFurniture.service.impl;

import com.novafurniture.NovaFurniture.dto.request.BrandRequest;
import com.novafurniture.NovaFurniture.dto.response.BrandResponse;
import com.novafurniture.NovaFurniture.entity.Brand;
import com.novafurniture.NovaFurniture.exception.AppException;
import com.novafurniture.NovaFurniture.exception.ErrorCode;
import com.novafurniture.NovaFurniture.repository.BrandRepository;
import com.novafurniture.NovaFurniture.service.BrandService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
@Slf4j
public class BrandServiceImpl implements BrandService {

    BrandRepository brandRepository;

    @Override
    public List<BrandResponse> getAllBrands() {
        return brandRepository.findAll()
                .stream()
                .map(this::toBrandResponse)
                .toList();
    }

    @Override
    public BrandResponse getBrandById(Long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
        return toBrandResponse(brand);
    }

    @Override
    public BrandResponse createBrand(BrandRequest request) {
        String slug = CategoryServiceImpl.generateSlug(request.getName());

        if (brandRepository.existsBySlug(slug)) {
            slug = slug + "-" + System.currentTimeMillis();
        }

        Brand brand = Brand.builder()
                .name(request.getName())
                .slug(slug)
                .description(request.getDescription())
                .logo(request.getLogo())
                .build();

        brandRepository.save(brand);
        log.info("Brand created: {}", brand.getName());
        return toBrandResponse(brand);
    }

    @Override
    public BrandResponse updateBrand(Long id, BrandRequest request) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));

        brand.setName(request.getName());
        brand.setDescription(request.getDescription());
        brand.setLogo(request.getLogo());

        brandRepository.save(brand);
        return toBrandResponse(brand);
    }

    @Override
    public void deleteBrand(Long id) {
        Brand brand = brandRepository.findById(id)
                .orElseThrow(() -> new AppException(ErrorCode.BRAND_NOT_FOUND));
        brandRepository.delete(brand);
        log.info("Brand deleted: {}", id);
    }

    private BrandResponse toBrandResponse(Brand brand) {
        return BrandResponse.builder()
                .id(brand.getId())
                .name(brand.getName())
                .slug(brand.getSlug())
                .description(brand.getDescription())
                .logo(brand.getLogo())
                .createdAt(brand.getCreatedAt())
                .build();
    }
}