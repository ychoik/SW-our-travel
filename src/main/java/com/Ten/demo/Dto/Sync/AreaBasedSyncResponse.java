package com.Ten.demo.Dto.Sync;

import com.Ten.demo.Dto.Common.BaseResponse;
import com.Ten.demo.Dto.Common.Body;
import com.Ten.demo.Dto.Common.Items;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AreaBasedSyncResponse {
    private BaseResponse<Body<Items<SyncContentItem>>> response;

    // Getter/Setter
}
