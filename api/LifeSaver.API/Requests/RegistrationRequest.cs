namespace LifeSaver.API.Requests;

public record RegistrationRequest(
    string Email,
    string Password
);
