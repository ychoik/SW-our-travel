package com.Ten.demo.Dto.Common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BaseResponse<T> {
    private Header header;
    private T body;
    // Getter/Setter
}
