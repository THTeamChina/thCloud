package com.glodon.water.common.model.result;

public class UserResult extends BaseResult {
	private Integer id;
	private String username;
	private String nickname;
	private Integer corpid;

	public Integer getId() { return id; }

	public void setId(Integer id) { this.id = id; }

	public Integer getCorpid() { return corpid; }

	public void setCorpid(Integer corpid) { this.corpid = corpid; }

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) { this.username = username; }

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

}
