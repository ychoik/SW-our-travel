package com.Ten.demo.Dto.Area;

import com.Ten.demo.Dto.Common.BaseResponse;
import com.Ten.demo.Dto.Common.Body;
import com.Ten.demo.Dto.Common.Items;
import com.Ten.demo.Dto.Response.Response;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AreaCodeResponse {
    private BaseResponse<Body<Items<Region>>> response;

//    private Response response;
//
//    public Response getResponse() {
//        return response;
//    }
//
//    public void setResponse(Response response) {
//        this.response = response;
//    }
}

