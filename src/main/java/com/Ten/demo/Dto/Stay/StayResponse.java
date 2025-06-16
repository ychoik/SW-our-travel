package com.Ten.demo.Dto.Stay;

import com.Ten.demo.Dto.Common.BaseResponse;
import com.Ten.demo.Dto.Common.Body;
import com.Ten.demo.Dto.Common.Items;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StayResponse {
    private BaseResponse<Body<Items<StayItem>>> response;

    // Getter/Setter
}
