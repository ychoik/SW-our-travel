package com.Ten.demo.Dto.Category;

import com.Ten.demo.Dto.Common.BaseResponse;
import com.Ten.demo.Dto.Common.Body;
import com.Ten.demo.Dto.Common.Items;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryCodeResponse {
    private BaseResponse<Body<Items<CategoryCodeItem>>> response;

    // Getter/Setter
}