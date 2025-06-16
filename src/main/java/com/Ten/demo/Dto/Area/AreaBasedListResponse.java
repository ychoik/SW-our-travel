package com.Ten.demo.Dto.Area;

import com.Ten.demo.Dto.Common.BaseResponse;
import com.Ten.demo.Dto.Common.Body;
import com.Ten.demo.Dto.Common.Items;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AreaBasedListResponse {
    private BaseResponse<Body<Items<AreaBasedItem>>> response;

    // Getter/Setter
}
