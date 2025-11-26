package com.medical.appointment.exception;

@SuppressWarnings("serial")
public class ApiException extends RuntimeException{
	public ApiException(String message) { 
		super(message);
	}

}
