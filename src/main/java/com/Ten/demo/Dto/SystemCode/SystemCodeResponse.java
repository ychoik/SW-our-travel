package com.Ten.demo.Dto.SystemCode;

import com.Ten.demo.Dto.Common.BaseResponse;
import com.Ten.demo.Dto.Common.Body;
import com.Ten.demo.Dto.Common.Items;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SystemCodeResponse {
    private BaseResponse<Body<Items<SystemCodeItem>>> response;

    // Getter/Setter
}
