package com.Ten.demo.Dto.Location;

import com.Ten.demo.Dto.Common.BaseResponse;
import com.Ten.demo.Dto.Common.Body;
import com.Ten.demo.Dto.Common.Items;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationBasedResponse {
    private BaseResponse<Body<Items<LocationItem>>> response;

    // Getter/Setter
}
