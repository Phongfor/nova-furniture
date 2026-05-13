package com.novafurniture.NovaFurniture.mapper;

import com.novafurniture.NovaFurniture.dto.response.CartItemResponse;
import com.novafurniture.NovaFurniture.entity.CartItem;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface CartItemMapper {

    @Mapping(source = "product.id",        target = "productId")
    @Mapping(source = "product.name",      target = "productName")
    @Mapping(source = "product.slug",      target = "productSlug")
    @Mapping(source = "product.thumbnail", target = "productThumbnail")
    @Mapping(source = "product.price",     target = "productPrice")
    @Mapping(target = "subtotal",          ignore = true)   // tính thủ công
    CartItemResponse toResponse(CartItem cartItem);
}