package com.novafurniture.NovaFurniture.mapper;

import com.novafurniture.NovaFurniture.dto.response.WishlistItemResponse;
import com.novafurniture.NovaFurniture.entity.WishlistItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface WishlistMapper {

    @Mapping(source = "product.id",        target = "productId")
    @Mapping(source = "product.name",      target = "productName")
    @Mapping(source = "product.slug",      target = "productSlug")
    @Mapping(source = "product.thumbnail", target = "productThumbnail")
    @Mapping(source = "product.price",     target = "productPrice")
    WishlistItemResponse toResponse(WishlistItem wishlistItem);
}