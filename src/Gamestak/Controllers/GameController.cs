using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Gamestak.Entities;
using Gamestak.Services.Contracts;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Gamestak.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GameController : Controller
    {
        private readonly ILogger<GameController> logger;
        private readonly IGameService gameService;

        public GameController(
            ILogger<GameController> logger,
            IGameService gameService
        )
        {
            this.logger = logger;
            this.gameService = gameService;
        }

        #region CREATE
        [HttpPost]
        public async Task<IActionResult> SaveGame(GameCreationRequest game)
        {
            try
            {
                var result = await gameService.SaveGame(game);
                return Ok(result);
            }
            catch (ArgumentException e)
            {
                return new BadRequestResult();
            }
            catch (Exception e)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpPost("bulkAdd")]
        public async Task<IActionResult> BulkSaveGames(List<GameCreationRequest> games)
        {
            try
            {
                var result = await gameService.BulkSaveGames(games);
                return Ok(result);
            }
            catch (ArgumentException e)
            {
                return new BadRequestResult();
            }
            catch (Exception e)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpPost("featured/{gameId}")]
        public async Task<IActionResult> FeatureGame(int gameId)
        {
            try
            {
                var result = await gameService.FeatureGame(gameId);
                return Ok(result);
            }
            catch (ArgumentException e)
            {
                return new BadRequestResult();
            }
            catch (Exception e)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpPost("key")]
        public async Task<IActionResult> GetGameKey([FromBody] PurchaseRequest order)
        {
            try
            {
                var result = await gameService.SaveGameKeys(order.UserID, order.GameIDs);
                return Ok(result);
            }
            catch (Exception e)
            {
                return new StatusCodeResult(500);
            }
        }
        #endregion

        #region READ
        [HttpPost("search")]
        public async Task<IActionResult> GetGames([FromBody] GameSearch searchParams)
        {
            try
            {
                var result = await gameService.GetGames(searchParams);
                return Ok(result);
            }
            catch (Exception e)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpGet("featured")]
        public async Task<IActionResult> GetFeaturedGames()
        {
            try
            {
                var result = await gameService.GetFeaturedGames();
                return Ok(result);
            }
            catch (Exception e)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGameByID([FromRoute] int id)
        {
            try
            {
                var result = await gameService.GetGameByID(id);
                return Ok(result);
            }
            catch (Exception e)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpPost("withIds")]
        public async Task<IActionResult> GetGamesByID([FromBody] IEnumerable<int> ids)
        {
            try
            {
                var result = await gameService.GetGamesByID(ids);
                return Ok(result);
            }
            catch (Exception e)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpGet("owner")]
        public async Task<IActionResult> GetIsOwner([FromQuery] int userId, [FromQuery] int gameId)
        {
            try
            {
                var result = await gameService.GetIsOwner(userId, gameId);
                return Ok(result);
            }
            catch (Exception e)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpGet("key")]
        public async Task<IActionResult> GetGameKey([FromQuery] int userId, [FromQuery] int gameId)
        {
            try
            {
                var result = await gameService.GetGameKey(userId, gameId);
                return Ok(result);
            }
            catch (Exception e)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpGet("images/{gameId}")]
        public async Task<IActionResult> GetImagesByGameID([FromRoute] int gameId)
        {
            try
            {
                var result = await gameService.GetImagesByGameID(gameId);
                return Ok(result);
            }
            catch (Exception e)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpGet("image/{imageId}")]
        public async Task<IActionResult> GetImageByID([FromRoute] int imageId)
        {
            try
            {
                var result = await gameService.GetImageByID(imageId);
                return Ok(result);
            }
            catch (Exception e)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpGet("categories")]
        public async Task<IActionResult> GetCategories()
        {
            try
            {
                var result = await gameService.GetCategories();
                return Ok(result);
            }
            catch (Exception e)
            {
                return new StatusCodeResult(500);
            }
        }

        [HttpGet("features")]
        public async Task<IActionResult> GetFeatures()
        {
            try
            {
                var result = await gameService.GetFeatures();
                return Ok(result);
            }
            catch (Exception e)
            {
                return new StatusCodeResult(500);
            }
        }
        #endregion

        #region UPDATE
        #endregion

        #region DELETE
        [HttpDelete("featured/{gameId}")]
        public async Task<IActionResult> UnfeatureGame(int gameId)
        {
            try
            {
                var result = await gameService.UnfeatureGame(gameId);
                return Ok(result);
            }
            catch (Exception e)
            {
                return new StatusCodeResult(500);
            }
        }
        #endregion
    }
}
