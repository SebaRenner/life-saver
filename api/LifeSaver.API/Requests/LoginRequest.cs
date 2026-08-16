namespace LifeSaver.API.Requests;

public record LoginRequest(
    string Email,
    string Password
);
