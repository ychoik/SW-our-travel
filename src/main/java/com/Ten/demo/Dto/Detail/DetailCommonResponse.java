package com.Ten.demo.Dto.Detail;

import com.Ten.demo.Dto.Common.BaseResponse;
import com.Ten.demo.Dto.Common.Body;
import com.Ten.demo.Dto.Common.Items;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DetailCommonResponse {
    private BaseResponse<Body<Items<DetailItem>>> response;

    // Getter/Setter
}
