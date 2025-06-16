package com.Ten.demo.Dto.Response;

import com.Ten.demo.Dto.Common.Body;
import com.Ten.demo.Dto.Common.Header;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Response {
    private Header header;
    private Body body;

    public Header getHeader() {
        return header;
    }

    public void setHeader(Header header) {
        this.header = header;
    }

    public Body getBody() {
        return body;
    }

    public void setBody(Body body) {
        this.body = body;
    }
}

