namespace BakerySampleAdmin.Models;

public class HeroModel
{
    public string Title { get; set; }
    public string Subtitle { get; set; }
    public string CtaText { get; set; }

    public HeroModel()
    {
        Title = "";
        Subtitle = "";
        CtaText = "";
    }
}