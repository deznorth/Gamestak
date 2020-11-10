using System;

namespace Gamestak.Entities
{
    /// <summary>
    /// Full user object. Don't send this to the front-end
    /// </summary>
    public class User
    {
        public int UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public DateTime CreatedAt { get; set; }
    }

    public static class UserExtensions
    {
        public static UserResponse ToResponse(this User user)
        {
            return new UserResponse
            {
                UserId = user.UserId,
                Username = user.Username,
                CreatedAt = user.CreatedAt
            };
        }
    }
}
