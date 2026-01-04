using Newtonsoft.Json;

namespace BakerySampleAdmin.Models;

public class FooterModel
{
    public string VisitUs { get; set; }
    public string VisitUsDescription { get; set; }
    [JsonProperty("visitUsCta_text")]
    public string VisitUsCta { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }

    public FooterModel()
    {
        VisitUs = "";
        VisitUsDescription = "";
        VisitUsCta = "";
        Address = "";
        Phone = "";
    }
}