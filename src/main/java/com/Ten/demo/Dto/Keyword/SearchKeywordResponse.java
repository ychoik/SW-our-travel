package com.Ten.demo.Dto.Keyword;

import com.Ten.demo.Dto.Common.BaseResponse;
import com.Ten.demo.Dto.Common.Body;
import com.Ten.demo.Dto.Common.Items;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SearchKeywordResponse {
    private BaseResponse<Body<Items<KeywordSearchItem>>> response;

    // Getter/Setter
}
