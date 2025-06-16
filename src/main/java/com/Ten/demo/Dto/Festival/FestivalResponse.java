package com.Ten.demo.Dto.Festival;

import com.Ten.demo.Dto.Common.BaseResponse;
import com.Ten.demo.Dto.Common.Body;
import com.Ten.demo.Dto.Common.Items;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class FestivalResponse {
    private BaseResponse<Body<Items<FestivalItem>>> response;

    // Getter/Setter
}
