package com.novafurniture.NovaFurniture.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class OrderStatsResponse {
    private String status;
    private long count;
}