package com.glodon.water.user.dao;

import tk.mybatis.mapper.common.Mapper;

import java.util.List;
import java.util.Map;


import com.glodon.water.common.common.entity.User;

public interface UserMapper extends Mapper<User> {
    List<String> getUsersByIds(List<String> list);

    List<Map<String,Object>> list(Map<String,Object> map);

    int count(Map<String,Object> map);
}
