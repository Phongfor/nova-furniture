package com.novafurniture.NovaFurniture.service;

import com.novafurniture.NovaFurniture.dto.request.BrandRequest;
import com.novafurniture.NovaFurniture.dto.response.BrandResponse;

import java.util.List;

public interface BrandService {
    List<BrandResponse> getAllBrands();
    BrandResponse getBrandById(Long id);
    BrandResponse createBrand(BrandRequest request);
    BrandResponse updateBrand(Long id, BrandRequest request);
    void deleteBrand(Long id);
}