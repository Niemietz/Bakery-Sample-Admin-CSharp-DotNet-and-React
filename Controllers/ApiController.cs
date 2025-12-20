using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Mvc;

namespace BakerySample.Controllers;

[ApiController]
public class ApiController : ControllerBase
{
    private readonly ILogger<ApiController> _logger;

    public ApiController(ILogger<ApiController> logger)
    {
        _logger = logger;
    }

    static string CleanJson(string json)
    {
        // Trim whitespace
        json = json.Trim();

        // Normalize quotes (optional, but it ensures consistency)
        json = json.Replace("\n", ""); // Remove all line breaks
        json = json.Replace("'", "\""); // Replace single quotes with double quotes

        // Remove invalid characters (additional cleaning can be added here)
        json = Regex.Replace(json, @"[^\u0000-\u007F]+", ""); // Remove non-ASCII characters

        return json;
    }

    [HttpGet]
    [Route("data/")]
    public IActionResult Data()
    {
        var json = "{}";
        
        using (StreamReader r = new StreamReader("data/siteData.json"))
        {
            string jsonString = r.ReadToEnd();
            json = CleanJson(jsonString);
        }

        return new JsonResult(json);
    }
}