using Gamestak.Contracts.Repositories;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace Gamestak.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly ILogger<UserController> logger;
        private readonly IUserRepository userRepository;

        public UserController(
            ILogger<UserController> logger,
            IUserRepository userRepository
        )
        {
            this.logger = logger;
            this.userRepository = userRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await userRepository.GetAllUsers();
            return Ok(users);
        }
    }
}
