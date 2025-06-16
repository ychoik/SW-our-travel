package com.Ten.demo.Dto.Common;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Body<T> {
    private T items;
    private int numOfRows;
    private int pageNo;
    private int totalCount;

}

