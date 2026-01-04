namespace BakerySampleAdmin.Models;

public class SectionsModel
{
    public WhyChooseUsModel WhyChooseUs { get; set; }

    public SectionsModel()
    {
        WhyChooseUs = new WhyChooseUsModel();
    }
}