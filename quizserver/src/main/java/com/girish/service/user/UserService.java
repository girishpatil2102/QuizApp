package com.girish.service.user;

import com.girish.entities.User;

public interface UserService {

    public boolean hasUserWithEmail(String email);

    public User createUser(User user);

    public User login(User user);
}
