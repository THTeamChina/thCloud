package com.glodon.water.user.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.client.discovery.DiscoveryClient;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.glodon.water.user.api.ModelApi;

@Controller
@RequestMapping("/demo")
public class DemoController {
    private Logger logger = LoggerFactory.getLogger(getClass());

    @Value("${server.port}")
    private String port;

    @Value("${spring.application.name}")
    private String sererName;

    @Autowired
    private DiscoveryClient client;

    @Autowired
    private ModelApi modelApi;

    @ResponseBody
    @RequestMapping("/info")
    public Object info() {
        return client.getServices();
    }

    @ResponseBody
    @RequestMapping("/getUser")
    public String getUser(String user) {
        return "get userInfo user:[" + user + "],from : port:" + port + ",serverName:" + sererName;
    }

    @RequestMapping("/test")
    @ResponseBody
    public String test(String user) {
        return "Get userInfo[ " + user + "]  from port:" + port + ",serverName:" + sererName + "\n has order:"
                + modelApi.getOrder("u" + user);
    }

    @RequestMapping("/retryListener")
    @ResponseBody
    public String testRetryListener() {
        try {
            return modelApi.testRetry();
        } catch (Exception e) {
            logger.error("", e);
            return "error:" + e.getMessage();
        }
    }
}
