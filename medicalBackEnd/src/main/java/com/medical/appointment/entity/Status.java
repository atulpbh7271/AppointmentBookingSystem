package com.medical.appointment.entity;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Status {
	//@JsonFormat(shape = JsonFormat.Shape.STRING)
	PENDING, ACCEPTED, COMPLETED, REJECTED, CANCELLED;
	
	
	@JsonCreator
    public static Status from(String value) {
        if (value == null) return null;
        return Status.valueOf(value.toUpperCase());
    }


}
