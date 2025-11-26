package com.medical.appointment.entity;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Role {
    BROKER,
    AGENT,
    PATIENT,
    DOCTOR,
    ADMIN;

    @JsonCreator
    public static Role from(String value) {
        if (value == null) return null;
        return Role.valueOf(value.toUpperCase());
    }
}
