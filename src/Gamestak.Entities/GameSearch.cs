using System.Collections.Generic;

namespace Gamestak.Entities
{
    public class GameSearch
    {
        public string SearchTerm { get; set; }
        public SortType SortBy { get; set; }
        public List<Category> Categories { get; set; }
        public List<Feature> Features { get; set; }
    }

    public enum SortType
    {
        NewerFirst = 0,
        OlderFirst = 1,
        AZ = 2,
        ZA = 3,
        PriceLowToHigh = 4,
        PriceHighToLow = 5,
    }
}
