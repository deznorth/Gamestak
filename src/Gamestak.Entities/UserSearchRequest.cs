
namespace Gamestak.Entities
{
    public enum UserSearchType
    {
        Id,
        Username
    }
    public class UserSearchRequest
    {
        public UserSearchType Type { get; set; }
        public string Query { get; set; }
    }
}
