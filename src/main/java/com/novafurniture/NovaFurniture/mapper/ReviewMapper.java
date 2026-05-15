package com.novafurniture.NovaFurniture.mapper;

import com.novafurniture.NovaFurniture.dto.response.ReviewResponse;
import com.novafurniture.NovaFurniture.entity.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    @Mapping(source = "user.id",       target = "userId")
    @Mapping(source = "user.fullname", target = "userFullname")
    @Mapping(source = "product.id",    target = "productId")
    @Mapping(source = "product.name",  target = "productName")
    ReviewResponse toResponse(Review review);
}