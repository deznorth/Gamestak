using Gamestak.Services.Contracts;
using Gamestak.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Routing;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System;

namespace Gamestak.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly ILogger<UserController> logger;
        private readonly IUserService userService;

        public UserController(
            ILogger<UserController> logger,
            IUserService userService
        )
        {
            this.logger = logger;
            this.userService = userService;
        }

        #region CREATE
        [HttpPost]
        public async Task<IActionResult> RegisterUser(User user)
        {
            var result = await userService.RegisterUser(user);
            return Ok(result);
        }
        #endregion

        #region READ
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            try
            {
                var loggedInUser = await userService.Login(user);
                return Ok(loggedInUser);
            } catch(ArgumentException e)
            {
                return new StatusCodeResult(401);
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await userService.GetAllUsers();
            return Ok(users);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchUsers([FromQuery] UserSearchRequest searchRequest)
        {
            var user = await userService.FindUser(searchRequest);
            return Ok(user);
        }

        #endregion

        #region DELETE
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUserByID(int id)
        {
            await userService.DeleteUserByID(id);
            return Ok();
        }
        #endregion
    }
}
