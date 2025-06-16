package com.Ten.demo.Dto.Subregion;

import com.Ten.demo.Dto.Common.BaseResponse;
import com.Ten.demo.Dto.Common.Body;
import com.Ten.demo.Dto.Common.Items;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SubRegionResponse {
    private BaseResponse<Body<Items<SubRegionItem>>> response;

    // Getter/Setter
}
