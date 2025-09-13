using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Data.Access.Library.Core;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;


namespace unit3.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TokenServicesController : ControllerBase
    {
        private readonly Settings _settings;

        public TokenServicesController(Settings settings) { this._settings = settings; }

        [HttpGet()]
        public string GetHeartbeat()
        {
            return "Success";
        }

        [HttpGet("article")]
        [ResponseCache(Duration = 60, Location = ResponseCacheLocation.Client)]
        public IActionResult GetTokens()
        {
            try
            {
                string sql = "SELECT * FROM unit3.tokens";
                List<Token> results = DataAccess.Instance.Select<Token>(_settings.ApiDatabase, sql);

                if (results == null || results.Count == 0)
                {
                    return NotFound("No Tokens found.");
                }

                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while retrieving Tokens: {ex.Message}");
            }
        }


        [HttpPost("article")]
        public IActionResult InsertTokens([FromQuery] string json)
        {
            if (string.IsNullOrWhiteSpace(json))
            {
                return BadRequest("The 'json' query parameter is required.");
            }

            try
            {
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                string sanitizedJson = json.Replace("'", "\"");

                List<Token> Tokens = JsonSerializer.Deserialize<List<Token>>(sanitizedJson, options);

                if (Tokens == null || Tokens.Count == 0)
                {
                    return BadRequest("No Tokens found in the provided JSON.");
                }

                foreach (Token article in Tokens)
                {
                    DataAccess.Instance.Insert<Token>(_settings.ApiDatabase, article);
                }

                return Ok("Tokens inserted successfully.");
            }
            catch (JsonException jsonEx)
            {
                return BadRequest($"JSON deserialization error: {jsonEx.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }


        [HttpPut("article")]
        public IActionResult UpdateTokens([FromQuery] string json)
        {
            if (string.IsNullOrWhiteSpace(json))
            {
                return BadRequest("The 'json' query parameter is required.");
            }

            try
            {
                var options = new JsonSerializerOptions
                {
                    PropertyNameCaseInsensitive = true
                };

                string sanitizedJson = json.Replace("'", "\"");

                List<Token> Tokens = JsonSerializer.Deserialize<List<Token>>(sanitizedJson, options);

                if (Tokens == null || Tokens.Count == 0)
                {
                    return BadRequest("No Tokens found in the provided JSON.");
                }

                foreach (Token article in Tokens)
                {
                    DataAccess.Instance.Update<Token>(_settings.ApiDatabase, article);
                }

                return Ok("Tokens updated successfully.");
            }
            catch (JsonException jsonEx)
            {
                return BadRequest($"JSON deserialization error: {jsonEx.Message}");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An unexpected error occurred: {ex.Message}");
            }
        }


        [HttpDelete("article")]
        public IActionResult DeleteTokens([FromQuery] int id)
        {
            if (id <= 0)
            {
                return BadRequest("A valid article ID must be provided.");
            }

            try
            {
                DataAccess.Instance.Delete<Token>(_settings.ApiDatabase, id);
                return Ok($"Article with ID {id} deleted successfully.");
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred while deleting the article: {ex.Message}");
            }
        }
    }
}
