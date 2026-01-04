using System.Text.RegularExpressions;
using System.Text.Json;
using BakerySampleAdmin.Models;
using Microsoft.AspNetCore.Mvc;
using JsonConvert = Newtonsoft.Json.JsonConvert;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using JsonSerializer = System.Text.Json.JsonSerializer;

namespace BakerySampleAdmin.Controllers;

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

    [HttpPost]
    [Route("api/")]
    public IActionResult Api([FromForm] EditFormModel model)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }

        var url = Url.Action("", "", new { success = true });

        var newSiteData = new HomeViewModel();
        
        newSiteData.Hero = new HeroModel { Title = model.heroTitle, Subtitle =  model.heroSubtitle };

        var newSiteDataJson = JsonConvert.SerializeObject(newSiteData);
        var newSiteDataJsonObj = JsonConvert.DeserializeObject<JObject>(newSiteDataJson);

        var siteDataJsonFile = Path.Combine("data", "siteData.json");
        using (var r = new StreamReader(siteDataJsonFile))
        {
            var currentSiteDataJson = r.ReadToEnd();
            currentSiteDataJson = CleanJsonToSave(currentSiteDataJson);

            var currentSiteDataJsonObj = JsonConvert.DeserializeObject<JObject>(currentSiteDataJson);
            currentSiteDataJsonObj.Merge(newSiteDataJsonObj, new JsonMergeSettings
            {
                MergeArrayHandling = MergeArrayHandling.Union
            });
            var mergedSiteDataJson = JsonConvert.SerializeObject(currentSiteDataJson, Formatting.Indented);
            mergedSiteDataJson = CleanJsonToSave(mergedSiteDataJson, true);
            
            r.Close();

            System.IO.File.WriteAllText(siteDataJsonFile, mergedSiteDataJson);
        }

        return Redirect(url);
    }

    static string CleanJsonToSave(string json, bool writingToJsonFile = false)
    {
        // Trim whitespace
        json = json.Trim();

        // Normalize quotes (optional, but it ensures consistency)
        if (!writingToJsonFile)
        {
            json = json.Replace("\n", ""); // Remove all line breaks
        }
        json = json.Replace("'", "\""); // Replace single quotes with double quotes
        if (writingToJsonFile)
        {
            json = json.Replace("\\r", ""); // Remove all line breaks
            json = json.StartsWith("\"{") ? json.Substring(1, json.Length - 2) : json; 
            json = json.Replace("\\\"", '\"'.ToString());
        }

        // Remove invalid characters (additional cleaning can be added here)
        json = Regex.Replace(json, @"[^\u0000-\u007F]+", ""); // Remove non-ASCII characters

        return json;
    }
}