namespace BakerySampleAdmin.Models;

public class HomeViewModel
{
    public HeroModel Hero { get; set; }
    public SectionsModel Sections { get; set; }
    public FooterModel Footer { get; set; }

    public HomeViewModel()
    {
        Hero = new HeroModel();
        Sections = new SectionsModel();
        Footer = new FooterModel();
    }
}